import type {
  RequestOptions,
  ResourceOptions,
  ResponseBodyTypes,
} from '@gitbeaker/requester-utils';
import {
  GitbeakerRequestError,
  GitbeakerRetryError,
  GitbeakerTimeoutError,
  createRequesterFn,
  getMatchingRateLimiter,
} from '@gitbeaker/requester-utils';

export async function defaultOptionsHandler(
  resourceOptions: ResourceOptions,
  requestOptions: RequestOptions,
): Promise<RequestOptions & { agent?: unknown }> {
  const options: RequestOptions & { agent?: unknown } = { ...requestOptions };

  if (
    resourceOptions.url.includes('https') &&
    resourceOptions.rejectUnauthorized != null &&
    resourceOptions.rejectUnauthorized === false
  ) {
    if (typeof window === 'undefined') {
      const { Agent } = await import('https');

      options.agent = new Agent({
        rejectUnauthorized: false,
      });
    }
  }

  return options;
}

export async function processBody(response: Response): Promise<ResponseBodyTypes> {
  // Split to remove potential charset info from the content type
  const contentType = (response.headers.get('content-type') || '').split(';')[0].trim();

  if (contentType === 'application/json') {
    return response.json().then((v) => v || {});
  }

  if (contentType.startsWith('text/')) {
    return response.text().then((t) => t || '');
  }

  return response.blob();
}

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function parseResponse(response: Response, asStream = false) {
  const { status, headers: rawHeaders } = response;
  const headers = Object.fromEntries(rawHeaders.entries());
  let body: ResponseBodyTypes | null;

  if (asStream) {
    body = response.body;
  } else {
    body = status === 204 ? null : await processBody(response); // eslint-disable-line
  }

  return { body, headers, status };
}

async function throwFailedRequestError(
  request: Request,
  response: Response,
): Promise<GitbeakerRequestError> {
  const content = await response.text();
  const contentType = response.headers.get('Content-Type');
  let description = 'API Request Error';

  if (contentType?.includes('application/json')) {
    const output = JSON.parse(content);

    description = JSON.stringify(output.error || output.message, null, 2);
  } else {
    description = content;
  }

  throw new GitbeakerRequestError(response.statusText, {
    cause: {
      description,
      request,
      response,
    },
  });
}

function getConditionalMode(endpoint: string) {
  if (endpoint.includes('repository/archive')) return 'same-origin';
  return undefined; // Default is 'cors'
}

export async function defaultRequestHandler(endpoint: string, options?: RequestOptions) {
  const retryCodes = [429, 502];
  const maxRetries = 10;
  const { prefixUrl, asStream, searchParams, rateLimiters, method, ...opts } = options || {};
  const rateLimit = getMatchingRateLimiter(endpoint, rateLimiters, method);
  let baseUrl: string | undefined;

  if (prefixUrl) baseUrl = prefixUrl.endsWith('/') ? prefixUrl : `${prefixUrl}/`;

  const url = new URL(endpoint, baseUrl);

  url.search = searchParams || '';

  // CHECKME: https://github.com/nodejs/undici/issues/1305
  const mode = getConditionalMode(endpoint);

  /* eslint-disable no-await-in-loop */
  for (let i = 0; i < maxRetries; i += 1) {
    const request = new Request(url, { ...opts, method, mode });

    await rateLimit();

    const response = await fetch(request).catch((e) => {
      if (e.name === 'TimeoutError' || e.name === 'AbortError') {
        throw new GitbeakerTimeoutError('Query timeout was reached');
      }

      throw e;
    });

    if (response.ok) return parseResponse(response, asStream);
    if (!retryCodes.includes(response.status)) await throwFailedRequestError(request, response);

    // Retry
    await delay(2 ** i * 0.25);

    // eslint-disable-next-line
    continue;
  }
  /* eslint-enable */

  throw new GitbeakerRetryError(
    `Could not successfully complete this request due to Error 429. Check the applicable rate limits for this endpoint.`,
  );
}

export const requesterFn = createRequesterFn(defaultOptionsHandler, defaultRequestHandler);
