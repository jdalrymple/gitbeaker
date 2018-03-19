"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assign = _interopRequireDefault(require("babel-runtime/core-js/object/assign"));

var _getPrototypeOf = _interopRequireDefault(require("babel-runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("babel-runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("babel-runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("babel-runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("babel-runtime/helpers/inherits"));

var _BaseModel2 = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

var ProjectProtectedBranches =
/*#__PURE__*/
function (_BaseModel) {
  (0, _inherits2.default)(ProjectProtectedBranches, _BaseModel);

  function ProjectProtectedBranches() {
    (0, _classCallCheck2.default)(this, ProjectProtectedBranches);
    return (0, _possibleConstructorReturn2.default)(this, (ProjectProtectedBranches.__proto__ || (0, _getPrototypeOf.default)(ProjectProtectedBranches)).apply(this, arguments));
  }

  (0, _createClass2.default)(ProjectProtectedBranches, [{
    key: "all",
    value: function all(projectId) {
      var pId = (0, _Utils.parse)(projectId);
      return this.get("projects/".concat(pId, "/protected_branches"));
    }
  }, {
    key: "protect",
    value: function protect(projectId, branchName) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var pId = (0, _Utils.parse)(projectId);
      return this.post("projects/".concat(pId, "/protected_branches"), (0, _assign.default)(options, {
        name: branchName
      }));
    }
  }, {
    key: "show",
    value: function show(projectId, branchName) {
      var pId = (0, _Utils.parse)(projectId);
      return this.get("projects/".concat(pId, "/protected_branches/").concat(branchName));
    }
  }, {
    key: "unprotect",
    value: function unprotect(projectId, branchName) {
      var pId = (0, _Utils.parse)(projectId);
      return this.delete("projects/".concat(pId, "/protected_branches/").concat(branchName));
    }
  }]);
  return ProjectProtectedBranches;
}(_BaseModel2.default);

var _default = ProjectProtectedBranches;
exports.default = _default;