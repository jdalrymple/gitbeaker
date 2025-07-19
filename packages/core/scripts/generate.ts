import FS from 'node:fs';
import { RequesterType } from '@gitbeaker/requester-utils';
import { getParamNames } from './getParamNames';
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
  const { Gitlab, ...directResources } = resources;

  Object.entries(directResources).forEach(([name, Resource]) => {
    const r = new Resource({ token: 'dummey', requesterFn: () => ({}) as RequesterType });
    const formattedInstanceMethods = getInstanceMethods(r).map((m) => ({
      name: m,
      args: removeOptionalArg(getParamNames(r[m] as () => unknown)),
    }));

    map[name] = formattedInstanceMethods;
  });

  return map;
}

// Generate the resources map
FS.rmSync('./dist/map.json', { recursive: true, force: true });
FS.mkdirSync('dist', { recursive: true });
FS.writeFileSync('./dist/map.json', JSON.stringify(buildMap(), null, 2));
