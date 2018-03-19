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

var ProjectRunners =
/*#__PURE__*/
function (_BaseModel) {
  (0, _inherits2.default)(ProjectRunners, _BaseModel);

  function ProjectRunners() {
    (0, _classCallCheck2.default)(this, ProjectRunners);
    return (0, _possibleConstructorReturn2.default)(this, (ProjectRunners.__proto__ || (0, _getPrototypeOf.default)(ProjectRunners)).apply(this, arguments));
  }

  (0, _createClass2.default)(ProjectRunners, [{
    key: "all",
    value: function all(projectId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var pId = (0, _Utils.parse)(projectId);
      return this.get("projects/".concat(pId, "/runners"), options);
    }
  }, {
    key: "enable",
    value: function enable(projectId, runnerId) {
      var _map = [projectId, runnerId].map(_Utils.parse),
          _map2 = (0, _slicedToArray2.default)(_map, 2),
          pId = _map2[0],
          rId = _map2[1];

      return this.post("projects/".concat(pId, "/runners"), {
        runner_id: rId
      });
    }
  }, {
    key: "disable",
    value: function disable(projectId, runnerId) {
      var _map3 = [projectId, runnerId].map(_Utils.parse),
          _map4 = (0, _slicedToArray2.default)(_map3, 2),
          pId = _map4[0],
          rId = _map4[1];

      return this.delete("projects/".concat(pId, "/runners/").concat(rId));
    }
  }]);
  return ProjectRunners;
}(_BaseModel2.default);

var _default = ProjectRunners;
exports.default = _default;