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

var _Events = require("./Events");

var Users =
/*#__PURE__*/
function (_BaseService) {
  (0, _inherits2.default)(Users, _BaseService);

  function Users() {
    (0, _classCallCheck2.default)(this, Users);
    return (0, _possibleConstructorReturn2.default)(this, (Users.__proto__ || (0, _getPrototypeOf.default)(Users)).apply(this, arguments));
  }

  (0, _createClass2.default)(Users, [{
    key: "all",
    value: function all(options) {
      return _infrastructure.RequestHelper.get(this, 'users', options);
    }
  }, {
    key: "activities",
    value: function activities() {
      return _infrastructure.RequestHelper.get(this, 'users/activities');
    }
  }, {
    key: "block",
    value: function block(userId) {
      var uId = encodeURIComponent(userId);
      return _infrastructure.RequestHelper.post(this, "users/".concat(uId, "/block"));
    }
  }, {
    key: "create",
    value: function create(options) {
      return _infrastructure.RequestHelper.post(this, 'users', options);
    }
  }, {
    key: "current",
    value: function current() {
      return _infrastructure.RequestHelper.get(this, 'user');
    }
  }, {
    key: "events",
    value: function events(userId, options) {
      (0, _Events.validateEventOptions)(options.action, options.targetType);
      var uId = encodeURIComponent(userId);
      return _infrastructure.RequestHelper.get(this, "users/".concat(uId, "/events"), options);
    }
  }, {
    key: "session",
    value: function session(email, password) {
      return _infrastructure.RequestHelper.post(this, 'session', {
        email: email,
        password: password
      });
    }
  }, {
    key: "search",
    value: function search(emailOrUsername) {
      return _infrastructure.RequestHelper.get(this, 'users', {
        search: emailOrUsername
      });
    }
  }, {
    key: "show",
    value: function show(userId) {
      var uId = encodeURIComponent(userId);
      return _infrastructure.RequestHelper.get(this, "users/".concat(uId));
    }
  }, {
    key: "remove",
    value: function remove(userId) {
      var uId = encodeURIComponent(userId);
      return _infrastructure.RequestHelper.delete(this, "users/".concat(uId));
    }
  }, {
    key: "unblock",
    value: function unblock(userId) {
      var uId = encodeURIComponent(userId);
      return _infrastructure.RequestHelper.post(this, "users/".concat(uId, "/unblock"));
    }
  }]);
  return Users;
}(_infrastructure.BaseService);

var _default = Users;
exports.default = _default;