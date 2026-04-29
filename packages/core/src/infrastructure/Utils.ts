import { stringify } from 'picoquery';
import { decamelizeKeys } from 'xcase';

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
// Deep camelization based on type-fest implementation
export type Camelize<Value> = Value extends any[]
  ? Value
  : Value extends object
    ? {
        [K in keyof Value as CamelizeString<K>]: Camelize<Value[K]>;
      }
    : Value;

export type Simplify<T> = T extends infer S ? { [K in keyof S]: S[K] } : never;
export type Never<T> = Simplify<{ [P in keyof T]?: never }>;
export type SomeOf<T> = { [K in keyof T]: Pick<Required<T>, K> }[keyof T];
export type OneOf<T> = { [K in keyof T]: Simplify<Never<Omit<T, K>> & Pick<T, K>> }[keyof T];
export type OneOrNoneOf<T> = Never<T> | OneOf<T>;
export type AllOrNone<T extends Record<string, any>> = T | Partial<Record<keyof T, never>>;
export type MappedOmit<T, K extends keyof T> = { [P in keyof T as P extends K ? never : P]: T[P] };

export function createFormData(object: Record<string, unknown>): FormData {
  const form = new FormData();

  Object.entries(object).forEach(([k, v]) => {
    if (v == null) return;
    if (Array.isArray(v)) form.append(k, v[0] as Blob, v[1] as string);
    else form.append(k, v as unknown as string | Blob);
  });

  return form;
}

/**
 * A special class to mark path segments that should not be URL-encoded.
 * Used for paths that already contain special characters like '/' that should be preserved.
 * For example, in API paths like 'repository/commits', the slash should not be encoded to '%2F'.
 */
export class RawPathSegment {
  public readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  toString(): string {
    return this.value;
  }
}

/**
 * Normalize GitLab API endpoint by encoding route parameters.
 * Handles special cases where certain path segments (wrapped in RawPathSegment)
 * should not be URL-encoded.
 * @param strings Template string parts
 * @param values Values to be encoded and inserted between string parts
 */
export function endpoint(
  strings: TemplateStringsArray,
  ...values: (string | number | RawPathSegment)[]
): string {
  return values.reduce<string>((result, value, index) => {
    const encodedValue =
      value instanceof RawPathSegment ? value.value : encodeURIComponent(String(value));

    return result + encodedValue + strings[index + 1];
  }, strings[0]);
}

/**
 * Parse link header
 * @param linkString
 */
export function parseLinkHeader(linkString: string): { next?: string; prev?: string } {
  const output: Record<string, string> = {};
  const regex = /<([^>]+)>; rel="([^"]+)"/g;
  let m: RegExpExecArray | null;

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

  return stringify(
    { [prefixKey]: formatted },
    {
      nesting: true,
      nestingSyntax: 'index',
      arrayRepeat: true,
      arrayRepeatSyntax: 'bracket',
    },
  )
    .split('&')
    .reduce((acc: Record<string, string>, cur: string) => {
      const [key, val] = cur.split(/=(.*)/);

      acc[decodeURIComponent(key)] = decodeURIComponent(val);

      return acc;
    }, {});
}

export function getPrefixedUrl(
  suffix: string,
  prefixMapping: Record<string, string | number | boolean | undefined> = {},
): string {
  const validEntries = Object.entries(prefixMapping).filter(
    ([, value]) => value != null && value !== false,
  );

  if (validEntries.length === 0) return suffix;

  const pathSegments = validEntries.map(([prefixType, id]) => {
    if (id === true) {
      return prefixType;
    }
    return `${prefixType}/${encodeURIComponent(String(id))}`;
  });

  const combinedPath = pathSegments.join('/');

  return suffix ? `${combinedPath}/${suffix}` : combinedPath;
}

export function ensureRequiredParams(
  params: Record<string, unknown>,
  { maxExpected = 1, minExpected = 1 }: { maxExpected?: number; minExpected?: number } = {},
): void {
  const paramNames = Object.keys(params);
  const providedParams = paramNames.filter((name) => params[name] != null);

  if (providedParams.length < minExpected) {
    const paramList = paramNames.join(' or ');
    throw new Error(
      `Missing required argument. Please supply a ${paramList} in the options parameter.`,
    );
  }

  if (providedParams.length > maxExpected) {
    const paramList = paramNames.join(', ');
    throw new Error(
      `Too many arguments provided. Expected at most ${maxExpected} of: ${paramList}.`,
    );
  }
}
