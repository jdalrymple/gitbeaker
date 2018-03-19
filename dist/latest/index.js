"use strict";

var _API = _interopRequireDefault(require("./API"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = ({
  url,
  token,
  oauthToken
}) => new _API.default({
  url,
  token,
  oauthToken
});