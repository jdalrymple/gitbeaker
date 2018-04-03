"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = _interopRequireDefault(require("util.promisify"));

var _xhr = _interopRequireDefault(require("xhr"));

var XMLHttpRequester = (0, _util.default)(_xhr.default);
XMLHttpRequester.del = (0, _util.default)(_xhr.default.del);
XMLHttpRequester.get = (0, _util.default)(_xhr.default.get);
XMLHttpRequester.head = (0, _util.default)(_xhr.default.head);
XMLHttpRequester.patch = (0, _util.default)(_xhr.default.patch);
XMLHttpRequester.post = (0, _util.default)(_xhr.default.post);
XMLHttpRequester.put = (0, _util.default)(_xhr.default.put);
var _default = XMLHttpRequester;
exports.default = _default;