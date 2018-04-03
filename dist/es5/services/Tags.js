"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _infrastructure = require("../infrastructure");

var Tags =
/*#__PURE__*/
function (_BaseService) {
  (0, _inherits2.default)(Tags, _BaseService);

  function Tags() {
    (0, _classCallCheck2.default)(this, Tags);
    return (0, _possibleConstructorReturn2.default)(this, (Tags.__proto__ || (0, _getPrototypeOf.default)(Tags)).apply(this, arguments));
  }

  (0, _createClass2.default)(Tags, [{
    key: "all",
    value: function all(projectId, options) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/repository/tags"), options);
    }
  }, {
    key: "create",
    value: function create(projectId, options) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.post(this, "projects/".concat(pId, "/repository/tags"), options);
    }
  }, {
    key: "remove",
    value: function remove(projectId, tagName) {
      var _map = [projectId, tagName].map(encodeURIComponent),
          _map2 = (0, _slicedToArray2.default)(_map, 2),
          pId = _map2[0],
          tId = _map2[1];

      return _infrastructure.RequestHelper.delete(this, "projects/".concat(pId, "/repository/tags/").concat(tId));
    }
  }, {
    key: "show",
    value: function show(projectId, tagName) {
      var _map3 = [projectId, tagName].map(encodeURIComponent),
          _map4 = (0, _slicedToArray2.default)(_map3, 2),
          pId = _map4[0],
          tId = _map4[1];

      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/repository/tags/").concat(tId));
    }
  }]);
  return Tags;
}(_infrastructure.BaseService);

var _default = Tags;
exports.default = _default;