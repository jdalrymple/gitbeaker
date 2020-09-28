import ky from 'ky';
import { Agent } from 'https';
import {
  DefaultRequestService,
  DefaultRequestReturn,
  DefaultRequestOptions,
  createInstance,
  defaultRequest as baseDefaultRequest,
  wait,
} from '@gitbeaker/requester-utils';

function responseHeadersAsObject(response): Record<string, string> {
  if (!response.headers.entries().length) {
    return {};
  }

  const headers = {};
  const keyVals = [...response.headers.entries()];

  keyVals.forEach(([key, val]) => {
    headers[key] = val;
  });

  return headers;
}

export function defaultRequest(
  service: DefaultRequestService,
  options: DefaultRequestOptions = {},
): DefaultRequestReturn & { agent?: Agent } {
  const opts: DefaultRequestReturn & { agent?: Agent } = baseDefaultRequest(service, options);

  if (service.url.includes('https')) {
    opts.agent = new Agent({
      rejectUnauthorized: service.rejectUnauthorized,
    });
  }

  return { ...opts, headers: new Headers(service.headers as Record<string, string>) };
}

export function processBody(response) {
  const contentType = response.headers.get('content-type') || '';

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
  const obeyRateLimit = true;
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
        if (obeyRateLimit && e.response.status === 429) {
          await wait(waitTime); // eslint-disable-line
          continue; // eslint-disable-line
        }

        const output = await e.response.json(); // eslint-disable-line

        e.description = output.error || output.message;
      }

      throw e;
    }
  }

  const { status } = response;
  const headers = responseHeadersAsObject(response);
  const body = await processBody(response);

  return { body, headers, status };
}

export const Requester = createInstance(defaultRequest, handler);
