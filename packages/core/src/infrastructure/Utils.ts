/* eslint @typescript-eslint/no-explicit-any: 0 */
import { decamelizeKeys } from 'xcase';
import { stringify } from 'query-string';

interface Constructor {
  new (...args: any): any;
}

type Mapper<T extends { [name: string]: Constructor }, P extends keyof T> = {
  [name in P]: InstanceType<T[name]>;
};

export interface Bundle<T extends { [name: string]: Constructor }, P extends keyof T> {
  new (options?: any): Mapper<T, P>;
}

export function bundler<T extends { [name: string]: Constructor }, P extends keyof T>(services: T) {
  return (function Bundle(options?: any) {
    Object.entries(services || {}).forEach(([name, Ser]) => {
      this[name] = new Ser(options);
    });
  } as any) as Bundle<T, P>;
}

export function formatQuery(options) {
  return stringify(decamelizeKeys(options || {}) as object, { arrayFormat: 'bracket' });
}
