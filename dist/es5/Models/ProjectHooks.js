"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assign = _interopRequireDefault(require("babel-runtime/core-js/object/assign"));

var _slicedToArray2 = _interopRequireDefault(require("babel-runtime/helpers/slicedToArray"));

var _getPrototypeOf = _interopRequireDefault(require("babel-runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("babel-runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("babel-runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("babel-runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("babel-runtime/helpers/inherits"));

var _BaseModel2 = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

var ProjectHooks =
/*#__PURE__*/
function (_BaseModel) {
  (0, _inherits2.default)(ProjectHooks, _BaseModel);

  function ProjectHooks() {
    (0, _classCallCheck2.default)(this, ProjectHooks);
    return (0, _possibleConstructorReturn2.default)(this, (ProjectHooks.__proto__ || (0, _getPrototypeOf.default)(ProjectHooks)).apply(this, arguments));
  }

  (0, _createClass2.default)(ProjectHooks, [{
    key: "all",
    value: function all(projectId) {
      var pId = (0, _Utils.parse)(projectId);
      return this.get("projects/".concat(pId, "/hooks"));
    }
  }, {
    key: "show",
    value: function show(projectId, hookId) {
      var _map = [projectId, hookId].map(_Utils.parse),
          _map2 = (0, _slicedToArray2.default)(_map, 2),
          pId = _map2[0],
          hId = _map2[1];

      return this.get("projects/".concat(pId, "/hooks/").concat(hId));
    }
  }, {
    key: "add",
    value: function add(projectId, url) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var pId = (0, _Utils.parse)(projectId);
      return this.post("projects/".concat(pId, "/hooks"), (0, _assign.default)({
        url: url
      }, options));
    }
  }, {
    key: "edit",
    value: function edit(projectId, hookId, url) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      var _map3 = [projectId, hookId].map(_Utils.parse),
          _map4 = (0, _slicedToArray2.default)(_map3, 2),
          pId = _map4[0],
          hId = _map4[1];

      return this.put("projects/".concat(pId, "/hooks/").concat(hId), (0, _assign.default)({
        url: url
      }, options));
    }
  }, {
    key: "remove",
    value: function remove(projectId, hookId) {
      var _map5 = [projectId, hookId].map(_Utils.parse),
          _map6 = (0, _slicedToArray2.default)(_map5, 2),
          pId = _map6[0],
          hId = _map6[1];

      return this.delete("projects/".concat(pId, "/hooks/").concat(hId));
    }
  }]);
  return ProjectHooks;
}(_BaseModel2.default);

var _default = ProjectHooks;
exports.default = _default;