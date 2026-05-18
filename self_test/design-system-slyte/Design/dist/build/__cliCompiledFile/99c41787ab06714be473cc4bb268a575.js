import expHandlers from "../cli/expHandlers.js";
import * as Espree from "../../../../../espree/espree.js";
import {ClientCompiler} from "./lyte-client-compile.js";
var ClientCompilerAdvanced = ClientCompiler;
ClientCompilerAdvanced.expHandlers = expHandlers;
ClientCompilerAdvanced.Espree = Espree;
export { ClientCompilerAdvanced }