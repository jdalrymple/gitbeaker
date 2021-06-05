import Got from 'got';
import { decamelizeKeys } from 'xcase';
import delay from 'delay';
import {
  DefaultServiceOptions,
  DefaultRequestReturn,
  DefaultRequestOptions,
  createRequesterFn,
  defaultOptionsHandler as baseOptionsHandler,
} from '@gitbeaker/requester-utils';

export function defaultOptionsHandler(
  serviceOptions: DefaultServiceOptions,
  { body, query, sudo, method }: DefaultRequestOptions = {},
): DefaultRequestReturn & {
  json?: Record<string, unknown>;
  https?: { rejectUnauthorized: boolean };
} {
  const options: DefaultRequestReturn & {
    json?: Record<string, unknown>;
    https?: { rejectUnauthorized: boolean };
  } = baseOptionsHandler(serviceOptions, { body, query, sudo, method });

  // FIXME: Not the best comparison, but...it will have to do for now.
  if (typeof body === 'object' && body.constructor.name !== 'FormData') {
    options.json = decamelizeKeys(body);

    delete options.body;
  }

  if (
    serviceOptions.url.includes('https') &&
    serviceOptions.rejectUnauthorized != null &&
    serviceOptions.rejectUnauthorized === false
  ) {
    options.https = {
      rejectUnauthorized: serviceOptions.rejectUnauthorized,
    };
  }

  return options;
}

export function processBody({
  rawBody,
  headers,
}: {
  rawBody: Buffer;
  headers: Record<string, unknown>;
}) {
  // Split to remove potential charset info from the content type
  const contentType = ((headers['content-type'] as string) || '').split(';')[0].trim();

  if (contentType === 'application/json') {
    return rawBody.length === 0 ? {} : JSON.parse(rawBody.toString());
  }

  if (contentType.startsWith('text/')) {
    return rawBody.toString();
  }

  return Buffer.from(rawBody);
}

export async function handler(endpoint: string, options: Record<string, unknown>) {
  const retryCodes = [429, 502];
  const maxRetries = 10;
  let response;

  for (let i = 0; i < maxRetries; i += 1) {
    const waitTime = 2 ** i * 0.1;
    try {
      if (options.method === 'stream') {
        return Got(endpoint, { ...options, method: 'get', isStream: true });
      }

      response = await Got(endpoint, options); // eslint-disable-line
      break;
    } catch (e) {
      if (e.response) {
        if (retryCodes.includes(e.response.statusCode)) {
          await delay(waitTime); // eslint-disable-line
          continue; // eslint-disable-line
        }

        if (typeof e.response.body === 'string' && e.response.body.length > 0) {
          try {
            const output = JSON.parse(e.response.body);
            e.description = output.error || output.message;
          } catch (err) {
            e.description = e.response.body;
          }
        }
      }

      throw e;
    }
  }

  const { statusCode, headers } = response;

  const body = processBody(response);

  return { body, headers, status: statusCode };
}

export const requesterFn = createRequesterFn(defaultOptionsHandler, handler);
