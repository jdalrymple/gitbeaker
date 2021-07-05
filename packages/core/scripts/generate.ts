import getParamNames from 'get-param-names';
import { BaseResource } from '@gitbeaker/requester-utils';
import { outputJsonSync } from 'fs-extra';
import * as Resources from '../src/resources';

const { Gitlab, ...resources } = Resources;

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
  const baseArgs = Object.keys(getParamNames(BaseResource)[0]);

  for (const [name, resource] of Object.entries(resources)) {
    const r = new resource({ requesterFn: () => ({}) });

    map[name] = [{ name: 'constructor', args: baseArgs }];

    for (const m of getInstanceMethods(r)) {
      map[name].push({
        name: m,
        args: removeOptionalArg(getParamNames(r[m])),
      });
    }
  }

  return map;
}

// Generate the resources map
outputJsonSync('./dist/map.json', buildMap());
