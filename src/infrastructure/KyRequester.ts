import Ky from 'ky-universal';
import { decamelizeKeys } from 'humps';
import { stringify } from 'query-string';
import { skipAllCaps } from './Utils';

const methods = ['get', 'post', 'put', 'delete'];
const KyRequester = {} as Requester;

function responseHeadersAsObject(response) {
    const headers = {}
    const keyVals = [...response.headers.entries()]
   
    keyVals.forEach(([key, val]) => {
        headers[key] = val
    })

    return headers
}

function defaultRequest(
  service: any,
  endpoint: string,
  { body, query, sudo }: DefaultRequestOptions,
) {
  const headers = new Headers(service.headers);

  if (sudo) headers.append('sudo', `${sudo}`);

  return [
    endpoint,
    {
      timeout: 30000,
      headers,
      searchParams: stringify(decamelizeKeys(query || {}), { arrayFormat: 'bracket' }),
      prefixUrl: service.url,
      json: typeof body === 'object' ? decamelizeKeys(body, skipAllCaps) : body,
      rejectUnauthorized: service.rejectUnauthorized,
    },
  ];
}

methods.forEach(m => {
  KyRequester[m] = async function(service, endpoint, options) {
    const response = await Ky[m](...defaultRequest(service, endpoint, options));
    const { status } = response;
    const headers = responseHeadersAsObject(response) || {};
    let body = await response.json();

    if (typeof body === 'object') {
      body = body || {};
    }

    return { body, headers, status };
  };
});

export { KyRequester };
