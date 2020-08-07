import {attachFetch} from '../lib/fetchFromApi.js';

const serviceDelay = 10;
const tankNames = ['ActionScript', 'Ada', 'Agora', 'Aldor', 'Alef', 'ALF', 'ALGOL', 'Alice', 'AmbientTalk', 'AMOS', 'AngelScript', 'Apex', 'AppleScript', 'Assembly', 'B', 'Bash', 'BASIC', 'BeanShell', 'Bertrand', 'BETA', 'Blockly', 'Boomerang', 'C', 'C_MinusMinus', 'C_PlusPlus', 'C_Sharp', 'CacheObjectScript', 'C_Shell', 'Caml', 'Ceylon', 'Citrine', 'Claire', 'Clarion', 'Clipper', 'CLIST', 'Clojure', 'COBOL', 'CobolScript', 'Cobra', 'CoffeeScript', 'ColdFusion', 'CIL', 'CommonLisp', 'ComponentPascal', 'Cool', 'Coq', 'Crystal', 'Darwin', 'Dart', 'ECMAScript', 'Erlang', 'Euler', 'FShrap', 'Fortran ', 'GoLang', 'Groovy', 'Haskell', 'Java', 'JSharp', 'Kotlin', 'Legoscript', 'LINQ', 'LiveCode', 'LiveScript', 'Lua', 'MATLAB', 'MicroScript', 'OCaml', 'Pascal', 'PHP', 'Perl', 'PascalScript', 'PowerShell', 'PureScript', 'Python', 'QtScript', 'R', 'Reason', 'Ruby', 'Rust', 'Scala', 'Simula', 'Smalltalk', 'SPARK', 'SQL', 'Swift', 'TeX', 'Transcript', 'TypeScript', 'Tynker', 'Unicon', 'Viper', 'WebAssembly', 'XAML', 'YAML', 'ZetaLisp', 'ZPL'];

function isNameAllowed(name) {
  const namespace = 'scriptMap';
  if(name.length < 3) return false;
  let storedScripts = localStorage.getItem(namespace);
  let scriptMap = storedScripts ? JSON.parse(storedScripts) : {};
  return !scriptMap[name];
}

function createScriptWithName(name) {
  const namespace = 'scriptMap';
  let storedScripts = localStorage.getItem(namespace);
  let scriptMap = storedScripts ? JSON.parse(storedScripts) : {};
  if(Object.keys(scriptMap).length >= 7) {
    throw new Error('Script limit exceeded');
  }
  if(!isNameAllowed(name)) {
    throw new Error("Name " + name + " is not allowed for AI script");
  }
  let script = {
    name: name,
    code: "importScripts('lib/tank.js');\n\n// Don't know where to start?\n// Read Getting Started in \"Docs\" section \n\ntank.init(function(settings, info) {\n\t// initialize tank here\n  \n});\n\ntank.loop(function(state, control) {\n\t// write your tank logic here\n  \n});\n\n\n"
  };
  scriptMap[name] = script;
  localStorage.setItem(namespace, JSON.stringify(scriptMap));
  return script;
}

function getRandomScriptName() {
  return tankNames[Math.floor(Math.random() * tankNames.length)].toLowerCase();
}

function existsScript(name) {
  const namespace = 'scriptMap';
  let storedScripts = localStorage.getItem(namespace);
  let scriptMap = storedScripts ? JSON.parse(storedScripts) : {};
  return scriptMap[name] != undefined;
}

export const getScript = async (id) => {
  const namespace = 'scriptMap';
  let name = id.replace(/^local_/, '');
  await new Promise((resolve) => setTimeout(resolve, serviceDelay));
  if(!existsScript(name)) {
    throw new Error("Script '" + name + "' does not exist");
  }
  let storedScripts = localStorage.getItem(namespace);
  let scriptMap = storedScripts ? JSON.parse(storedScripts) : {};
  if(!scriptMap[name]) {
    throw new Error("Script '" + name + "' does not exist");
  }
  let result = JSON.parse(JSON.stringify(scriptMap[name]));
  return {
    id: 'local_' + result.name,
    scriptName: result.name,
    code: result.code
  };
};

export const createScript = async (suggestedName) => {
  await new Promise((resolve) => setTimeout(resolve, serviceDelay));
  let name = suggestedName || getRandomScriptName();
  let retry = 0;
  while(!isNameAllowed(name)) {
    name = getRandomScriptName();
    retry++;
    if(retry > 100) {
      throw new Error("Cannot find unique name for the script");
    }
  }
  return createScriptWithName(name);
};

export const renameScript = async (newValue, id) => {
  const namespace = 'scriptMap';
  await new Promise((resolve) => setTimeout(resolve, serviceDelay));
  let oldValue = id.replace(/^local_/, '');
  if(newValue.length < 3) {
    throw new Error(`Wrong script name. Script name must be at least 3 characters long`);
  }
  if(newValue.length >= 16) {
    throw new Error(`Wrong script name. Script name must be less than 16 characters long`);
  }
  if(existsScript(newValue)) {
    throw new Error(`Wrong script name. Script '${newValue}' already exists. The name must be unique`);
  }
  if(!((/^[A-Za-z0-9_-]+$/).test(newValue))) {
    throw new Error(`Wrong script name. Allowed characters are A-Z, a-z, 0-9, _, -`);
  }

  let storedScripts = localStorage.getItem(namespace);
  let scriptMap = storedScripts ? JSON.parse(storedScripts) : {};
  if(!scriptMap[oldValue]) {
    throw new Error("Script " + oldValue + " does not exist");
  }
  let newScriptMap = {};
  let names = Object.keys(scriptMap);
  for(let name of names) {
    if(name != oldValue) {
      newScriptMap[name] = scriptMap[name];
    }
  }
  newScriptMap[newValue] = scriptMap[oldValue];
  newScriptMap[newValue].name = newValue;
  localStorage.setItem(namespace, JSON.stringify(newScriptMap));
  return {
    id: 'local_' + newValue,
    scriptName: newValue
  };
};

export const getScriptNameList = async () => {
  const namespace = 'scriptMap';
  await new Promise((resolve) => setTimeout(resolve, serviceDelay));
  let storedScripts = localStorage.getItem(namespace);
  let scriptMap = storedScripts ? JSON.parse(storedScripts) : {};
  let result = [];
  for(let i in scriptMap) {
    result.push(i);
  }
  result = result.map((name) => ({
    id: 'local_' + name,
    scriptName: name
  }));
  return result;
};

export const updateScript = async (id, code) => {
  const namespace = 'scriptMap';
  await new Promise((resolve) => setTimeout(resolve, serviceDelay));
  let name = id.replace(/^local_/, '');
  let storedScripts = localStorage.getItem(namespace);
  let scriptMap = storedScripts ? JSON.parse(storedScripts) : {};
  if(!scriptMap[name]) {
    throw new Error("Script " + name + " does not exists");
  }
  scriptMap[name].code = code;
  localStorage.setItem(namespace, JSON.stringify(scriptMap));
  return {
    id, name, code, namespace
  };
};

export const deleteScript = async (id) => {
  const namespace = 'scriptMap';
  await new Promise((resolve) => setTimeout(resolve, serviceDelay));
  let name = id.replace(/^local_/, '');
  let storedScripts = localStorage.getItem(namespace);
  let scriptMap = storedScripts ? JSON.parse(storedScripts) : {};
  let newMap = {};
  for(let i in scriptMap) {
    if(i == name) continue;
    newMap[i] = scriptMap[i];
  }
  localStorage.setItem(namespace, JSON.stringify(newMap));
};

export default {
  getScriptNameList: attachFetch(getScriptNameList, () => {
    return [];
  }),
  createScript: attachFetch(createScript, (request) => {
    return [request.body.scriptName || null];
  }),
  deleteScript: attachFetch(deleteScript, (request) => {
    return [request.uriElements[request.uriElements.length-1]];
  }),
  getScript: attachFetch(getScript, (request) => {
    return [request.uriElements[request.uriElements.length-1]];
  }),
  updateScript: attachFetch(updateScript, (request) => {
    return [
      request.uriElements[request.uriElements.length-1],
      request.body.code
    ];
  }),
  renameScript: attachFetch(renameScript, (request) => {
    return [
      request.body.scriptName,
      request.uriElements[request.uriElements.length-1]
    ];
  })
};
