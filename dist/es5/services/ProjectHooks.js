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

var ProjectHooks =
/*#__PURE__*/
function (_BaseService) {
  (0, _inherits2.default)(ProjectHooks, _BaseService);

  function ProjectHooks() {
    (0, _classCallCheck2.default)(this, ProjectHooks);
    return (0, _possibleConstructorReturn2.default)(this, (ProjectHooks.__proto__ || (0, _getPrototypeOf.default)(ProjectHooks)).apply(this, arguments));
  }

  (0, _createClass2.default)(ProjectHooks, [{
    key: "all",
    value: function all(projectId, options) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/hooks"), options);
    }
  }, {
    key: "show",
    value: function show(projectId, hookId) {
      var _map = [projectId, hookId].map(encodeURIComponent),
          _map2 = (0, _slicedToArray2.default)(_map, 2),
          pId = _map2[0],
          hId = _map2[1];

      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/hooks/").concat(hId));
    }
  }, {
    key: "add",
    value: function add(projectId, url, options) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.post(this, "projects/".concat(pId, "/hooks"), (0, _objectSpread2.default)({
        url: url
      }, options));
    }
  }, {
    key: "edit",
    value: function edit(projectId, hookId, url, options) {
      var _map3 = [projectId, hookId].map(encodeURIComponent),
          _map4 = (0, _slicedToArray2.default)(_map3, 2),
          pId = _map4[0],
          hId = _map4[1];

      return _infrastructure.RequestHelper.put(this, "projects/".concat(pId, "/hooks/").concat(hId), (0, _objectSpread2.default)({
        url: url
      }, options));
    }
  }, {
    key: "remove",
    value: function remove(projectId, hookId) {
      var _map5 = [projectId, hookId].map(encodeURIComponent),
          _map6 = (0, _slicedToArray2.default)(_map5, 2),
          pId = _map6[0],
          hId = _map6[1];

      return _infrastructure.RequestHelper.delete(this, "projects/".concat(pId, "/hooks/").concat(hId));
    }
  }]);
  return ProjectHooks;
}(_infrastructure.BaseService);

var _default = ProjectHooks;
exports.default = _default;