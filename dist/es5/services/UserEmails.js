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

var UserEmails =
/*#__PURE__*/
function (_BaseService) {
  (0, _inherits2.default)(UserEmails, _BaseService);

  function UserEmails() {
    (0, _classCallCheck2.default)(this, UserEmails);
    return (0, _possibleConstructorReturn2.default)(this, (UserEmails.__proto__ || (0, _getPrototypeOf.default)(UserEmails)).apply(this, arguments));
  }

  (0, _createClass2.default)(UserEmails, [{
    key: "all",
    value: function all() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          userId = _ref.userId;

      var url = userId ? "users/".concat(encodeURIComponent(userId), "/emails") : 'users/emails';
      return _infrastructure.RequestHelper.get(this, url);
    }
  }, {
    key: "add",
    value: function add(email) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          userId = _ref2.userId;

      var url = userId ? "users/".concat(encodeURIComponent(userId), "/emails") : 'users/emails';
      return _infrastructure.RequestHelper.post(this, url, {
        email: email
      });
    }
  }, {
    key: "show",
    value: function show(emailId) {
      var eId = encodeURIComponent(emailId);
      return _infrastructure.RequestHelper.get(this, "users/emails/".concat(eId));
    }
  }, {
    key: "remove",
    value: function remove(emailId) {
      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          userId = _ref3.userId;

      var eId = encodeURIComponent(emailId);
      var url = userId ? "users/".concat(encodeURIComponent(userId), "/emails") : 'users/emails';
      return _infrastructure.RequestHelper.delete(this, "".concat(url, "/").concat(eId));
    }
  }]);
  return UserEmails;
}(_infrastructure.BaseService);

var _default = UserEmails;
exports.default = _default;