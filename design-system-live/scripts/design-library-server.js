#!/usr/bin/env node
const fs = require('fs');
const http = require('http');
const path = require('path');
const { URL } = require('url');
const { spawnSync } = require('child_process');

const componentScaffold = require('./component-scaffold');

const ROOT = path.join(__dirname, '..');
const BUILD_SCRIPT = path.join(__dirname, 'build-design-library.js');
const OUTPUT_FILE = path.join(ROOT, 'dist', 'design-library.html');
const HOST = process.env.HOST || '127.0.0.1';
const PORT = Number(process.env.PORT || 8123);

const CONTENT_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.scss': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

function runBuild() {
  const result = spawnSync(process.execPath, [BUILD_SCRIPT], {
    cwd: ROOT,
    encoding: 'utf8'
  });

  return {
    ok: result.status === 0,
    status: result.status,
    stdout: result.stdout || '',
    stderr: result.stderr || ''
  };
}

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload, null, 2);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body)
  });
  res.end(body);
}

function sendText(res, statusCode, message) {
  res.writeHead(statusCode, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end(message);
}

function readRequestBody(req) {
  return new Promise(function(resolve, reject) {
    let body = '';
    req.on('data', function(chunk) {
      body += chunk;
      if (body.length > 1024 * 1024) {
        reject(new Error('Request body too large.'));
        req.destroy();
      }
    });
    req.on('end', function() { resolve(body); });
    req.on('error', reject);
  });
}

async function readJsonBody(req, res) {
  try {
    const rawBody = await readRequestBody(req);
    return rawBody ? JSON.parse(rawBody) : {};
  } catch (error) {
    sendJson(res, 400, {
      ok: false,
      code: 'INVALID_JSON',
      message: 'Request body must be valid JSON.'
    });
    return null;
  }
}

function resolveStaticPath(urlPath) {
  const decodedPath = decodeURIComponent(urlPath || '/');
  const normalizedPath = decodedPath === '/' ? '/design-library.html' : decodedPath;

  // Serve design-library.html from dist/
  if (normalizedPath === '/design-library.html') {
    return OUTPUT_FILE;
  }

  const absolutePath = path.resolve(ROOT, '.' + normalizedPath);

  if (!absolutePath.startsWith(ROOT + path.sep) && absolutePath !== ROOT) {
    return null;
  }

  return absolutePath;
}

function serveStatic(res, urlPath) {
  const filePath = resolveStaticPath(urlPath);
  if (!filePath || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    sendText(res, 404, 'Not found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = CONTENT_TYPES[ext] || 'application/octet-stream';

  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
}

async function handleCreateComponent(req, res) {
  const parsed = await readJsonBody(req, res);
  if (!parsed) return;

  const preview = componentScaffold.getPreviewData(parsed);
  if (preview.code !== 'READY') {
    sendJson(res, preview.code === 'COMPONENT_EXISTS' ? 409 : 400, preview);
    return;
  }

  let created = null;
  try {
    created = componentScaffold.createComponentFromRequest(parsed);
    const buildResult = runBuild();

    if (!buildResult.ok) {
      componentScaffold.removeComponentScaffold(created.componentId);
      const rollbackBuild = runBuild();

      sendJson(res, 500, Object.assign({}, created, {
        ok: false,
        code: 'BUILD_FAILED',
        message: 'Component scaffold creation was rolled back because the design library rebuild failed.',
        buildExitCode: buildResult.status,
        buildStdout: buildResult.stdout,
        buildStderr: buildResult.stderr,
        rollbackRestoredLibrary: rollbackBuild.ok
      }));
      return;
    }

    sendJson(res, 201, Object.assign({}, created, {
      ok: true,
      code: 'CREATED',
      message: 'Component scaffold created successfully.',
      viewId: 'form-fields/' + created.componentId
    }));
  } catch (error) {
    const details = error.details || componentScaffold.getPreviewData(parsed);
    sendJson(res, details.code === 'COMPONENT_EXISTS' ? 409 : 500, Object.assign({}, details, {
      ok: false,
      message: details.message || error.message || 'Unable to create the component scaffold.'
    }));
  }
}

async function handleComponentPreview(req, res, requestUrl) {
  if (req.method === 'GET') {
    const prompt = requestUrl.searchParams.get('prompt') || '';
    sendJson(res, 200, componentScaffold.getPreviewData({ prompt: prompt }));
    return;
  }

  const parsed = await readJsonBody(req, res);
  if (!parsed) return;
  sendJson(res, 200, componentScaffold.getPreviewData(parsed));
}

async function requestHandler(req, res) {
  const requestUrl = new URL(req.url, 'http://' + req.headers.host);

  if (req.method === 'GET' && requestUrl.pathname === '/__design-library/status') {
    sendJson(res, 200, {
      ok: true,
      code: 'READY',
      message: 'Design library scaffold API is available.',
      outputExists: fs.existsSync(OUTPUT_FILE)
    });
    return;
  }

  if ((req.method === 'GET' || req.method === 'POST') && requestUrl.pathname === '/__design-library/component-preview') {
    await handleComponentPreview(req, res, requestUrl);
    return;
  }

  if (req.method === 'POST' && requestUrl.pathname === '/__design-library/create-component') {
    await handleCreateComponent(req, res);
    return;
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    sendText(res, 405, 'Method not allowed');
    return;
  }

  serveStatic(res, requestUrl.pathname);
}

const initialBuild = runBuild();
if (!initialBuild.ok) {
  if (initialBuild.stdout) process.stdout.write(initialBuild.stdout);
  if (initialBuild.stderr) process.stderr.write(initialBuild.stderr);
  console.error('Failed to build design-library.html before starting the server.');
  process.exit(initialBuild.status || 1);
}

const server = http.createServer(function(req, res) {
  requestHandler(req, res).catch(function(error) {
    sendJson(res, 500, {
      ok: false,
      code: 'SERVER_ERROR',
      message: error && error.message ? error.message : 'Unexpected server error.'
    });
  });
});

server.listen(PORT, HOST, function() {
  console.log('Design library server running at http://' + HOST + ':' + PORT + '/design-library.html');
});