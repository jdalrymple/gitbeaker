"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ACCESS_LEVELS = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _infrastructure = require("../infrastructure");

var ACCESS_LEVELS = {
  GUEST: 10,
  REPORTER: 20,
  DEVELOPER: 30,
  MASTER: 40,
  OWNER: 50
};
exports.ACCESS_LEVELS = ACCESS_LEVELS;

var ResourceAccessRequests =
/*#__PURE__*/
function (_BaseService) {
  (0, _inherits2.default)(ResourceAccessRequests, _BaseService);

  function ResourceAccessRequests(resourceType) {
    var _ref;

    var _this;

    (0, _classCallCheck2.default)(this, ResourceAccessRequests);

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_ref = ResourceAccessRequests.__proto__ || (0, _getPrototypeOf.default)(ResourceAccessRequests)).call.apply(_ref, [this].concat(args)));
    _this.resourceType = resourceType;
    _this.ACCESS_LEVELS = ACCESS_LEVELS;
    return _this;
  }

  (0, _createClass2.default)(ResourceAccessRequests, [{
    key: "all",
    value: function all(resourceId) {
      var rId = encodeURIComponent(resourceId);
      return _infrastructure.RequestHelper.get(this, "".concat(this.resourceType, "/").concat(rId, "/access_requests"));
    }
  }, {
    key: "request",
    value: function request(resourceId) {
      var rId = encodeURIComponent(resourceId);
      return _infrastructure.RequestHelper.post(this, "".concat(this.resourceType, "/").concat(rId, "/access_requests"));
    }
  }, {
    key: "approve",
    value: function approve(resourceId, userId, _ref2) {
      var _ref2$accessLevel = _ref2.accessLevel,
          accessLevel = _ref2$accessLevel === void 0 ? 30 : _ref2$accessLevel;

      var _map = [resourceId, userId].map(encodeURIComponent),
          _map2 = (0, _slicedToArray2.default)(_map, 2),
          rId = _map2[0],
          uId = _map2[1];

      return _infrastructure.RequestHelper.post(this, "".concat(this.resourceType, "/").concat(rId, "/access_requests/").concat(uId, "/approve"), {
        accessLevel: accessLevel
      });
    }
  }, {
    key: "deny",
    value: function deny(resourceId, userId) {
      var _map3 = [resourceId, userId].map(encodeURIComponent),
          _map4 = (0, _slicedToArray2.default)(_map3, 2),
          rId = _map4[0],
          uId = _map4[1];

      return _infrastructure.RequestHelper.delete(this, "".concat(this.resourceType, "/").concat(rId, "/access_requests/").concat(uId, "/approve"));
    }
  }]);
  return ResourceAccessRequests;
}(_infrastructure.BaseService);

var _default = ResourceAccessRequests;
exports.default = _default;