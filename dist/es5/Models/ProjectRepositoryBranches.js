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

var ProjectRepositoryBranches =
/*#__PURE__*/
function (_BaseModel) {
  (0, _inherits2.default)(ProjectRepositoryBranches, _BaseModel);

  function ProjectRepositoryBranches() {
    (0, _classCallCheck2.default)(this, ProjectRepositoryBranches);
    return (0, _possibleConstructorReturn2.default)(this, (ProjectRepositoryBranches.__proto__ || (0, _getPrototypeOf.default)(ProjectRepositoryBranches)).apply(this, arguments));
  }

  (0, _createClass2.default)(ProjectRepositoryBranches, [{
    key: "all",
    value: function all(projectId) {
      var pId = (0, _Utils.parse)(projectId);
      return this.get("projects/".concat(pId, "/repository/branches"));
    }
  }, {
    key: "create",
    value: function create(projectId, branchName, ref) {
      var pId = (0, _Utils.parse)(projectId);
      return this.post("projects/".concat(pId, "/repository/branches"), {
        branch: branchName,
        ref: ref
      });
    }
  }, {
    key: "protect",
    value: function protect(projectId, branchName) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var pId = (0, _Utils.parse)(projectId);
      return this.put("projects/".concat(pId, "/repository/branches/").concat(branchName, "/protect"), options);
    }
  }, {
    key: "remove",
    value: function remove(projectId, branchName) {
      var pId = (0, _Utils.parse)(projectId);
      return this.delete("projects/".concat(pId, "/repository/branches/").concat(branchName));
    }
  }, {
    key: "show",
    value: function show(projectId, branchName) {
      var pId = (0, _Utils.parse)(projectId);
      return this.get("projects/".concat(pId, "/repository/branches/").concat(branchName));
    }
  }, {
    key: "unprotect",
    value: function unprotect(projectId, branchName) {
      var pId = (0, _Utils.parse)(projectId);
      return this.put("projects/".concat(pId, "/repository/branches/").concat(branchName, "/unprotect"));
    }
  }]);
  return ProjectRepositoryBranches;
}(_BaseModel2.default);

var _default = ProjectRepositoryBranches;
exports.default = _default;