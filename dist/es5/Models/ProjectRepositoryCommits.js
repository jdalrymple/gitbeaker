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

var _ProjectRepositoryCommitComments = _interopRequireDefault(require("./ProjectRepositoryCommitComments"));

var ProjectRepositoryCommits =
/*#__PURE__*/
function (_BaseModel) {
  (0, _inherits2.default)(ProjectRepositoryCommits, _BaseModel);

  function ProjectRepositoryCommits() {
    var _ref;

    var _this;

    (0, _classCallCheck2.default)(this, ProjectRepositoryCommits);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_ref = ProjectRepositoryCommits.__proto__ || (0, _getPrototypeOf.default)(ProjectRepositoryCommits)).call.apply(_ref, [this].concat(args)));
    _this.comments = new (Function.prototype.bind.apply(_ProjectRepositoryCommitComments.default, [null].concat(args)))();
    return _this;
  }

  (0, _createClass2.default)(ProjectRepositoryCommits, [{
    key: "all",
    value: function all(projectId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var pId = (0, _Utils.parse)(projectId);
      return this.get("projects/".concat(pId, "/repository/commits"), options);
    }
  }, {
    key: "diff",
    value: function diff(projectId, sha) {
      var pId = (0, _Utils.parse)(projectId);
      return this.get("projects/".concat(pId, "/repository/commits/").concat(sha, "/diff"));
    }
  }, {
    key: "show",
    value: function show(projectId, sha) {
      var pId = (0, _Utils.parse)(projectId);
      return this.get("projects/".concat(pId, "/repository/commits/").concat(sha));
    }
  }, {
    key: "statuses",
    value: function statuses(projectId, sha) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var pId = (0, _Utils.parse)(projectId);
      return this.get("projects/".concat(pId, "/repository/commits/").concat(sha, "/statuses"), options);
    }
  }]);
  return ProjectRepositoryCommits;
}(_BaseModel2.default);

var _default = ProjectRepositoryCommits;
exports.default = _default;