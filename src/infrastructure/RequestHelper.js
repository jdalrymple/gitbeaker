import Request from 'request-promise';
import Humps from 'humps';
import URL from 'url';

function defaultRequest(
  url,
  endpoint,
  { headers, body, qs, formData, resolveWithFullResponse = false },
) {
  const params = {
    url: URL.resolve(url, endpoint),
    headers,
    json: true,
  };

  if (body) params.body = Humps.decamelizeKeys(body);
  if (qs) params.qs = Humps.decamelizeKeys(qs);
  if (formData) params.formData = formData;

  params.resolveWithFullResponse = resolveWithFullResponse;

  return params;
}

class RequestHelper {
  static get(service, endpoint, options, fullResponse = false) {
    return Request.get(defaultRequest(service.url, endpoint, {
      headers: service.headers,
      qs: options,
      resolveWithFullResponse: fullResponse,
    }));
  }

  static post(service, endpoint, options, form = false) {
    const body = form ? 'fromData' : 'body';

    return Request.post(defaultRequest(service.url, endpoint, {
      headers: service.headers,
      [body]: options,
    }));
  }

  static put(service, endpoint, options) {
    return Request.put(defaultRequest(service.url, endpoint, {
      headers: service.headers,
      body: options,
    }));
  }

  static delete(service, endpoint, options) {
    return Request.delete(defaultRequest(service.url, endpoint, {
      headers: service.headers,
      qs: options,
    }));
  }
}

export default RequestHelper;
