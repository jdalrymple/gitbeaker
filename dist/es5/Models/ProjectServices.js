"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getPrototypeOf = _interopRequireDefault(require("babel-runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("babel-runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("babel-runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("babel-runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("babel-runtime/helpers/inherits"));

var _BaseModel2 = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

var ProjectServices =
/*#__PURE__*/
function (_BaseModel) {
  (0, _inherits2.default)(ProjectServices, _BaseModel);

  function ProjectServices() {
    (0, _classCallCheck2.default)(this, ProjectServices);
    return (0, _possibleConstructorReturn2.default)(this, (ProjectServices.__proto__ || (0, _getPrototypeOf.default)(ProjectServices)).apply(this, arguments));
  }

  (0, _createClass2.default)(ProjectServices, [{
    key: "edit",
    value: function edit(projectId, serviceName) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var pId = (0, _Utils.parse)(projectId);
      return this.put("projects/".concat(pId, "/services/").concat(serviceName), options);
    }
  }, {
    key: "remove",
    value: function remove(projectId, serviceName) {
      var pId = (0, _Utils.parse)(projectId);
      return this.delete("projects/".concat(pId, "/services/").concat(serviceName));
    }
  }, {
    key: "show",
    value: function show(projectId, serviceName) {
      var pId = (0, _Utils.parse)(projectId);
      return this.get("projects/".concat(pId, "/services/").concat(serviceName));
    }
  }]);
  return ProjectServices;
}(_BaseModel2.default);

var _default = ProjectServices;
exports.default = _default;