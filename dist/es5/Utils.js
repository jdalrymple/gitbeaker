"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = parse;

var _isInteger = _interopRequireDefault(require("babel-runtime/core-js/number/is-integer"));

function parse(value) {
  if ((0, _isInteger.default)(value)) return value;
  return encodeURIComponent(value);
}