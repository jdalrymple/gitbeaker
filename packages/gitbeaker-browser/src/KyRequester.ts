import ky from 'ky';
import { Agent } from 'https';
import {
  DefaultServiceOptions,
  DefaultRequestReturn,
  DefaultRequestOptions,
  createRequesterFn,
  defaultOptionsHandler as baseOptionsHandler,
  wait,
} from '@gitbeaker/requester-utils';

function responseHeadersAsObject(response): Record<string, string> {
  const headers = {};

  Array.from(response.headers.entries()).forEach(([key, value]) => {
    headers[key] = value;
  });

  return headers;
}

export function defaultOptionsHandler(
  serviceOptions: DefaultServiceOptions,
  options: DefaultRequestOptions = {},
): DefaultRequestReturn & { agent?: Agent } {
  const opts: DefaultRequestReturn & { agent?: Agent } = baseOptionsHandler(
    serviceOptions,
    options,
  );

  if (
    serviceOptions.url.includes('https') &&
    serviceOptions.rejectUnauthorized != null &&
    serviceOptions.rejectUnauthorized === false
  ) {
    opts.agent = new Agent({
      rejectUnauthorized: serviceOptions.rejectUnauthorized,
    });
  }

  return { ...opts, headers: new Headers(serviceOptions.headers as Record<string, string>) };
}

export function processBody(response) {
  // Split to remove potential charset info from the content type
  const contentType = (response.headers.get('content-type') || '').split(';')[0].trim();

  switch (contentType) {
    case 'application/json': {
      return response.json().then((v) => v || {});
    }
    case 'application/octet-stream':
    case 'binary/octet-stream':
    case 'application/gzip': {
      return response.blob().then(Buffer.from);
    }
    default: {
      return response.text().then((t) => t || '');
    }
  }
}

export async function handler(endpoint: string, options: Record<string, unknown>) {
  const retryCodes = [429, 502];
  const maxRetries = 10;
  let response;

  for (let i = 0; i < maxRetries; i += 1) {
    try {
      if (options.method === 'stream') return ky(endpoint, options);

      response = await ky(endpoint, options); // eslint-disable-line
      break;
    } catch (e) {
      const waitTime = 2 ** i * 0.1;

      if (e.response) {
        if (retryCodes.includes(e.response.status)) {
          await wait(waitTime); // eslint-disable-line
          continue; // eslint-disable-line
        }

        try {
          const output = await e.response.json(); // eslint-disable-line
          e.description = output.error || output.message;
        } catch (err) {
          e.description = await e.response.text(); // eslint-disable-line
        }
      }

      throw e;
    }
  }

  const { status } = response;
  const headers = responseHeadersAsObject(response);
  const body = await processBody(response);

  return { body, headers, status };
}

export const requesterFn = createRequesterFn(defaultOptionsHandler, handler);
