export type CamelizeString<T extends PropertyKey> = T extends string
  ? string extends T
    ? string
    : T extends `${infer F}_${infer R}`
    ? `${F}${Capitalize<CamelizeString<R>>}`
    : T
  : T;

export type Camelize<T> = { [K in keyof T as CamelizeString<K>]: T[K] };

export function getAPIMap(): Record<string, unknown> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require, import/no-unresolved
    return require('../../dist/map.json') as Record<string, unknown>;
  } catch (e) {
    throw new Error('This function is only available in the distributed code');
  }
}
