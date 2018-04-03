"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _infrastructure = require("../infrastructure");

var UserImpersonationTokens =
/*#__PURE__*/
function (_BaseService) {
  (0, _inherits2.default)(UserImpersonationTokens, _BaseService);

  function UserImpersonationTokens() {
    (0, _classCallCheck2.default)(this, UserImpersonationTokens);
    return (0, _possibleConstructorReturn2.default)(this, (UserImpersonationTokens.__proto__ || (0, _getPrototypeOf.default)(UserImpersonationTokens)).apply(this, arguments));
  }

  (0, _createClass2.default)(UserImpersonationTokens, [{
    key: "all",
    value: function all(userId) {
      var uId = encodeURIComponent(userId);
      return _infrastructure.RequestHelper.get(this, "users/".concat(uId, "/impersonation_tokens"));
    }
  }, {
    key: "add",
    value: function add(userId, name, scopes, expiresAt) {
      var uId = encodeURIComponent(userId);
      return _infrastructure.RequestHelper.post(this, "users/".concat(uId, "/impersonation_tokens"), {
        name: name,
        expiresAt: expiresAt,
        scopes: scopes
      });
    }
  }, {
    key: "show",
    value: function show(userId, tokenId) {
      var _map = [userId, tokenId].map(encodeURIComponent),
          _map2 = (0, _slicedToArray2.default)(_map, 2),
          uId = _map2[0],
          tId = _map2[1];

      return _infrastructure.RequestHelper.get(this, "users/".concat(uId, "/impersonation_tokens/").concat(tId));
    }
  }, {
    key: "revoke",
    value: function revoke(userId, tokenId) {
      var _map3 = [userId, tokenId].map(encodeURIComponent),
          _map4 = (0, _slicedToArray2.default)(_map3, 2),
          uId = _map4[0],
          tId = _map4[1];

      return _infrastructure.RequestHelper.delete(this, "users/".concat(uId, "/impersonation_tokens/").concat(tId));
    }
  }]);
  return UserImpersonationTokens;
}(_infrastructure.BaseService);

var _default = UserImpersonationTokens;
exports.default = _default;