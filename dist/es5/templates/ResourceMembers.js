"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _infrastructure = require("../infrastructure");

var ResourceMembers =
/*#__PURE__*/
function (_BaseService) {
  (0, _inherits2.default)(ResourceMembers, _BaseService);

  function ResourceMembers(resourceType) {
    var _ref;

    var _this;

    (0, _classCallCheck2.default)(this, ResourceMembers);

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_ref = ResourceMembers.__proto__ || (0, _getPrototypeOf.default)(ResourceMembers)).call.apply(_ref, [this].concat(args)));
    _this.resourceType = resourceType;
    return _this;
  }

  (0, _createClass2.default)(ResourceMembers, [{
    key: "all",
    value: function all(resourceId) {
      var rId = encodeURIComponent(resourceId);
      return _infrastructure.RequestHelper.get(this, "".concat(this.resourceType, "/").concat(rId, "/members"));
    }
  }, {
    key: "add",
    value: function add(resourceId, userId, accessLevel, options) {
      var _map = [resourceId, userId].map(encodeURIComponent),
          _map2 = (0, _slicedToArray2.default)(_map, 2),
          rId = _map2[0],
          uId = _map2[1];

      return _infrastructure.RequestHelper.post(this, "".concat(this.resourceType, "/").concat(rId, "/members"), (0, _objectSpread2.default)({
        user_id: uId,
        access_level: parseInt(accessLevel, 10)
      }, options));
    }
  }, {
    key: "edit",
    value: function edit(resourceId, userId, accessLevel, options) {
      var _map3 = [resourceId, userId].map(encodeURIComponent),
          _map4 = (0, _slicedToArray2.default)(_map3, 2),
          rId = _map4[0],
          uId = _map4[1];

      return _infrastructure.RequestHelper.put(this, "".concat(this.resourceType, "/").concat(rId, "/members/").concat(uId), (0, _objectSpread2.default)({
        access_level: parseInt(accessLevel, 10)
      }, options));
    }
  }, {
    key: "show",
    value: function show(resourceId, userId) {
      var _map5 = [resourceId, userId].map(encodeURIComponent),
          _map6 = (0, _slicedToArray2.default)(_map5, 2),
          rId = _map6[0],
          uId = _map6[1];

      return _infrastructure.RequestHelper.get(this, "".concat(this.resourceType, "/").concat(rId, "/members/").concat(uId));
    }
  }, {
    key: "remove",
    value: function remove(resourceId, userId) {
      var _map7 = [resourceId, userId].map(encodeURIComponent),
          _map8 = (0, _slicedToArray2.default)(_map7, 2),
          rId = _map8[0],
          uId = _map8[1];

      return _infrastructure.RequestHelper.delete(this, "".concat(this.resourceType, "/").concat(rId, "/members/").concat(uId));
    }
  }]);
  return ResourceMembers;
}(_infrastructure.BaseService);

var _default = ResourceMembers;
exports.default = _default;