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

var UserKeys =
/*#__PURE__*/
function (_BaseService) {
  (0, _inherits2.default)(UserKeys, _BaseService);

  function UserKeys() {
    (0, _classCallCheck2.default)(this, UserKeys);
    return (0, _possibleConstructorReturn2.default)(this, (UserKeys.__proto__ || (0, _getPrototypeOf.default)(UserKeys)).apply(this, arguments));
  }

  (0, _createClass2.default)(UserKeys, [{
    key: "all",
    value: function all(_ref) {
      var userId = _ref.userId;
      var url = userId ? "users/".concat(encodeURIComponent(userId), "/keys") : 'user/keys';
      return _infrastructure.RequestHelper.get(this, url);
    }
  }, {
    key: "create",
    value: function create(title, key) {
      var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          userId = _ref2.userId;

      var url = userId ? "users/".concat(encodeURIComponent(userId), "/keys") : 'user/keys';
      return _infrastructure.RequestHelper.post(this, url, {
        title: title,
        key: key
      });
    }
  }, {
    key: "show",
    value: function show(keyId) {
      var kId = encodeURIComponent(keyId);
      return _infrastructure.RequestHelper.get(this, "user/keys/".concat(kId));
    }
  }, {
    key: "remove",
    value: function remove(keyId) {
      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          userId = _ref3.userId;

      var kId = encodeURIComponent(keyId);
      var url = userId ? "users/".concat(encodeURIComponent(userId), "/keys") : 'user/keys';
      return _infrastructure.RequestHelper.delete(this, "".concat(url, "/").concat(kId));
    }
  }]);
  return UserKeys;
}(_infrastructure.BaseService);

var _default = UserKeys;
exports.default = _default;