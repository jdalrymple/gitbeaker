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

var ProjectRepositoryFiles =
/*#__PURE__*/
function (_BaseModel) {
  (0, _inherits2.default)(ProjectRepositoryFiles, _BaseModel);

  function ProjectRepositoryFiles() {
    (0, _classCallCheck2.default)(this, ProjectRepositoryFiles);
    return (0, _possibleConstructorReturn2.default)(this, (ProjectRepositoryFiles.__proto__ || (0, _getPrototypeOf.default)(ProjectRepositoryFiles)).apply(this, arguments));
  }

  (0, _createClass2.default)(ProjectRepositoryFiles, [{
    key: "create",
    value: function create(projectId, filePath, branch) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var pId = (0, _Utils.parse)(projectId);
      var path = (0, _Utils.parse)(filePath);
      var extendedOptions = (0, _assign.default)({
        branch: branch
      }, options);
      return this.post("projects/".concat(pId, "/repository/files/").concat(path), extendedOptions);
    }
  }, {
    key: "edit",
    value: function edit(projectId, filePath, branch) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var pId = (0, _Utils.parse)(projectId);
      var path = (0, _Utils.parse)(filePath);
      var extendedOptions = (0, _assign.default)({
        branch: branch
      }, options);
      return this.put("projects/".concat(pId, "/repository/files/").concat(path), extendedOptions);
    }
  }, {
    key: "remove",
    value: function remove(projectId, filePath, branch) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var pId = (0, _Utils.parse)(projectId);
      var path = (0, _Utils.parse)(filePath);
      var extendedOptions = (0, _assign.default)({
        branch: branch
      }, options);
      return this.delete("projects/".concat(pId, "/repository/files/").concat(path), extendedOptions);
    }
  }, {
    key: "show",
    value: function show(projectId, filePath, ref) {
      var pId = (0, _Utils.parse)(projectId);
      var path = (0, _Utils.parse)(filePath);
      return this.get("projects/".concat(pId, "/repository/files/").concat(path), {
        ref: ref
      });
    }
  }, {
    key: "showRaw",
    value: function showRaw(projectId, filePath, ref) {
      var pId = (0, _Utils.parse)(projectId);
      var path = (0, _Utils.parse)(filePath);
      return this.get("projects/".concat(pId, "/repository/files/").concat(path, "/raw"), {
        ref: ref
      });
    }
  }]);
  return ProjectRepositoryFiles;
}(_BaseModel2.default);

var _default = ProjectRepositoryFiles;
exports.default = _default;