import type { Agent } from 'http';
import Picomatch from 'picomatch';
import { stringify } from 'picoquery';
import { RateLimiterMemory, RateLimiterQueue } from 'rate-limiter-flexible';
import { decamelizeKeys } from 'xcase';

const { isMatch: isGlobMatch } = Picomatch;

// Types
export type RateLimiterFn = () => Promise<number>;

export type RateLimiters = Record<string, RateLimiterFn | { method: string; limit: RateLimiterFn }>;

export type RateLimitOptions = Record<string, number | { method: string; limit: number }>;

export type RequesterFn = (resourceOptions: ResourceOptions) => RequesterType;

export type ResponseBodyType =
  | Record<string, unknown>[]
  | string[]
  | Record<string, unknown>
  | ReadableStream
  | Blob
  | string
  | number
  | null;

export type ResponseType = ResponseBodyType | void;

export interface FormattedResponse<T extends ResponseType = ResponseType> {
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
  rateLimits?: RateLimitOptions;
  rateLimitDuration?: number;
  agent?: Agent;
};

export type RequesterBodyType =
  | Record<string, unknown>
  | Record<string, unknown>[]
  | FormData
  | Blob
  | ArrayBuffer;

export type RequesterSearchParams = Record<
  string,
  | Record<string, string | number>[]
  | number[]
  | string[]
  | Record<string, string | number>
  | string
  | number
  | boolean
>;

export type DefaultRequesterOptions = {
  body?: RequesterBodyType;
  searchParams?: RequesterSearchParams;
  sudo?: string | number;
  asStream?: boolean;
  signal?: AbortSignal;
};

export interface RequesterType {
  get<T extends ResponseType>(
    endpoint: string,
    options?: DefaultRequesterOptions,
  ): Promise<FormattedResponse<T>>;
  post<T extends ResponseType>(
    endpoint: string,
    options?: DefaultRequesterOptions,
  ): Promise<FormattedResponse<T>>;
  put<T extends ResponseType>(
    endpoint: string,
    options?: DefaultRequesterOptions,
  ): Promise<FormattedResponse<T>>;
  patch<T extends ResponseType>(
    endpoint: string,
    options?: DefaultRequesterOptions,
  ): Promise<FormattedResponse<T>>;
  delete<T extends ResponseType>(
    endpoint: string,
    options?: DefaultRequesterOptions,
  ): Promise<FormattedResponse<T>>;
}

export type RequestOptions = {
  headers?: Record<string, string>;
  timeout?: number;
  method?: string;
  searchParams?: string;
  prefixUrl?: string;
  body?: BodyInit;
  asStream?: boolean;
  signal?: AbortSignal;
  rateLimiters?: RateLimiters;
  agent?: Agent;
};

export type RequestHandlerFn<T extends ResponseType = ResponseType> = (
  endpoint: string,
  options?: RequestOptions,
) => Promise<FormattedResponse<T>>;

export type OptionsHandlerFn = (
  serviceOptions: ResourceOptions,
  requestOptions: RequestOptions,
) => Promise<RequestOptions>;

type PresetConstructors<T> = {
  [K in keyof T]: T[K];
};

// Utility methods
export function generateRateLimiterFn(limit: number, interval: number) {
  const limiter = new RateLimiterQueue(
    new RateLimiterMemory({ points: limit, duration: interval }),
  );

  return () => limiter.removeTokens(1);
}

export function formatQuery(params: Record<string, unknown> = {}): string {
  const decamelized = decamelizeKeys(params);

  return stringify(decamelized, {
    nesting: true,
    nestingSyntax: 'index',
    arrayRepeat: true,
    arrayRepeatSyntax: 'bracket',
  });
}

export async function defaultOptionsHandler(
  resourceOptions: ResourceOptions,
  {
    body,
    searchParams,
    sudo,
    signal,
    asStream = false,
    method = 'GET',
  }: { method?: string } & DefaultRequesterOptions = {},
): Promise<RequestOptions> {
  const { headers: preconfiguredHeaders, authHeaders, url, agent } = resourceOptions;
  const defaultOptions: RequestOptions = {
    method,
    asStream,
    signal,
    prefixUrl: url,
    agent,
  };

  defaultOptions.headers = { ...preconfiguredHeaders };

  if (sudo) defaultOptions.headers.sudo = `${sudo}`;

  if (
    body instanceof FormData ||
    body instanceof Blob ||
    body instanceof ArrayBuffer ||
    typeof body === 'string'
  ) {
    defaultOptions.body = body;
    // Set Content-Type header for Blobs to prevent automatic FormData conversion
    if (body instanceof Blob && body.type) {
      defaultOptions.headers['Content-Type'] = body.type;
    }
  } else if (body != null) {
    defaultOptions.body = JSON.stringify(decamelizeKeys(body));
    defaultOptions.headers['Content-Type'] = 'application/json';
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

export function createRateLimiters(
  rateLimitOptions: RateLimitOptions = {},
  rateLimitDuration: number = 60,
) {
  const rateLimiters: RateLimiters = {};

  Object.entries(rateLimitOptions).forEach(([key, config]) => {
    if (typeof config === 'number')
      rateLimiters[key] = generateRateLimiterFn(config, rateLimitDuration);
    else
      rateLimiters[key] = {
        method: config.method.toUpperCase(),
        limit: generateRateLimiterFn(config.limit, rateLimitDuration),
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
    const rateLimiters = createRateLimiters(
      serviceOptions.rateLimits,
      serviceOptions.rateLimitDuration,
    );

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

function createPresetConstructor<T extends new (...args: any[]) => any>(
  Constructor: T,
  presetConfig: Record<string, unknown>,
): T {
  return class extends Constructor {
    constructor(...args: any[]) {
      const [config, ...rest] = args;
      super({ ...presetConfig, ...config }, ...(rest as ConstructorParameters<T>));
    }
  } as T;
}

export function presetResourceArguments<
  T extends Record<string, any>,
  Config extends Record<string, unknown>,
>(resources: T, customConfig: Config = {} as Config): PresetConstructors<T> {
  const result = {} as PresetConstructors<T>;

  Object.entries(resources).forEach(([key, Constructor]) => {
    if (typeof Constructor === 'function') {
      result[key as keyof T] = createPresetConstructor(
        Constructor as new (...args: any[]) => any,
        customConfig,
      ) as any;
    } else {
      result[key as keyof T] = Constructor;
    }
  });

  return result;
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
