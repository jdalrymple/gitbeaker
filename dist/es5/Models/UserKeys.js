"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getPrototypeOf = _interopRequireDefault(require("babel-runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("babel-runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("babel-runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("babel-runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("babel-runtime/helpers/inherits"));

var _BaseModel2 = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

var UserKeys =
/*#__PURE__*/
function (_BaseModel) {
  (0, _inherits2.default)(UserKeys, _BaseModel);

  function UserKeys() {
    (0, _classCallCheck2.default)(this, UserKeys);
    return (0, _possibleConstructorReturn2.default)(this, (UserKeys.__proto__ || (0, _getPrototypeOf.default)(UserKeys)).apply(this, arguments));
  }

  (0, _createClass2.default)(UserKeys, [{
    key: "add",
    value: function add(userId, title, key) {
      var uId = (0, _Utils.parse)(userId);
      return this.post("users/".concat(uId, "/keys"), {
        title: title,
        key: key
      });
    }
  }, {
    key: "addForCurrentUser",
    value: function addForCurrentUser(title, key) {
      return this.post('user/keys', {
        title: title,
        key: key
      });
    }
  }, {
    key: "remove",
    value: function remove(userId, keyId) {
      var uId = (0, _Utils.parse)(userId);
      var kId = (0, _Utils.parse)(keyId);
      return this.delete("users/".concat(uId, "/keys/").concat(kId));
    }
  }, {
    key: "removeForCurrentUser",
    value: function removeForCurrentUser(keyId) {
      var kId = (0, _Utils.parse)(keyId);
      return this.delete("user/keys/".concat(kId));
    }
  }, {
    key: "all",
    value: function all(userId) {
      var uId = (0, _Utils.parse)(userId);
      return this.get("users/".concat(uId, "/keys"));
    }
  }, {
    key: "allForCurrentUser",
    value: function allForCurrentUser() {
      return this.get('user/keys');
    }
  }]);
  return UserKeys;
}(_BaseModel2.default);

var _default = UserKeys;
exports.default = _default;