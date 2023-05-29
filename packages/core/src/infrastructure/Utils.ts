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

export type Camelize<T> = { [K in keyof T as CamelizeString<K>]: T[K] };

export type Never<T> = {
  [P in keyof T]?: never;
};

export type Only<T, U> = Required<T> & Never<U>;
export type Only3<T, U, V> = Required<T> & Never<U> & Never<V>;
export type Only4<T, U, V, W> = Required<T> & Never<U> & Never<V> & Never<W>;
export type OnlyOrNone<T, U> = Partial<T> & Never<U>;
export type OnlyOrNone3<T, U, V> = Partial<T> & Never<U> & Never<V>;
export type OnlyOrNone4<T, U, V, W> = Partial<T> & Never<U> & Never<V> & Never<W>;

export type Either<T, U> = Only<T, U> | Only<U, T>;
export type Either3<T, U, V> = Only3<T, U, V> | Only3<T, U, V> | Only3<T, U, V>;

export type Either4<T, U, V, W> =
  | Only4<T, U, V, W>
  | Only4<U, T, V, W>
  | Only4<V, T, U, W>
  | Only4<W, T, U, V>;
export type EitherOrNone<T, U> = OnlyOrNone<T, U> | OnlyOrNone<U, T>;
export type EitherOrNone3<T, U, V> =
  | OnlyOrNone3<T, U, V>
  | OnlyOrNone3<U, T, V>
  | OnlyOrNone3<V, T, U>;
export type EitherOrNone4<T, U, V, W> =
  | OnlyOrNone4<T, U, V, W>
  | OnlyOrNone4<U, T, V, W>
  | OnlyOrNone4<V, T, U, W>
  | OnlyOrNone4<W, T, U, V>;

export type AllOrNone<T extends Record<string, any>> = T | Partial<Record<keyof T, never>>;

export type OptionValueType = undefined | string | boolean | Blob | number | (Blob | string)[];

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
