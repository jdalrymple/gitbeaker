"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _urlJoin = _interopRequireDefault(require("url-join"));

var _requestPromise = _interopRequireDefault(require("request-promise"));

var _XMLHttpRequester = _interopRequireDefault(require("./XMLHttpRequester"));

var BaseModel = function BaseModel(_ref) {
  var _ref$url = _ref.url,
      url = _ref$url === void 0 ? 'https://gitlab.com' : _ref$url,
      token = _ref.token,
      oauthToken = _ref.oauthToken,
      _ref$useXMLHttpReques = _ref.useXMLHttpRequest,
      useXMLHttpRequest = _ref$useXMLHttpReques === void 0 ? false : _ref$useXMLHttpReques;
  (0, _classCallCheck2.default)(this, BaseModel);
  this.url = (0, _urlJoin.default)(url, 'api', 'v4');
  this.headers = {};
  this.requester = useXMLHttpRequest ? _XMLHttpRequester.default : _requestPromise.default;
  this.useXMLHttpRequest = useXMLHttpRequest;

  if (oauthToken) {
    this.headers.Authorization = "Bearer ".concat(oauthToken);
  } else if (token) {
    this.headers['private-token'] = token;
  } else {
    throw new Error('`token` (private-token) or `oauth_token` is mandatory');
  }
};

var _default = BaseModel;
exports.default = _default;