"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _urlJoin = _interopRequireDefault(require("url-join"));

var _requestPromise = _interopRequireDefault(require("request-promise"));

var _XMLHttpRequester = _interopRequireDefault(require("./XMLHttpRequester"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BaseModel {
  constructor({
    url = 'https://gitlab.com',
    token,
    oauthToken,
    useXMLHttpRequest = false
  }) {
    this.url = (0, _urlJoin.default)(url, 'api', 'v4');
    this.headers = {};
    this.requester = useXMLHttpRequest ? _XMLHttpRequester.default : _requestPromise.default;
    this.useXMLHttpRequest = useXMLHttpRequest;

    if (oauthToken) {
      this.headers.Authorization = `Bearer ${oauthToken}`;
    } else if (token) {
      this.headers['private-token'] = token;
    } else {
      throw new Error('`token` (private-token) or `oauth_token` is mandatory');
    }
  }

}

var _default = BaseModel;
exports.default = _default;