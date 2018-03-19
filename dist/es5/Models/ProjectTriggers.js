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

var ProjectTriggers =
/*#__PURE__*/
function (_BaseModel) {
  (0, _inherits2.default)(ProjectTriggers, _BaseModel);

  function ProjectTriggers() {
    (0, _classCallCheck2.default)(this, ProjectTriggers);
    return (0, _possibleConstructorReturn2.default)(this, (ProjectTriggers.__proto__ || (0, _getPrototypeOf.default)(ProjectTriggers)).apply(this, arguments));
  }

  (0, _createClass2.default)(ProjectTriggers, [{
    key: "add",
    value: function add(projectId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var pId = (0, _Utils.parse)(projectId);
      return this.post("projects/".concat(pId, "/triggers"), options);
    }
  }, {
    key: "all",
    value: function all(projectId) {
      var pId = (0, _Utils.parse)(projectId);
      return this.get("projects/".concat(pId, "/triggers"));
    }
  }, {
    key: "edit",
    value: function edit(projectId, triggerId) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var _map = [projectId, triggerId].map(_Utils.parse),
          _map2 = (0, _slicedToArray2.default)(_map, 2),
          pId = _map2[0],
          tId = _map2[1];

      return this.put("projects/".concat(pId, "/triggers/").concat(tId), options);
    }
  }, {
    key: "remove",
    value: function remove(projectId, triggerId) {
      var _map3 = [projectId, triggerId].map(_Utils.parse),
          _map4 = (0, _slicedToArray2.default)(_map3, 2),
          pId = _map4[0],
          tId = _map4[1];

      return this.delete("projects/".concat(pId, "/triggers/").concat(tId));
    }
  }, {
    key: "show",
    value: function show(projectId, triggerId) {
      var _map5 = [projectId, triggerId].map(_Utils.parse),
          _map6 = (0, _slicedToArray2.default)(_map5, 2),
          pId = _map6[0],
          tId = _map6[1];

      return this.get("projects/".concat(pId, "/triggers/").concat(tId));
    }
  }]);
  return ProjectTriggers;
}(_BaseModel2.default);

var _default = ProjectTriggers;
exports.default = _default;