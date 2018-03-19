"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assign = _interopRequireDefault(require("babel-runtime/core-js/object/assign"));

var _slicedToArray2 = _interopRequireDefault(require("babel-runtime/helpers/slicedToArray"));

var _getPrototypeOf = _interopRequireDefault(require("babel-runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("babel-runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("babel-runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("babel-runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("babel-runtime/helpers/inherits"));

var _BaseModel2 = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

var _ProjectMergeRequestVersions = _interopRequireDefault(require("./ProjectMergeRequestVersions"));

var _ProjectMergeRequestChanges = _interopRequireDefault(require("./ProjectMergeRequestChanges"));

var _ProjectMergeRequestCommits = _interopRequireDefault(require("./ProjectMergeRequestCommits"));

var _ResourceNotes = _interopRequireDefault(require("./ResourceNotes"));

var ProjectMergeRequests =
/*#__PURE__*/
function (_BaseModel) {
  (0, _inherits2.default)(ProjectMergeRequests, _BaseModel);

  function ProjectMergeRequests() {
    var _ref;

    var _this;

    (0, _classCallCheck2.default)(this, ProjectMergeRequests);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_ref = ProjectMergeRequests.__proto__ || (0, _getPrototypeOf.default)(ProjectMergeRequests)).call.apply(_ref, [this].concat(args)));
    _this.commits = new (Function.prototype.bind.apply(_ProjectMergeRequestCommits.default, [null].concat(args)))();
    _this.changes = new (Function.prototype.bind.apply(_ProjectMergeRequestChanges.default, [null].concat(args)))();
    _this.versions = new (Function.prototype.bind.apply(_ProjectMergeRequestVersions.default, [null].concat(args)))();
    _this.notes = new (Function.prototype.bind.apply(_ResourceNotes.default, [null].concat(['projects', 'merge_requests'], args)))();
    return _this;
  }

  (0, _createClass2.default)(ProjectMergeRequests, [{
    key: "accept",
    value: function accept(projectId, mergerequestId) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var _map = [projectId, mergerequestId].map(_Utils.parse),
          _map2 = (0, _slicedToArray2.default)(_map, 2),
          pId = _map2[0],
          mId = _map2[1];

      return this.put("projects/".concat(pId, "/merge_requests/").concat(mId, "/merge"), options);
    }
  }, {
    key: "all",
    value: function all(projectId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var pId = (0, _Utils.parse)(projectId);
      return this.get("projects/".concat(pId, "/merge_requests"), options);
    }
  }, {
    key: "cancelOnPipelineSucess",
    value: function cancelOnPipelineSucess(projectId, mergerequestId) {
      var _map3 = [projectId, mergerequestId].map(_Utils.parse),
          _map4 = (0, _slicedToArray2.default)(_map3, 2),
          pId = _map4[0],
          mId = _map4[1];

      return this.put("projects/".concat(pId, "/merge_requests/").concat(mId, "/cancel_merge_when_pipeline_succeeds"));
    }
  }, {
    key: "closesIssues",
    value: function closesIssues(projectId, mergerequestId) {
      var _map5 = [projectId, mergerequestId].map(_Utils.parse),
          _map6 = (0, _slicedToArray2.default)(_map5, 2),
          pId = _map6[0],
          mId = _map6[1];

      return this.get("projects/".concat(pId, "/merge_requests/").concat(mId, "/closes_issues"));
    }
  }, {
    key: "create",
    value: function create(projectId, sourceBranch, targetBranch, title) {
      var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var pId = (0, _Utils.parse)(projectId);
      return this.post("projects/".concat(pId, "/merge_requests"), (0, _assign.default)({
        id: pId,
        source_branch: sourceBranch,
        target_branch: targetBranch,
        title: title
      }, options));
    }
  }, {
    key: "createTodo",
    value: function createTodo(projectId, mergerequestId) {
      var _map7 = [projectId, mergerequestId].map(_Utils.parse),
          _map8 = (0, _slicedToArray2.default)(_map7, 2),
          pId = _map8[0],
          mId = _map8[1];

      return this.post("projects/".concat(pId, "/merge_requests/").concat(mId, "/todo"));
    }
  }, {
    key: "edit",
    value: function edit(projectId, mergerequestId) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var _map9 = [projectId, mergerequestId].map(_Utils.parse),
          _map10 = (0, _slicedToArray2.default)(_map9, 2),
          pId = _map10[0],
          mId = _map10[1];

      return this.put("projects/".concat(pId, "/merge_requests/").concat(mId), options);
    }
  }, {
    key: "remove",
    value: function remove(projectId, mergerequestId) {
      var _map11 = [projectId, mergerequestId].map(_Utils.parse),
          _map12 = (0, _slicedToArray2.default)(_map11, 2),
          pId = _map12[0],
          mId = _map12[1];

      return this.delete("projects/".concat(pId, "/merge_requests/").concat(mId));
    }
  }, {
    key: "show",
    value: function show(projectId, mergerequestId) {
      var _map13 = [projectId, mergerequestId].map(_Utils.parse),
          _map14 = (0, _slicedToArray2.default)(_map13, 2),
          pId = _map14[0],
          mId = _map14[1];

      return this.get("projects/".concat(pId, "/merge_requests/").concat(mId));
    }
  }, {
    key: "subscribe",
    value: function subscribe(projectId, mergerequestId) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var _map15 = [projectId, mergerequestId].map(_Utils.parse),
          _map16 = (0, _slicedToArray2.default)(_map15, 2),
          pId = _map16[0],
          mId = _map16[1];

      return this.post("projects/".concat(pId, "/merge_requests/").concat(mId, "/subscribe"), options);
    }
  }, {
    key: "resetSpentTime",
    value: function resetSpentTime(projectId, mergerequestId) {
      var _map17 = [projectId, mergerequestId].map(_Utils.parse),
          _map18 = (0, _slicedToArray2.default)(_map17, 2),
          pId = _map18[0],
          mId = _map18[1];

      return this.post("projects/".concat(pId, "/merge_requests/").concat(mId, "/reset_spent_time"));
    }
  }, {
    key: "resetTimeEstimate",
    value: function resetTimeEstimate(projectId, mergerequestId) {
      var _map19 = [projectId, mergerequestId].map(_Utils.parse),
          _map20 = (0, _slicedToArray2.default)(_map19, 2),
          pId = _map20[0],
          mId = _map20[1];

      return this.post("projects/".concat(pId, "/merge_requests/").concat(mId, "/reset_time_estimate"));
    }
  }, {
    key: "spentTime",
    value: function spentTime(projectId, mergerequestId, duration) {
      var _map21 = [projectId, mergerequestId].map(_Utils.parse),
          _map22 = (0, _slicedToArray2.default)(_map21, 2),
          pId = _map22[0],
          mId = _map22[1];

      return this.post("projects/".concat(pId, "/merge_requests/").concat(mId, "/add_spent_time"), {
        duration: duration
      });
    }
  }, {
    key: "timeEstimate",
    value: function timeEstimate(projectId, mergerequestId, duration) {
      var _map23 = [projectId, mergerequestId].map(_Utils.parse),
          _map24 = (0, _slicedToArray2.default)(_map23, 2),
          pId = _map24[0],
          mId = _map24[1];

      return this.post("projects/".concat(pId, "/merge_requests/").concat(mId, "/time_estimate"), {
        duration: duration
      });
    }
  }, {
    key: "timeStats",
    value: function timeStats(projectId, mergerequestId) {
      var _map25 = [projectId, mergerequestId].map(_Utils.parse),
          _map26 = (0, _slicedToArray2.default)(_map25, 2),
          pId = _map26[0],
          mId = _map26[1];

      return this.get("projects/".concat(pId, "/merge_requests/").concat(mId, "/time_stats"));
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(projectId, mergerequestId) {
      var _map27 = [projectId, mergerequestId].map(_Utils.parse),
          _map28 = (0, _slicedToArray2.default)(_map27, 2),
          pId = _map28[0],
          mId = _map28[1];

      return this.delete("projects/".concat(pId, "/merge_requests/").concat(mId, "/unsubscribe"));
    }
  }]);
  return ProjectMergeRequests;
}(_BaseModel2.default);

var _default = ProjectMergeRequests;
exports.default = _default;