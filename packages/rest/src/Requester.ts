import {
  defaultOptionsHandler as baseOptionsHandler,
  createRequesterFn,
} from '@gitbeaker/requester-utils';
import type {
  DefaultRequestOptions,
  DefaultResourceOptions,
  RequestOptions,
} from '@gitbeaker/requester-utils';

export async function defaultOptionsHandler(
  resourceOptions: DefaultResourceOptions,
  { body, searchParams, asStream, sudo, method }: DefaultRequestOptions = {},
): Promise<RequestOptions & { agent?: unknown }> {
  const options: RequestOptions & { agent?: unknown } = await baseOptionsHandler(resourceOptions, {
    body,
    searchParams,
    asStream,
    sudo,
    method,
  });

  if (
    resourceOptions.url.includes('https') &&
    resourceOptions.rejectUnauthorized != null &&
    resourceOptions.rejectUnauthorized === false
  ) {
    if (typeof window !== 'object') {
      const { Agent } = await import('https');

      options.agent = new Agent({
        rejectUnauthorized: false,
      });
    }
  }

  return options;
}

export async function processBody(response: Response) {
  // Split to remove potential charset info from the content type
  const contentType = (response.headers.get('content-type') || '').split(';')[0].trim();

  if (contentType === 'application/json') {
    return response.json().then((v) => v || {});
  }

  if (contentType.startsWith('text/')) {
    return response.text().then((t) => t || '');
  }

  return response.arrayBuffer();
}

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function parseResponse(response: Response, asStream = false) {
  const { status, headers: rawHeaders } = response;
  const headers = Object.fromEntries(rawHeaders.entries());
  let body;

  if (asStream) {
    body = response.body;
  } else {
    body = status === 204 ? null : await processBody(response); // eslint-disable-line
  }

  return { body, headers, status };
}

async function throwFailedRequestError(response: Response) {
  const content = await response.text(); // eslint-disable-line
  const contentType = response.headers.get('Content-Type');
  let description = 'API Request Error';

  if (contentType?.includes('application/json')) {
    const output = JSON.parse(content);

    description = JSON.stringify(output.error || output.message, null, 2);
  } else {
    description = content;
  }

  throw new Error(response.statusText, {
    cause: {
      description,
      response,
    },
  });
}

export async function defaultRequestHandler(endpoint: string, options: RequestOptions) {
  const retryCodes = [429, 502];
  const maxRetries = 10;
  const { prefixUrl, asStream, searchParams, ...opts } = options;

  /* eslint-disable no-await-in-loop */
  for (let i = 0; i < maxRetries; i += 1) {
    const url = `${prefixUrl}${endpoint}${searchParams ? `?${searchParams}` : ''}`;
    const response = await fetch(url, { ...opts, mode: 'same-origin' });

    if (response.ok) return parseResponse(response, asStream);
    if (!retryCodes.includes(response.status)) await throwFailedRequestError(response);

    // Retry
    await delay(2 ** i * 0.1);

    // eslint-disable-next-line
    continue;
  }
  /* eslint-enable */

  throw new Error('Could not successfully complete this request');
}

export const requesterFn = createRequesterFn(defaultOptionsHandler, defaultRequestHandler);
