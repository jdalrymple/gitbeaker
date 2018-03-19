"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interopRequireDefault");

var _API = _interopRequireDefault(require("./API"));

module.exports = function (_ref) {
  var url = _ref.url,
      token = _ref.token,
      oauthToken = _ref.oauthToken;
  return new _API.default({
    url: url,
    token: token,
    oauthToken: oauthToken
  });
};