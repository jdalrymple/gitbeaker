import Ky from 'ky-universal';
import { decamelizeKeys } from 'humps';
import { stringify } from 'query-string';
import { skipAllCaps } from './Utils';

const methods = ['get', 'post', 'put', 'delete', 'stream'];
const KyRequester = {} as Requester;

function responseHeadersAsObject(response) {
  const headers = {};
  const keyVals = [...response.headers.entries()];

  keyVals.forEach(([key, val]) => {
    headers[key] = val;
  });

  return headers;
}

function defaultRequest(service: any, { body, query, sudo, method }) {
  const headers = new Headers(service.headers);

  if (sudo) headers.append('sudo', `${sudo}`);

  return {
      timeout: 300000,
      headers,
      method: (method === 'stream') ? 'get' : method,
      onProgress: (method === 'stream') ? () => {} : undefined,
      searchParams: stringify(decamelizeKeys(query || {}), { arrayFormat: 'bracket' }),
      prefixUrl: service.url,
      json: typeof body === 'object' ? decamelizeKeys(body, skipAllCaps) : body,
      rejectUnauthorized: service.rejectUnauthorized,
    }
}

async function processBody(response) {
  const contentType = response.headers.get('content-type');
  const content = await response.text();

  if(contentType.includes('json')) {
    try {
      return JSON.parse(content || {});
    } catch {
      return {};
    }
  }

  return content;
}

methods.forEach(m => {
  KyRequester[m] = async function(service, endpoint, options) {
    const requestOptions = defaultRequest(service, { ...options, method: m });

    try {
      const response = await Ky(endpoint, requestOptions);
      const { status } = response;
      const headers = responseHeadersAsObject(response);
      const body = await processBody(response);

      return { body, headers, status };
    } catch (e) {
      const output = await e.response.json();
        
      e.description = output.error || output.message;

      throw e;
    }
  };
});

export { KyRequester };
