import getParamNames from 'get-param-names';
import { BaseService } from '@gitbeaker/requester-utils';
import { outputJsonSync } from 'fs-extra';
import * as Gitbeaker from '../src';

function isGetter(x: object, name: string) {
  return (Object.getOwnPropertyDescriptor(x, name) || {}).get;
}

function isFunction(x: object, name: string) {
  return typeof x[name] === 'function';
}

function deepFunctions(x: object): string[] {
  if (x !== Object.prototype) {
    return Object.getOwnPropertyNames(x)
      .filter((name) => isGetter(x, name) || isFunction(x, name))
      .concat(deepFunctions(Object.getPrototypeOf(x)) || []);
  }

  return [];
}

function distinctDeepFunctions(x: object): string[] {
  return Array.from(new Set(deepFunctions(x)));
}

function getInstanceMethods(x: object): string[] {
  return distinctDeepFunctions(x).filter((name) => name !== 'constructor' && !~name.indexOf('__'));
}

function removeOptionalArg(list: string[]) {
  if (['options', '_a'].includes(list[list.length - 1])) list.pop();

  return list;
}

export function buildMap() {
  const map = {};
  const baseArgs = Object.keys(getParamNames(BaseService)[0]);

  for (const [name, service] of Object.entries(Gitbeaker as object)) {
    if (name.includes('Bundle') || ['Gitlab', 'getAPIMap'].includes(name)) continue;

    const s = new service({ requester: {} });

    map[name] = [{ name: 'constructor', args: baseArgs }];

    for (const m of getInstanceMethods(s)) {
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
