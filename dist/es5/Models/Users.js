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

var _UserKeys = _interopRequireDefault(require("./UserKeys"));

var _ResourceCustomAttributes = _interopRequireDefault(require("./ResourceCustomAttributes"));

var Users =
/*#__PURE__*/
function (_BaseModel) {
  (0, _inherits2.default)(Users, _BaseModel);

  function Users() {
    var _ref;

    var _this;

    (0, _classCallCheck2.default)(this, Users);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_ref = Users.__proto__ || (0, _getPrototypeOf.default)(Users)).call.apply(_ref, [this].concat(args)));
    _this.customAttributes = new (Function.prototype.bind.apply(_ResourceCustomAttributes.default, [null].concat(['users'], args)))();
    _this.keys = new (Function.prototype.bind.apply(_UserKeys.default, [null].concat(args)))();
    return _this;
  }

  (0, _createClass2.default)(Users, [{
    key: "all",
    value: function all() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.get('users', options);
    }
  }, {
    key: "create",
    value: function create() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.post('users', options);
    }
  }, {
    key: "current",
    value: function current() {
      return this.get('user');
    }
  }, {
    key: "session",
    value: function session(email, password) {
      return this.post('session', {
        email: email,
        password: password
      });
    }
  }, {
    key: "search",
    value: function search(emailOrUsername) {
      return this.get('users', {
        search: emailOrUsername
      });
    }
  }, {
    key: "show",
    value: function show(userId) {
      var uId = (0, _Utils.parse)(userId);
      return this.get("users/".concat(uId));
    }
  }]);
  return Users;
}(_BaseModel2.default);

var _default = Users;
exports.default = _default;