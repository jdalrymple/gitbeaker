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

function responseHeadersAsObject(headers: Headers) {
  return Array.from(headers.entries()).reduce((acc, curr) => {
    acc[curr[0]] = curr[1];

    return acc;
  }, {});
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

export async function processBody(response: Response) {
  // Split to remove potential charset info from the content type
  const contentType = (response.headers.get('content-type') || '').split(';')[0].trim();

  if (contentType === 'application/json') {
    return response.json().then((v) => v || {});
  }

  if (contentType.startsWith('text/')) {
    return response.text().then((t) => t || '');
  }

  return response.blob().then((b) => Buffer.from(b as unknown as SharedArrayBuffer));
}

export async function handler(endpoint: string, options: Record<string, unknown>) {
  const retryCodes = [429, 502];
  const maxRetries = 10;
  let response: Response;

  for (let i = 0; i < maxRetries; i += 1) {
    try {
      if (options.method === 'stream') return ky(endpoint, options);

      response = await ky(endpoint, options); // eslint-disable-line

      const { status } = response;
      const headers = responseHeadersAsObject(response.headers);
      const body = await processBody(response);

      return { body, headers, status };
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

  throw new Error('Could not successfully complete this request');
}

export const requesterFn = createRequesterFn(defaultOptionsHandler, handler);
