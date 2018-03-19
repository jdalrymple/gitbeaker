"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = parse;

function parse(value) {
  if (Number.isInteger(value)) return value;
  return encodeURIComponent(value);
}