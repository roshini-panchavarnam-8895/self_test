import { WebSocketServer } from 'ws';
import { readFileSync, writeFileSync, watchFile, unwatchFile } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const HTML_FILE = join(__dirname, '..', 'dist', 'design-library.html');
const MAP_FILE = join(__dirname, 'design-map.json');

const WS_PORT = 9224;
const POLL_INTERVAL = 3000;

let figmaClient = null;
let requestId = 0;
const pendingRequests = new Map();
let lastCssValues = {};
let lastFigmaValues = {};
let syncing = false;

function log(msg) {
  const ts = new Date().toLocaleTimeString();
  console.log(`[${ts}] ${msg}`);
}

function logSync(direction, token, from, to) {
  const arrow = direction === 'figma→code' ? '\x1b[36m→\x1b[0m' : '\x1b[35m→\x1b[0m';
  console.log(`  \x1b[33m${direction}\x1b[0m  ${token}  ${from} ${arrow} ${to}`);
}

function readDesignMap() {
  return JSON.parse(readFileSync(MAP_FILE, 'utf-8'));
}

function writeDesignMap(map) {
  writeFileSync(MAP_FILE, JSON.stringify(map, null, 2) + '\n');
}

function parseCssRoot(html) {
  const vars = {};
  const rootBlocks = html.matchAll(/:root\s*\{([^}]+)\}/g);
  for (const match of rootBlocks) {
    const entries = match[1].matchAll(/--([a-z0-9_-]+)\s*:\s*([^;]+)/gi);
    for (const m of entries) {
      const val = m[2].trim();
      if (!val.startsWith('var(')) {
        vars[`--${m[1]}`] = val;
      }
    }
  }
  return vars;
}

function hexToRgba(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return { r, g, b, a: 1 };
}

function rgbaToHex(r, g, b) {
  const toHex = (v) => Math.round(v * 255).toString(16).padStart(2, '0').toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function sendToFigma(method, params = {}, timeout = 10000) {
  return new Promise((resolve, reject) => {
    if (!figmaClient || figmaClient.readyState !== 1) {
      reject(new Error('Figma not connected'));
      return;
    }
    const id = `sync_${++requestId}_${Date.now()}`;
    const timer = setTimeout(() => {
      pendingRequests.delete(id);
      reject(new Error(`Timeout: ${method}`));
    }, timeout);

    pendingRequests.set(id, {
      resolve: (val) => { clearTimeout(timer); resolve(val); },
      reject: (err) => { clearTimeout(timer); reject(err); }
    });

    figmaClient.send(JSON.stringify({ id, method, params }));
  });
}

async function readFigmaColors() {
  const response = await sendToFigma('EXECUTE_CODE', {
    code: `
      const collections = await figma.variables.getLocalVariableCollectionsAsync();
      const lmds = collections.find(c => c.name === 'CDS Tokens');
      if (!lmds) return { error: 'Collection not found' };
      const results = [];
      for (const vid of lmds.variableIds) {
        const v = await figma.variables.getVariableByIdAsync(vid);
        if (!v) continue;
        const modeId = lmds.modes[0].modeId;
        const val = v.valuesByMode[modeId];
        if (v.resolvedType === 'COLOR' && val && typeof val === 'object' && 'r' in val) {
          const hex = '#' + [val.r, val.g, val.b].map(c => Math.round(c * 255).toString(16).padStart(2, '0').toUpperCase()).join('');
          results.push({ name: v.name, id: v.id, type: 'COLOR', value: hex });
        } else if (v.resolvedType === 'FLOAT') {
          results.push({ name: v.name, id: v.id, type: 'FLOAT', value: val });
        } else if (v.resolvedType === 'STRING') {
          results.push({ name: v.name, id: v.id, type: 'STRING', value: val });
        }
      }
      return results;
    `,
    timeout: 8000
  });
  if (response && response.success && Array.isArray(response.result)) return response.result;
  if (Array.isArray(response)) return response;
  return null;
}

async function updateFigmaVariable(variableId, modeId, value, type) {
  /* value: hex string for COLOR, number for FLOAT */
  const code = type === 'COLOR'
    ? `const v = await figma.variables.getVariableByIdAsync('${variableId}');
       if (!v) return { error: 'not found' };
       const hex = '${value}';
       v.setValueForMode('${modeId}', {
         r: parseInt(hex.slice(1,3), 16) / 255,
         g: parseInt(hex.slice(3,5), 16) / 255,
         b: parseInt(hex.slice(5,7), 16) / 255,
         a: 1
       });
       return { updated: v.name, value: hex };`
    : `const v = await figma.variables.getVariableByIdAsync('${variableId}');
       if (!v) return { error: 'not found' };
       v.setValueForMode('${modeId}', ${value});
       return { updated: v.name, value: ${value} };`;

  const response = await sendToFigma('EXECUTE_CODE', { code, timeout: 5000 });
  if (response && response.success) return response.result || response;
  return response;
}

function getMappedTokens(map) {
  const tokens = [];
  for (const category of Object.values(map.tokens)) {
    for (const [cssVar, token] of Object.entries(category)) {
      if (token.figmaVariableId && !token.unmapped) {
        tokens.push({ cssVar, ...token });
      }
    }
  }
  return tokens;
}

function figmaValueForCss(figmaVars, figmaVarName) {
  const v = figmaVars.find(f => f.name === figmaVarName);
  if (!v) return null;
  if (v.type === 'COLOR') return v.value;
  if (v.type === 'FLOAT') return `${v.value}px`;
  if (v.type === 'STRING') return v.value;
  return null;
}

function cssValueToFigma(cssValue, type) {
  if (type === 'COLOR') return cssValue.toUpperCase();
  if (type === 'FLOAT') return parseFloat(cssValue);
  return cssValue;
}

async function syncFigmaToCode(figmaVars, cssVars, map) {
  const tokens = getMappedTokens(map);
  const changes = [];

  for (const token of tokens) {
    const figmaVal = figmaValueForCss(figmaVars, token.figmaVariable);
    const cssVal = cssVars[token.cssVar];
    if (!figmaVal || !cssVal) continue;

    const normalizedCss = token.type === 'COLOR' ? cssVal.toUpperCase() : cssVal;
    const normalizedFigma = figmaVal;

    if (normalizedCss !== normalizedFigma) {
      changes.push({ cssVar: token.cssVar, from: cssVal, to: figmaVal, token });
    }
  }

  if (changes.length === 0) return false;

  let html = readFileSync(HTML_FILE, 'utf-8');
  for (const change of changes) {
    const regex = new RegExp(`(${change.cssVar.replace('--', '--')}\\s*:\\s*)${escapeRegex(change.from)}`, 'g');
    html = html.replace(regex, `$1${change.to}`);
    logSync('figma→code', change.cssVar, change.from, change.to);

    const categories = ['colors', 'typography', 'radius', 'spacing'];
    for (const cat of categories) {
      if (map.tokens[cat]?.[change.cssVar]) {
        map.tokens[cat][change.cssVar].cssValue = change.to;
        map.tokens[cat][change.cssVar].figmaResolvedValue = change.to;
        map.tokens[cat][change.cssVar].lastSync = new Date().toISOString();
        map.tokens[cat][change.cssVar].lastSyncResult = `figma→code: ${change.from} → ${change.to}`;
      }
    }
  }

  writeFileSync(HTML_FILE, html);
  map._meta.lastFullSync = new Date().toISOString();
  writeDesignMap(map);
  return true;
}

async function syncCodeToFigma(figmaVars, cssVars, map) {
  const tokens = getMappedTokens(map);
  const changes = [];

  for (const token of tokens) {
    const figmaVal = figmaValueForCss(figmaVars, token.figmaVariable);
    const cssVal = cssVars[token.cssVar];
    if (!figmaVal || !cssVal) continue;

    const normalizedCss = token.type === 'COLOR' ? cssVal.toUpperCase() : cssVal;
    if (normalizedCss !== figmaVal) {
      const newFigmaVal = cssValueToFigma(cssVal, token.type);
      changes.push({ cssVar: token.cssVar, figmaVarId: token.figmaVariableId, from: figmaVal, to: cssVal, value: newFigmaVal, type: token.type, token });
    }
  }

  if (changes.length === 0) return false;

  for (const change of changes) {
    try {
      await updateFigmaVariable(change.figmaVarId, map._meta.figmaModeId, change.value, change.type);
      logSync('code→figma', change.cssVar, change.from, change.to);

      const categories = ['colors', 'typography', 'radius', 'spacing'];
      for (const cat of categories) {
        if (map.tokens[cat]?.[change.cssVar]) {
          map.tokens[cat][change.cssVar].figmaResolvedValue = change.to;
          map.tokens[cat][change.cssVar].lastSync = new Date().toISOString();
          map.tokens[cat][change.cssVar].lastSyncResult = `code→figma: ${change.from} → ${change.to}`;
        }
      }
    } catch (err) {
      log(`  ERROR updating ${change.cssVar}: ${err.message}`);
    }
  }

  map._meta.lastFullSync = new Date().toISOString();
  writeDesignMap(map);
  return true;
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

let pollTimer = null;
let codeChangeDebounce = null;
let lastHtmlMtime = 0;

async function pollFigma() {
  if (syncing || !figmaClient) return;
  syncing = true;
  try {
    const figmaVars = await readFigmaColors();
    if (!figmaVars || figmaVars.error) { syncing = false; return; }

    const html = readFileSync(HTML_FILE, 'utf-8');
    const cssVars = parseCssRoot(html);
    const map = readDesignMap();

    const changed = await syncFigmaToCode(figmaVars, cssVars, map);
    if (changed) {
      lastHtmlMtime = Date.now();
      log('Figma → Code sync applied');
    }

    lastFigmaValues = {};
    for (const v of figmaVars) lastFigmaValues[v.name] = v.value;
    lastCssValues = cssVars;
  } catch (err) {
    if (!err.message.includes('Timeout')) log(`Poll error: ${err.message}`);
  }
  syncing = false;
}

async function onCodeChange() {
  if (syncing || !figmaClient) return;
  if (Date.now() - lastHtmlMtime < 2000) return;
  syncing = true;
  try {
    const figmaVars = await readFigmaColors();
    if (!figmaVars || figmaVars.error) { syncing = false; return; }

    const html = readFileSync(HTML_FILE, 'utf-8');
    const cssVars = parseCssRoot(html);
    const map = readDesignMap();

    const changed = await syncCodeToFigma(figmaVars, cssVars, map);
    if (changed) log('Code → Figma sync applied');

    lastCssValues = cssVars;
  } catch (err) {
    log(`Code sync error: ${err.message}`);
  }
  syncing = false;
}

function startServer() {
  const wss = new WebSocketServer({ port: WS_PORT });

  log(`Auto-sync WebSocket server started on port ${WS_PORT}`);
  log('Waiting for Figma Desktop Bridge to connect...');
  log('(Plugin auto-scans ports 9223-9232 — it will find us on 9224)');
  log('');

  wss.on('connection', (ws) => {
    figmaClient = ws;
    log('\x1b[32mFigma Desktop Bridge connected\x1b[0m');

    ws.on('message', (data) => {
      try {
        const msg = JSON.parse(data.toString());

        if (msg.id && pendingRequests.has(msg.id)) {
          const p = pendingRequests.get(msg.id);
          pendingRequests.delete(msg.id);
          if (msg.error) p.reject(new Error(msg.error));
          else p.resolve(msg.result);
          return;
        }

        if (msg.type === 'FILE_INFO') {
          log(`Connected to Figma file: "${msg.data?.fileName}" (${msg.data?.fileKey})`);
          startPolling();
          return;
        }

        if (msg.type === 'DOCUMENT_CHANGE') {
          if (!syncing) {
            clearTimeout(pollTimer);
            pollTimer = setTimeout(pollFigma, 500);
          }
          return;
        }
      } catch {}
    });

    ws.on('close', () => {
      log('\x1b[31mFigma disconnected\x1b[0m');
      figmaClient = null;
      stopPolling();
    });
  });

  watchFile(HTML_FILE, { interval: 1000 }, (curr, prev) => {
    if (curr.mtimeMs !== prev.mtimeMs) {
      clearTimeout(codeChangeDebounce);
      codeChangeDebounce = setTimeout(onCodeChange, 800);
    }
  });

  log(`Watching ${HTML_FILE} for code changes`);

  process.on('SIGINT', () => {
    log('Shutting down...');
    unwatchFile(HTML_FILE);
    wss.close();
    process.exit(0);
  });
}

let pollInterval = null;

function startPolling() {
  log(`Starting Figma polling every ${POLL_INTERVAL / 1000}s`);
  log('\x1b[32m✓ Auto-sync is ACTIVE\x1b[0m — changes sync automatically in both directions\n');

  pollFigma();
  pollInterval = setInterval(pollFigma, POLL_INTERVAL);
}

function stopPolling() {
  if (pollInterval) {
    clearInterval(pollInterval);
    pollInterval = null;
  }
}

console.log('');
console.log('  ╔═══════════════════════════════════════════════╗');
console.log('  ║   Figma ↔ Code Auto-Sync                     ║');
console.log('  ║   CDS Tokens — Design Library                ║');
console.log('  ╚═══════════════════════════════════════════════╝');
console.log('');

startServer();
