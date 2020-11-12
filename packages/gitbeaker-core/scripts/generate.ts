import getParamNames from 'get-param-names';
import { outputJsonSync } from 'fs-extra';
import { BaseService } from '@gitbeaker/requester-utils';
import * as Gitbeaker from '../src';

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
      .filter((name) => isGetter(x, name) || isFunction(x, name))
      .concat(deepFunctions(Object.getPrototypeOf(x)) || [])
  );
}

function distinctDeepFunctions(x): string[] {
  return Array.from(new Set(deepFunctions(x)));
}

function getInstanceMethods(x) {
  return distinctDeepFunctions(x).filter((name) => name !== 'constructor' && !~name.indexOf('__'));
}

function removeOptionalArg(list) {
  if (['options', '_a'].includes(list[list.length - 1])) list.pop();

  return list;
}

export function buildMap() {
  const map = {};
  const baseArgs = Object.keys(getParamNames(BaseService)[0]);

  for (const [name, service] of Object.entries(Gitbeaker as object)) {
    if (name.includes('Bundle') || name === 'Gitlab') continue;

    const s = new service({ requester: {} });

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
