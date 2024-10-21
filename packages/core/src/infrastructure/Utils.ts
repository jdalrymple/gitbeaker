import { decamelizeKeys } from 'xcase';
import QS from 'qs';

export interface UserAgentDetailSchema extends Record<string, unknown> {
  user_agent: string;
  ip_address: string;
  akismet_submitted: boolean;
}

export type CamelizeString<T extends PropertyKey> = T extends string
  ? string extends T
    ? string
    : T extends `${infer F}_${infer R}`
      ? `${F}${Capitalize<CamelizeString<R>>}`
      : T
  : T;

export type Camelize<T> = { [K in keyof T as CamelizeString<K>]: Camelize<T[K]> };

export type Simplify<T> = T extends infer S ? { [K in keyof S]: S[K] } : never;
export type Never<T> = Simplify<{ [P in keyof T]?: never }>;
export type SomeOf<T> = { [K in keyof T]: Pick<Required<T>, K> }[keyof T];
export type OneOf<T> = { [K in keyof T]: Simplify<Pick<T, K> & Never<Omit<T, K>>> }[keyof T];
export type OneOrNoneOf<T> = Never<T> | OneOf<T>;
export type AllOrNone<T extends Record<string, any>> = T | Partial<Record<keyof T, never>>;

export type MappedOmit<T, K extends keyof T> = { [P in keyof T as P extends K ? never : P]: T[P] };

export function appendFormFromObject(object: Record<string, OptionValueType>): FormData {
  const form = new FormData();

  Object.entries(object).forEach(([k, v]) => {
    if (!v) return;
    if (Array.isArray(v)) form.append(k, v[0] as Blob, v[1] as string);
    else form.append(k, v as unknown as string | Blob);
  });

  return form;
}

/**
 * Normalize GitLab API endpoint by encoding route parameters.
 * @param strings
 * @param values
 */
export function endpoint(strings: TemplateStringsArray, ...values: (string | number)[]): string {
  return values.reduce<string>(
    (string, value, index) => string + encodeURIComponent(value) + strings[index + 1],
    strings[0],
  );
}

/**
 * Parse link header
 * @param linkString
 */
export function parseLinkHeader(linkString: string): { next?: string; prev?: string } {
  const output: Record<string, string> = {};
  const regex = /<([^>]+)>; rel="([^"]+)"/g;
  let m: RegExpExecArray | null;

  // eslint-disable-next-line
  while ((m = regex.exec(linkString))) {
    const [, v, k] = m;
    output[k] = v;
  }

  return output;
}

export function reformatObjectOptions(
  obj: Record<string, unknown>,
  prefixKey: string,
  decamelizeValues = false,
): Record<string, string> {
  const formatted = decamelizeValues ? decamelizeKeys(obj) : obj;

  return QS.stringify({ [prefixKey]: formatted }, { encode: false })
    .split('&')
    .reduce((acc: Record<string, string>, cur: string) => {
      const [key, val] = cur.split(/=(.*)/);

      acc[key] = val;

      return acc;
    }, {});
}
