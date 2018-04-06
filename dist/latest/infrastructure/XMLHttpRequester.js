"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _errors = require("request-promise-core/errors");

var _util = _interopRequireDefault(require("util.promisify"));

var _xhr = _interopRequireDefault(require("xhr"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const promisifyFn = fn => {
  const promisifiedFn = (0, _util.default)(fn);
  return async opts => {
    const response = await promisifiedFn(opts);

    if (response.statusCode >= 400 && response.statusCode <= 599) {
      throw new _errors.StatusCodeError(response.statusCode, response.body, {}, null);
    }

    return response;
  };
};

const XMLHttpRequester = promisifyFn(_xhr.default);
XMLHttpRequester.del = promisifyFn(_xhr.default.del);
XMLHttpRequester.delete = XMLHttpRequester.del;
XMLHttpRequester.get = promisifyFn(_xhr.default.get);
XMLHttpRequester.head = promisifyFn(_xhr.default.head);
XMLHttpRequester.patch = promisifyFn(_xhr.default.patch);
XMLHttpRequester.post = promisifyFn(_xhr.default.post);
XMLHttpRequester.put = promisifyFn(_xhr.default.put);
var _default = XMLHttpRequester;
exports.default = _default;