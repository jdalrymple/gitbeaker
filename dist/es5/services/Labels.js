"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _infrastructure = require("../infrastructure");

var Labels =
/*#__PURE__*/
function (_BaseService) {
  (0, _inherits2.default)(Labels, _BaseService);

  function Labels() {
    (0, _classCallCheck2.default)(this, Labels);
    return (0, _possibleConstructorReturn2.default)(this, (Labels.__proto__ || (0, _getPrototypeOf.default)(Labels)).apply(this, arguments));
  }

  (0, _createClass2.default)(Labels, [{
    key: "all",
    value: function all(projectId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/labels"), options);
    }
  }, {
    key: "create",
    value: function create(projectId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.post(this, "projects/".concat(pId, "/labels"), options);
    }
  }, {
    key: "edit",
    value: function edit(projectId, labelName) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.put(this, "projects/".concat(pId, "/labels"), (0, _objectSpread2.default)({
        name: labelName
      }, options));
    }
  }, {
    key: "remove",
    value: function remove(projectId, labelName) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.delete(this, "projects/".concat(pId, "/labels"), {
        name: labelName
      });
    }
  }, {
    key: "subscribe",
    value: function subscribe(projectId, labelId) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var _map = [projectId, labelId].map(encodeURIComponent),
          _map2 = (0, _slicedToArray2.default)(_map, 2),
          pId = _map2[0],
          lId = _map2[1];

      return _infrastructure.RequestHelper.post(this, "projects/".concat(pId, "/issues/").concat(lId, "/subscribe"), options);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(projectId, labelId) {
      var _map3 = [projectId, labelId].map(encodeURIComponent),
          _map4 = (0, _slicedToArray2.default)(_map3, 2),
          pId = _map4[0],
          lId = _map4[1];

      return _infrastructure.RequestHelper.delete(this, "projects/".concat(pId, "/issues/").concat(lId, "/unsubscribe"));
    }
  }]);
  return Labels;
}(_infrastructure.BaseService);

var _default = Labels;
exports.default = _default;