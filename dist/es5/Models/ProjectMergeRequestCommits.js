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

var ProjectMergeRequestCommits =
/*#__PURE__*/
function (_BaseModel) {
  (0, _inherits2.default)(ProjectMergeRequestCommits, _BaseModel);

  function ProjectMergeRequestCommits() {
    (0, _classCallCheck2.default)(this, ProjectMergeRequestCommits);
    return (0, _possibleConstructorReturn2.default)(this, (ProjectMergeRequestCommits.__proto__ || (0, _getPrototypeOf.default)(ProjectMergeRequestCommits)).apply(this, arguments));
  }

  (0, _createClass2.default)(ProjectMergeRequestCommits, [{
    key: "show",
    value: function show(projectId, mergerequestId) {
      var _map = [projectId, mergerequestId].map(_Utils.parse),
          _map2 = (0, _slicedToArray2.default)(_map, 2),
          pId = _map2[0],
          mId = _map2[1];

      return this.get("projects/".concat(pId, "/merge_requests/").concat(mId, "/commits"));
    }
  }]);
  return ProjectMergeRequestCommits;
}(_BaseModel2.default);

var _default = ProjectMergeRequestCommits;
exports.default = _default;