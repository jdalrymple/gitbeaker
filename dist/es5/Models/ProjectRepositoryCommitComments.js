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

var ProjectRepositoryCommitComments =
/*#__PURE__*/
function (_BaseModel) {
  (0, _inherits2.default)(ProjectRepositoryCommitComments, _BaseModel);

  function ProjectRepositoryCommitComments() {
    (0, _classCallCheck2.default)(this, ProjectRepositoryCommitComments);
    return (0, _possibleConstructorReturn2.default)(this, (ProjectRepositoryCommitComments.__proto__ || (0, _getPrototypeOf.default)(ProjectRepositoryCommitComments)).apply(this, arguments));
  }

  (0, _createClass2.default)(ProjectRepositoryCommitComments, [{
    key: "all",
    value: function all(projectId, sha) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var pId = (0, _Utils.parse)(projectId);
      return this.get("projects/".concat(pId, "/repository/commits/").concat(sha, "/comments"), options);
    }
  }, {
    key: "create",
    value: function create(projectId, sha, note) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var pId = (0, _Utils.parse)(projectId);
      return this.post("projects/".concat(pId, "/repository/commits/").concat(sha, "/comments"), (0, _assign.default)({
        note: note
      }, options));
    }
  }]);
  return ProjectRepositoryCommitComments;
}(_BaseModel2.default);

var _default = ProjectRepositoryCommitComments;
exports.default = _default;