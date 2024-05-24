import FS from 'node:fs';
import getParamNames from 'get-param-names';
import { BaseResource, RequesterType } from '@gitbeaker/requester-utils';
import * as resources from '../src/resources';

function getInstanceMethods(x: object): string[] {
  if (!x) return [];

  const proto = Reflect.getPrototypeOf(x);

  if (!proto) return [];

  const methods = new Set(Reflect.ownKeys(proto));

  return Array.from(methods)
    .filter((name) => name !== 'constructor')
    .map((name) => name.toString());
}

function removeOptionalArg(list: (string | Record<string, unknown>)[] = []): string[] {
  // Only the last item could be an object
  if (list.length > 0) {
    if (list.at(-1) === 'options') list.pop();
    else if (list.at(-1)?.constructor === Object) list.pop();
  }

  return list as string[];
}

export function buildMap() {
  const map: Record<string, { name: string; args: string[] }[]> = {};
  const baseArgs = Object.keys(getParamNames(BaseResource)[0] as Record<string, unknown>);
  const { Gitlab, ...directResources } = resources;

  Object.entries(directResources).forEach(([name, Resource]) => {
    const r = new Resource({ token: 'dummey', requesterFn: () => ({}) as RequesterType });
    const formattedInstanceMethods = getInstanceMethods(r).map((m) => ({
      name: m,
      args: removeOptionalArg(getParamNames(r[m]) as (string | Record<string, unknown>)[]),
    }));

    map[name] = [{ name: 'constructor', args: baseArgs }].concat(formattedInstanceMethods);
  });

  return map;
}

// Generate the resources map
FS.rmSync('./dist/map.json', { recursive: true, force: true });
FS.mkdirSync('dist', { recursive: true });
FS.writeFileSync('./dist/map.json', JSON.stringify(buildMap(), null, 2));
