"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _humps = _interopRequireDefault(require("humps"));

var _parseLinkHeader = _interopRequireDefault(require("parse-link-header"));

var _qs = _interopRequireDefault(require("qs"));

var _urlJoin = _interopRequireDefault(require("url-join"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function defaultRequest({
  url,
  useXMLHttpRequest
}, endpoint, {
  headers,
  body,
  qs,
  formData,
  resolveWithFullResponse = false
}) {
  const params = {
    url: (0, _urlJoin.default)(url, endpoint),
    headers,
    json: true
  };
  if (body) params.body = _humps.default.decamelizeKeys(body);

  if (qs) {
    if (useXMLHttpRequest) {
      // The xhr package doesn't have a way of passing in a qs object until v3
      params.url = (0, _urlJoin.default)(params.url, `?${_qs.default.stringify(qs)}`);
    } else params.qs = _humps.default.decamelizeKeys(qs);
  }

  if (formData) params.formData = formData;
  params.resolveWithFullResponse = resolveWithFullResponse;
  return params;
}

class RequestHelper {
  static async get(service, endpoint, options = {}) {
    const response = await service.requester.get(defaultRequest(service, endpoint, {
      headers: service.headers,
      qs: options,
      resolveWithFullResponse: true
    }));
    const links = (0, _parseLinkHeader.default)(response.headers.link);
    const page = response.headers['x-page'];
    const limit = options.maxPages ? page < options.maxPages : true;
    let more = [];

    if (page && limit && links.next) {
      more = await RequestHelper.get(service, links.next.url.replace(service.url, ''), options);
      return [...response.body, ...more];
    }

    return response.body;
  }

  static post(service, endpoint, options = {}, form = false) {
    const body = form ? 'fromData' : 'body';
    return service.requester.post(defaultRequest(service, endpoint, {
      headers: service.headers,
      [body]: options
    }));
  }

  static put(service, endpoint, options = {}) {
    return service.requester.put(defaultRequest(service, endpoint, {
      headers: service.headers,
      body: options
    }));
  }

  static delete(service, endpoint, options = {}) {
    return service.requester.delete(defaultRequest(service, endpoint, {
      headers: service.headers,
      qs: options
    }));
  }

}

var _default = RequestHelper;
exports.default = _default;