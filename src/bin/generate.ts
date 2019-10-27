import getParamNames from 'get-param-names';
import { outputJsonSync, removeSync } from 'fs-extra';
import * as core from '../core';
import { BaseService } from '../core/infrastructure';

function isGetter(x, name) {
  return (Object.getOwnPropertyDescriptor(x, name) || {}).get;
}

function isFunction(x, name) {
  return typeof x[name] === 'function';
}

function deepFunctions(x) {
  return (
    x &&
    x !== Object.prototype &&
    Object.getOwnPropertyNames(x)
      .filter(name => isGetter(x, name) || isFunction(x, name))
      .concat(deepFunctions(Object.getPrototypeOf(x)) || [])
  );
}

function distinctDeepFunctions(x): string[] {
  return Array.from(new Set(deepFunctions(x)));
}

function getInstanceMethods(x) {
  return distinctDeepFunctions(x).filter(name => name !== 'constructor' && !~name.indexOf('__'));
}

function removeOptionalArg(list) {
  if (['options', '_a'].includes(list[list.length - 1])) list.pop();

  return list;
}

function buildMap() {
  const map = {};
  const baseArgs = Object.keys(getParamNames(BaseService)[0]);

  for (const [name, service] of Object.entries(core)) {
    if (name.includes('Bundle') || name === 'Gitlab') continue;

    const s = new service();

    map[name] = [{ name: 'constructor', args: baseArgs }];

    for (const m of getInstanceMethods(s) as string[]) {
      map[name].push({
        name: m,
        args: removeOptionalArg(getParamNames(s[m])),
      });
    }
  }

  return map;
}

// Generate the services map
outputJsonSync('./dist/map.json', buildMap());

removeSync('./temp');
