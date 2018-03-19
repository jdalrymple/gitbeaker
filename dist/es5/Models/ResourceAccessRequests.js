"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("babel-runtime/helpers/slicedToArray"));

var _getPrototypeOf = _interopRequireDefault(require("babel-runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("babel-runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("babel-runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("babel-runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("babel-runtime/helpers/inherits"));

var _BaseModel2 = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

var ACCESS_LEVELS = {
  GUEST: 10,
  REPORTER: 20,
  DEVELOPER: 30,
  MASTER: 40,
  OWNER: 50
};

var ResourceAccessRequests =
/*#__PURE__*/
function (_BaseModel) {
  (0, _inherits2.default)(ResourceAccessRequests, _BaseModel);

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
      var rId = (0, _Utils.parse)(resourceId);
      return this.get("".concat(this.resourceType, "/").concat(rId, "/access_requests"));
    }
  }, {
    key: "request",
    value: function request(resourceId) {
      var rId = (0, _Utils.parse)(resourceId);
      return this.post("".concat(this.resourceType, "/").concat(rId, "/access_requests"));
    }
  }, {
    key: "approve",
    value: function approve(resourceId, userId, _ref2) {
      var _ref2$access_level = _ref2.access_level,
          access_level = _ref2$access_level === void 0 ? 30 : _ref2$access_level;

      var _map = [resourceId, userId].map(_Utils.parse),
          _map2 = (0, _slicedToArray2.default)(_map, 2),
          rId = _map2[0],
          uId = _map2[1];

      return this.post("".concat(this.resourceType, "/").concat(rId, "/access_requests/").concat(uId, "/approve"), {
        access_level: access_level
      });
    }
  }, {
    key: "deny",
    value: function deny(resourceId, userId) {
      var _map3 = [resourceId, userId].map(_Utils.parse),
          _map4 = (0, _slicedToArray2.default)(_map3, 2),
          rId = _map4[0],
          uId = _map4[1];

      return this.delete("".concat(this.resourceType, "/").concat(rId, "/access_requests/").concat(uId, "/approve"));
    }
  }]);
  return ResourceAccessRequests;
}(_BaseModel2.default);

var _default = ResourceAccessRequests;
exports.default = _default;