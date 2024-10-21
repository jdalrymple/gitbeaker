import { stringify } from 'qs';
import { decamelizeKeys } from 'xcase';
import { RateLimiterMemory, RateLimiterQueue } from 'rate-limiter-flexible';
import Picomatch from 'picomatch-browser';

const { isMatch: isGlobMatch } = Picomatch;

// Types
export type RateLimiterFn = () => Promise<number>;
export type RateLimiters = Record<string, RateLimiterFn | { method: string; limit: RateLimiterFn }>;
export type RateLimitOptions = Record<string, number | { method: string; limit: number }>;

export type ResponseBodyTypes =
  | Record<string, unknown>
  | Record<string, unknown>[]
  | ReadableStream
  | Blob
  | string
  | string[]
  | number
  | void
  | null;

export interface FormattedResponse<T extends ResponseBodyTypes = ResponseBodyTypes> {
  body: T;
  headers: Record<string, string>;
  status: number;
}

export interface Constructable<T = any> {
  new (...args: any[]): T;
}

export type ResourceOptions = {
  headers: { [header: string]: string };
  authHeaders: { [authHeader: string]: () => Promise<string> };
  url: string;
  rejectUnauthorized: boolean;
  rateLimits?: RateLimitOptions;
};

export type OptionValueType = string | boolean | Blob | number | (Blob | string)[];
export type RequesterBodyType = string | Blob | FormData | Record<string, OptionValueType>;
export type DefaultRequestOptions = {
  body?: RequesterBodyType;
  searchParams?: Record<string, string>;
  sudo?: string | number;
  method?: string;
  asStream?: boolean;
  signal?: AbortSignal;
};

export type RequestOptions = {
  headers?: Record<string, string>;
  timeout?: number;
  method?: string;
  searchParams?: string;
  prefixUrl?: string;
  body?: BodyInit;
  asStream?: boolean;
  signal?: AbortSignal;
  rateLimiters?: Record<string, RateLimiterFn>;
};

export interface RequesterType {
  get<T extends ResponseBodyTypes>(
    endpoint: string,
    options?: DefaultRequestOptions,
  ): Promise<FormattedResponse<T>>;
  post<T extends ResponseBodyTypes>(
    endpoint: string,
    options?: DefaultRequestOptions,
  ): Promise<FormattedResponse<T>>;
  put<T extends ResponseBodyTypes>(
    endpoint: string,
    options?: DefaultRequestOptions,
  ): Promise<FormattedResponse<T>>;
  patch<T extends ResponseBodyTypes>(
    endpoint: string,
    options?: DefaultRequestOptions,
  ): Promise<FormattedResponse<T>>;
  delete<T extends ResponseBodyTypes>(
    endpoint: string,
    options?: DefaultRequestOptions,
  ): Promise<FormattedResponse<T>>;
}

export type RequestHandlerFn<T extends ResponseBodyTypes = ResponseBodyTypes> = (
  endpoint: string,
  options?: Record<string, unknown>,
) => Promise<FormattedResponse<T>>;

// Utility methods
export function generateRateLimiterFn(limit: number, interval: number) {
  const limiter = new RateLimiterQueue(
    new RateLimiterMemory({ points: limit, duration: interval }),
  );

  return () => limiter.removeTokens(1);
}

export function formatQuery(params: Record<string, unknown> = {}): string {
  const decamelized = decamelizeKeys(params);

  // Using qs instead of query-string to support stringifying nested objects :/
  return stringify(decamelized, { arrayFormat: 'brackets' });
}

export type OptionsHandlerFn = (
  serviceOptions: ResourceOptions,
  requestOptions: RequestOptions,
) => Promise<RequestOptions>;

export async function defaultOptionsHandler(
  resourceOptions: ResourceOptions,
  {
    body,
    searchParams,
    sudo,
    signal,
    asStream = false,
    method = 'GET',
  }: DefaultRequestOptions = {},
): Promise<RequestOptions> {
  const { headers: preconfiguredHeaders, authHeaders, url } = resourceOptions;
  const defaultOptions: RequestOptions = {
    method,
    asStream,
    signal,
    prefixUrl: url,
  };

  defaultOptions.headers = { ...preconfiguredHeaders };

  if (sudo) defaultOptions.headers.sudo = `${sudo}`;

  if (body instanceof FormData || body instanceof Blob || typeof body === 'string') {
    defaultOptions.body = body;
  } else {
    defaultOptions.body = JSON.stringify(decamelizeKeys(body));
  }

  if (Object.keys(authHeaders).length > 0) {
    // Append dynamic auth header
    const [authHeaderKey, authHeaderFn] = Object.entries(authHeaders)[0];

    defaultOptions.headers[authHeaderKey] = await authHeaderFn();
  }

  // Format query parameters
  const q = formatQuery(searchParams);

  if (q) defaultOptions.searchParams = q;

  return Promise.resolve(defaultOptions);
}

export function createRateLimiters(rateLimitOptions: RateLimitOptions = {}) {
  const rateLimiters: RateLimiters = {};

  Object.entries(rateLimitOptions).forEach(([key, config]) => {
    if (typeof config === 'number') rateLimiters[key] = generateRateLimiterFn(config, 60);
    else
      rateLimiters[key] = {
        method: config.method.toUpperCase(),
        limit: generateRateLimiterFn(config.limit, 60),
      };
  });

  return rateLimiters;
}

export function createRequesterFn(
  optionsHandler: OptionsHandlerFn,
  requestHandler: RequestHandlerFn,
): (serviceOptions: ResourceOptions) => RequesterType {
  const methods = ['get', 'post', 'put', 'patch', 'delete'];

  return (serviceOptions) => {
    const requester: RequesterType = {} as RequesterType;
    const rateLimiters = createRateLimiters(serviceOptions.rateLimits);

    methods.forEach((m) => {
      requester[m] = async (endpoint: string, options: Record<string, unknown>) => {
        const defaultRequestOptions = await defaultOptionsHandler(serviceOptions, {
          ...options,
          method: m.toUpperCase(),
        });
        const requestOptions = await optionsHandler(serviceOptions, defaultRequestOptions);

        return requestHandler(endpoint, { ...requestOptions, rateLimiters });
      };
    });

    return requester;
  };
}

function extendClass<T extends Constructable>(Base: T, customConfig: Record<string, unknown>): T {
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

export function getMatchingRateLimiter(
  endpoint: string,
  rateLimiters: RateLimiters = {},
  method: string = 'GET',
): RateLimiterFn {
  const sortedEndpoints = Object.keys(rateLimiters).sort().reverse();
  const match = sortedEndpoints.find((ep) => isGlobMatch(endpoint, ep));
  const rateLimitConfig = match && rateLimiters[match];

  if (typeof rateLimitConfig === 'function') return rateLimitConfig;

  if (rateLimitConfig && rateLimitConfig?.method?.toUpperCase() === method.toUpperCase()) {
    return rateLimitConfig.limit;
  }

  return generateRateLimiterFn(3000, 60);
}
