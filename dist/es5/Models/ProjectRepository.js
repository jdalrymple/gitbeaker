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

var _ProjectRepositoryBranches = _interopRequireDefault(require("./ProjectRepositoryBranches"));

var _ProjectRepositoryTags = _interopRequireDefault(require("./ProjectRepositoryTags"));

var _ProjectRepositoryCommits = _interopRequireDefault(require("./ProjectRepositoryCommits"));

var _ProjectRepositoryFiles = _interopRequireDefault(require("./ProjectRepositoryFiles"));

var ProjectRepository =
/*#__PURE__*/
function (_BaseModel) {
  (0, _inherits2.default)(ProjectRepository, _BaseModel);

  function ProjectRepository() {
    var _ref;

    var _this;

    (0, _classCallCheck2.default)(this, ProjectRepository);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_ref = ProjectRepository.__proto__ || (0, _getPrototypeOf.default)(ProjectRepository)).call.apply(_ref, [this].concat(args)));
    _this.branches = new (Function.prototype.bind.apply(_ProjectRepositoryBranches.default, [null].concat(args)))();
    _this.tags = new (Function.prototype.bind.apply(_ProjectRepositoryTags.default, [null].concat(args)))();
    _this.commits = new (Function.prototype.bind.apply(_ProjectRepositoryCommits.default, [null].concat(args)))();
    _this.files = new (Function.prototype.bind.apply(_ProjectRepositoryFiles.default, [null].concat(args)))();
    return _this;
  }

  (0, _createClass2.default)(ProjectRepository, [{
    key: "compare",
    value: function compare(projectId, from, to) {
      var pId = (0, _Utils.parse)(projectId);
      return this.get("projects/".concat(pId, "/repository/compare"), {
        from: from,
        to: to
      });
    }
  }, {
    key: "contributors",
    value: function contributors(projectId) {
      var pId = (0, _Utils.parse)(projectId);
      return this.get("projects/".concat(pId, "/repository/contributors"));
    }
  }, {
    key: "showArchive",
    value: function showArchive(projectId, _ref2) {
      var sha = _ref2.sha;
      var pId = (0, _Utils.parse)(projectId);
      return this.get("projects/".concat(pId, "/repository/archive"), {
        sha: sha
      });
    }
  }, {
    key: "showBlob",
    value: function showBlob(projectId, sha) {
      var pId = (0, _Utils.parse)(projectId);
      return this.get("projects/".concat(pId, "/repository/blobs/").concat(sha));
    }
  }, {
    key: "showBlobRaw",
    value: function showBlobRaw(projectId, sha) {
      var pId = (0, _Utils.parse)(projectId);
      return this.get("projects/".concat(pId, "/repository/blobs/").concat(sha, "/raw"));
    }
  }, {
    key: "tree",
    value: function tree(projectId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var pId = (0, _Utils.parse)(projectId);
      return this.get("projects/".concat(pId, "/repository/tree"), options);
    }
  }]);
  return ProjectRepository;
}(_BaseModel2.default);

var _default = ProjectRepository;
exports.default = _default;