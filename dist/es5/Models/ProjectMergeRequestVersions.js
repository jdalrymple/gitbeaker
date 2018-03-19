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

var ProjectMergeRequestVersions =
/*#__PURE__*/
function (_BaseModel) {
  (0, _inherits2.default)(ProjectMergeRequestVersions, _BaseModel);

  function ProjectMergeRequestVersions() {
    (0, _classCallCheck2.default)(this, ProjectMergeRequestVersions);
    return (0, _possibleConstructorReturn2.default)(this, (ProjectMergeRequestVersions.__proto__ || (0, _getPrototypeOf.default)(ProjectMergeRequestVersions)).apply(this, arguments));
  }

  (0, _createClass2.default)(ProjectMergeRequestVersions, [{
    key: "all",
    value: function all(projectId, mergerequestId) {
      var _map = [projectId, mergerequestId].map(_Utils.parse),
          _map2 = (0, _slicedToArray2.default)(_map, 2),
          pId = _map2[0],
          mId = _map2[1];

      return this.get("projects/".concat(pId, "/merge_requests/").concat(mId, "/versions"));
    }
  }, {
    key: "show",
    value: function show(projectId, mergerequestId, versionId) {
      var _map3 = [projectId, mergerequestId, versionId].map(_Utils.parse),
          _map4 = (0, _slicedToArray2.default)(_map3, 3),
          pId = _map4[0],
          mId = _map4[1],
          vId = _map4[2];

      return this.get("projects/".concat(pId, "/merge_requests/").concat(mId, "/versions/").concat(vId));
    }
  }]);
  return ProjectMergeRequestVersions;
}(_BaseModel2.default);

var _default = ProjectMergeRequestVersions;
exports.default = _default;