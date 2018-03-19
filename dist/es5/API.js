"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("babel-runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("babel-runtime/helpers/createClass"));

var _requestPromise = _interopRequireDefault(require("request-promise"));

var _Models = require("./Models");

function defaultRequest(url, endpoint, _ref) {
  var headers = _ref.headers,
      body = _ref.body,
      qs = _ref.qs,
      formData = _ref.formData,
      _ref$resolveWithFullR = _ref.resolveWithFullResponse,
      resolveWithFullResponse = _ref$resolveWithFullR === void 0 ? false : _ref$resolveWithFullR;
  var params = {
    url: "".concat(url).concat(endpoint),
    headers: headers,
    json: true
  };
  if (body) params.body = body;
  if (qs) params.qs = qs;
  if (formData) params.formData = formData;
  params.resolveWithFullResponse = resolveWithFullResponse;
  return params;
}

var API =
/*#__PURE__*/
function () {
  function API(_ref2) {
    var _ref2$url = _ref2.url,
        url = _ref2$url === void 0 ? 'https://gitlab.com' : _ref2$url,
        token = _ref2.token,
        oauthToken = _ref2.oauthToken;
    (0, _classCallCheck2.default)(this, API);
    this.url = "".concat(url, "/api/v4/");
    this.headers = {};

    if (oauthToken) {
      this.headers.Authorization = "Bearer ".concat(oauthToken);
    } else if (token) {
      this.headers['private-token'] = token;
    } else {
      throw new Error('`token` (private-token) or `oauth_token` is mandatory');
    }

    this.groups = new _Models.Groups(this);
    this.projects = new _Models.Projects(this);
    this.issues = new _Models.Issues(this);
    this.users = new _Models.Users(this);
    this.runners = new _Models.Runners(this);
    this.mergeRequests = new _Models.MergeRequests(this);
    this.version = new _Models.Version(this);
  }

  (0, _createClass2.default)(API, [{
    key: "get",
    value: function get(endpoint, options) {
      var fullResponse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return _requestPromise.default.get(defaultRequest(this.url, endpoint, {
        headers: this.headers,
        qs: options,
        resolveWithFullResponse: fullResponse
      }));
    }
  }, {
    key: "post",
    value: function post(endpoint, options) {
      return _requestPromise.default.post(defaultRequest(this.url, endpoint, {
        headers: this.headers,
        body: options
      }));
    }
  }, {
    key: "postForm",
    value: function postForm(endpoint, options) {
      return _requestPromise.default.post(defaultRequest(this.url, endpoint, {
        headers: this.headers,
        formData: options
      }));
    }
  }, {
    key: "put",
    value: function put(endpoint, options) {
      return _requestPromise.default.put(defaultRequest(this.url, endpoint, {
        headers: this.headers,
        body: options
      }));
    }
  }, {
    key: "delete",
    value: function _delete(endpoint, options) {
      return _requestPromise.default.delete(defaultRequest(this.url, endpoint, {
        headers: this.headers,
        qs: options
      }));
    }
  }]);
  return API;
}();

var _default = API;
exports.default = _default;