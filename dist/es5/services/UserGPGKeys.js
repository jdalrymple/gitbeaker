"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _infrastructure = require("../infrastructure");

var UserGPGKeys =
/*#__PURE__*/
function (_BaseService) {
  (0, _inherits2.default)(UserGPGKeys, _BaseService);

  function UserGPGKeys() {
    (0, _classCallCheck2.default)(this, UserGPGKeys);
    return (0, _possibleConstructorReturn2.default)(this, (UserGPGKeys.__proto__ || (0, _getPrototypeOf.default)(UserGPGKeys)).apply(this, arguments));
  }

  (0, _createClass2.default)(UserGPGKeys, [{
    key: "all",
    value: function all() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          userId = _ref.userId;

      var url = userId ? "users/".concat(encodeURIComponent(userId), "/gpg_keys") : 'users/gpg_keys';
      return _infrastructure.RequestHelper.get(this, url);
    }
  }, {
    key: "add",
    value: function add(title, key) {
      var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          userId = _ref2.userId;

      var url = userId ? "users/".concat(encodeURIComponent(userId), "/gpg_keys") : 'users/gpg_keys';
      return _infrastructure.RequestHelper.post(this, url, {
        title: title,
        key: key
      });
    }
  }, {
    key: "show",
    value: function show(keyId) {
      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          userId = _ref3.userId;

      var kId = encodeURIComponent(keyId);
      var url = userId ? "users/".concat(encodeURIComponent(userId), "/gpg_keys") : 'users/gpg_keys';
      return _infrastructure.RequestHelper.get(this, "".concat(url, "/").concat(kId));
    }
  }, {
    key: "remove",
    value: function remove(keyId) {
      var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          userId = _ref4.userId;

      var kId = encodeURIComponent(keyId);
      var url = userId ? "users/".concat(encodeURIComponent(userId), "/gpg_keys") : 'users/gpg_keys';
      return _infrastructure.RequestHelper.delete(this, "".concat(url, "/").concat(kId));
    }
  }]);
  return UserGPGKeys;
}(_infrastructure.BaseService);

var _default = UserGPGKeys;
exports.default = _default;