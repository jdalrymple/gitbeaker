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

var ProjectRepositoryTags =
/*#__PURE__*/
function (_BaseModel) {
  (0, _inherits2.default)(ProjectRepositoryTags, _BaseModel);

  function ProjectRepositoryTags() {
    (0, _classCallCheck2.default)(this, ProjectRepositoryTags);
    return (0, _possibleConstructorReturn2.default)(this, (ProjectRepositoryTags.__proto__ || (0, _getPrototypeOf.default)(ProjectRepositoryTags)).apply(this, arguments));
  }

  (0, _createClass2.default)(ProjectRepositoryTags, [{
    key: "all",
    value: function all(projectId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var pId = (0, _Utils.parse)(projectId);
      return this.get("projects/".concat(pId, "/repository/tags"), options);
    }
  }, {
    key: "create",
    value: function create(projectId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var pId = (0, _Utils.parse)(projectId);
      return this.post("projects/".concat(pId, "/repository/tags"), options);
    }
  }, {
    key: "remove",
    value: function remove(projectId, tagName) {
      var pId = (0, _Utils.parse)(projectId);
      return this.delete("projects/".concat(pId, "/repository/tags/").concat(encodeURI(tagName)));
    }
  }, {
    key: "show",
    value: function show(projectId, tagName) {
      var pId = (0, _Utils.parse)(projectId);
      return this.get("projects/".concat(pId, "/repository/tags/").concat(encodeURI(tagName)));
    }
  }]);
  return ProjectRepositoryTags;
}(_BaseModel2.default);

var _default = ProjectRepositoryTags;
exports.default = _default;