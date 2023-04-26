import { decamelizeKeys } from 'xcase';
import { stringify } from 'qs';

// Types
export type ResponseBodyTypes =
  | Record<string, unknown>
  | Record<string, unknown>[]
  | ReadableStream
  | Blob
  | string
  | string[]
  | number
  | void;

export interface FormattedResponse<T extends ResponseBodyTypes = ResponseBodyTypes> {
  body: T;
  headers: Record<string, string>;
  status: number;
}

export interface RequesterType {
  get<T extends ResponseBodyTypes>(
    endpoint: string,
    options?: Record<string, unknown>,
  ): Promise<FormattedResponse<T>>;
  post<T extends ResponseBodyTypes>(
    endpoint: string,
    options?: Record<string, unknown>,
  ): Promise<FormattedResponse<T>>;
  put<T extends ResponseBodyTypes>(
    endpoint: string,
    options?: Record<string, unknown>,
  ): Promise<FormattedResponse<T>>;
  patch<T extends ResponseBodyTypes>(
    endpoint: string,
    options?: Record<string, unknown>,
  ): Promise<FormattedResponse<T>>;
  delete<T extends ResponseBodyTypes>(
    endpoint: string,
    options?: Record<string, unknown>,
  ): Promise<FormattedResponse<T>>;
}

export interface Constructable<T = any> {
  new (...args: any[]): T;
}

export type DefaultResourceOptions = {
  headers: { [header: string]: string };
  requestTimeout: number;
  url: string;
  rejectUnauthorized: boolean;
};

export type DefaultRequestOptions = {
  body?: FormData | Record<string, unknown>;
  searchParams?: Record<string, unknown>;
  sudo?: string;
  method?: string;
  asStream?: boolean;
};

export type RequestOptions = {
  headers: Record<string, string>;
  timeout?: number;
  method: string;
  searchParams?: string;
  prefixUrl: string;
  body?: string | FormData;
  asStream?: boolean;
};

// Utility methods
export function formatQuery(params: Record<string, unknown> = {}): string {
  const decamelized = decamelizeKeys(params);

  // Using qs instead of query-string to support stringifying nested objects :/
  return stringify(decamelized, { arrayFormat: 'brackets' });
}

export type OptionsHandlerFn = (
  serviceOptions: DefaultResourceOptions,
  requestOptions: DefaultRequestOptions,
) => Promise<RequestOptions>;

function isFormData(object) {
  return typeof object === 'object' && object.constructor.name === 'FormData';
}

export function defaultOptionsHandler(
  resourceOptions: DefaultResourceOptions,
  { body, searchParams, sudo, asStream = false, method = 'get' }: DefaultRequestOptions = {},
): Promise<RequestOptions> {
  const { headers: preconfiguredHeaders, requestTimeout, url } = resourceOptions;
  const headers = { ...preconfiguredHeaders };
  const defaultOptions: RequestOptions = {
    headers,
    timeout: requestTimeout,
    method,
    asStream,
    prefixUrl: url,
  };

  if (sudo) defaultOptions.headers.sudo = sudo;

  // FIXME: Not the best comparison, but...it will have to do for now.
  if (body) {
    if (isFormData(body)) {
      defaultOptions.body = body as FormData;
    } else {
      defaultOptions.body = JSON.stringify(decamelizeKeys(body));
      headers['content-type'] = 'application/json';
    }
  }

  // Format query parameters
  const q = formatQuery(searchParams);

  if (q) defaultOptions.searchParams = q;

  return Promise.resolve(defaultOptions);
}

export type RequestHandlerFn<T extends ResponseBodyTypes = ResponseBodyTypes> = (
  endpoint: string,
  options?: Record<string, unknown>,
) => Promise<FormattedResponse<T>>;

export function createRequesterFn(
  optionsHandler: OptionsHandlerFn,
  requestHandler: RequestHandlerFn,
): (serviceOptions: DefaultResourceOptions) => RequesterType {
  const methods = ['get', 'post', 'put', 'patch', 'delete'];

  return (serviceOptions) => {
    const requester: RequesterType = {} as RequesterType;

    methods.forEach((m) => {
      requester[m] = async (endpoint: string, options: Record<string, unknown>) => {
        const requestOptions = await optionsHandler(serviceOptions, { ...options, method: m });

        return requestHandler(endpoint, requestOptions);
      };
    });

    return requester;
  };
}

function extendClass<T extends Constructable>(
  Base: T,
  customConfig: Record<string, unknown> = {},
): T {
  return class extends Base {
    constructor(...options: any[]) {
      // eslint-disable-line
      const [config, ...opts] = options;

      super({ ...customConfig, ...config }, ...opts); // eslint-disable-line
    }
  };
}

export function presetResourceArguments<T extends Record<string, Constructable>>(
  resources: T,
  customConfig: Record<string, unknown> = {},
) {
  const updated = {};

  Object.entries(resources)
    .filter(([, s]) => typeof s === 'function') // FIXME: Odd default artifact included in this list during testing
    .forEach(([k, r]) => {
      updated[k] = extendClass(r, customConfig);
    });

  return updated as T;
}
