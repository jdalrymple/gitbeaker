import FormData from 'form-data';

export type CamelizeString<T extends PropertyKey> = T extends string
  ? string extends T
    ? string
    : T extends `${infer F}_${infer R}`
    ? `${F}${Capitalize<CamelizeString<R>>}`
    : T
  : T;

export type Camelize<T> = { [K in keyof T as CamelizeString<K>]: T[K] };

export function appendFormFromObject(object: Record<string, unknown>): FormData {
  /* eslint @typescript-eslint/ban-ts-comment: 0 */
  // @ts-ignore
  const form = new FormData();

  Object.entries(object).forEach(([k, v]) => {
    if (Array.isArray(v)) form.append(k, v[0], v[1]);
    else form.append(k, v as any);
  });

  return form;
}

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
