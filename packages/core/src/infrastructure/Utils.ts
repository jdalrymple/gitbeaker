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

/**
 * Normalize GitLab API endpoint by encoding route parameters.
 * @param strings
 * @param values
 */
export function endpoint<T extends (string | number)[]>(
  strings: TemplateStringsArray,
  ...values: T
): T extends number[] ? void : string;
export function endpoint(strings: TemplateStringsArray, ...values: (string | number)[]): string {
  return values.reduce<string>(
    (string, value, index) => string + encodeURIComponent(value) + strings[index + 1],
    strings[0],
  );
}
