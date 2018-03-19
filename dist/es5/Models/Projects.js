"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("babel-runtime/helpers/slicedToArray"));

var _assign = _interopRequireDefault(require("babel-runtime/core-js/object/assign"));

var _getPrototypeOf = _interopRequireDefault(require("babel-runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("babel-runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("babel-runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("babel-runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("babel-runtime/helpers/inherits"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _BaseModel2 = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

var _ProjectHooks = _interopRequireDefault(require("./ProjectHooks"));

var _ProjectIssues = _interopRequireDefault(require("./ProjectIssues"));

var _ProjectLabels = _interopRequireDefault(require("./ProjectLabels"));

var _ProjectRepository = _interopRequireDefault(require("./ProjectRepository"));

var _ProjectProtectedBranches = _interopRequireDefault(require("./ProjectProtectedBranches"));

var _ProjectDeployKeys = _interopRequireDefault(require("./ProjectDeployKeys"));

var _ProjectMergeRequests = _interopRequireDefault(require("./ProjectMergeRequests"));

var _ProjectServices = _interopRequireDefault(require("./ProjectServices"));

var _ProjectTriggers = _interopRequireDefault(require("./ProjectTriggers"));

var _ProjectRunners = _interopRequireDefault(require("./ProjectRunners"));

var _ProjectPipelines = _interopRequireDefault(require("./ProjectPipelines"));

var _ProjectJobs = _interopRequireDefault(require("./ProjectJobs"));

var _ProjectEnvironments = _interopRequireDefault(require("./ProjectEnvironments"));

var _ResourceCustomAttributes = _interopRequireDefault(require("./ResourceCustomAttributes"));

var _ResourceMembers = _interopRequireDefault(require("./ResourceMembers"));

var _ResourceAccessRequests = _interopRequireDefault(require("./ResourceAccessRequests"));

var _ResourceMilestones = _interopRequireDefault(require("./ResourceMilestones"));

var _ResourceNotes = _interopRequireDefault(require("./ResourceNotes"));

var Projects =
/*#__PURE__*/
function (_BaseModel) {
  (0, _inherits2.default)(Projects, _BaseModel);

  function Projects() {
    var _ref;

    var _this;

    (0, _classCallCheck2.default)(this, Projects);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_ref = Projects.__proto__ || (0, _getPrototypeOf.default)(Projects)).call.apply(_ref, [this].concat(args)));
    _this.hooks = new (Function.prototype.bind.apply(_ProjectHooks.default, [null].concat(args)))();
    _this.issues = new (Function.prototype.bind.apply(_ProjectIssues.default, [null].concat(args)))();
    _this.labels = new (Function.prototype.bind.apply(_ProjectLabels.default, [null].concat(args)))();
    _this.repository = new (Function.prototype.bind.apply(_ProjectRepository.default, [null].concat(args)))();
    _this.protectedBranches = new (Function.prototype.bind.apply(_ProjectProtectedBranches.default, [null].concat(args)))();
    _this.deployKeys = new (Function.prototype.bind.apply(_ProjectDeployKeys.default, [null].concat(args)))();
    _this.mergeRequests = new (Function.prototype.bind.apply(_ProjectMergeRequests.default, [null].concat(args)))();
    _this.services = new (Function.prototype.bind.apply(_ProjectServices.default, [null].concat(args)))();
    _this.triggers = new (Function.prototype.bind.apply(_ProjectTriggers.default, [null].concat(args)))();
    _this.pipelines = new (Function.prototype.bind.apply(_ProjectPipelines.default, [null].concat(args)))();
    _this.jobs = new (Function.prototype.bind.apply(_ProjectJobs.default, [null].concat(args)))();
    _this.environments = new (Function.prototype.bind.apply(_ProjectEnvironments.default, [null].concat(args)))();
    _this.runners = new (Function.prototype.bind.apply(_ProjectRunners.default, [null].concat(args)))();
    _this.customAttributes = new (Function.prototype.bind.apply(_ResourceCustomAttributes.default, [null].concat(['projects'], args)))();
    _this.members = new (Function.prototype.bind.apply(_ResourceMembers.default, [null].concat(['projects'], args)))();
    _this.accessRequests = new (Function.prototype.bind.apply(_ResourceAccessRequests.default, [null].concat(['projects'], args)))();
    _this.milestones = new (Function.prototype.bind.apply(_ResourceMilestones.default, [null].concat(['projects'], args)))();
    _this.snippets = new (Function.prototype.bind.apply(_ResourceNotes.default, [null].concat(['projects', 'snippets'], args)))();
    return _this;
  }

  (0, _createClass2.default)(Projects, [{
    key: "all",
    value: function all() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.get('projects', options);
    }
  }, {
    key: "create",
    value: function create() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (options.userId) {
        var uId = (0, _Utils.parse)(options.userId);
        return this.post("projects/user/".concat(uId), options);
      }

      return this.post('projects', options);
    }
  }, {
    key: "edit",
    value: function edit(projectId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var pId = (0, _Utils.parse)(projectId);
      return this.put("projects/".concat(pId), options);
    }
  }, {
    key: "fork",
    value: function fork(projectId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var pId = (0, _Utils.parse)(projectId);
      return this.post("projects/".concat(pId, "/fork"), options);
    }
  }, {
    key: "forks",
    value: function forks(projectId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var pId = (0, _Utils.parse)(projectId);
      return this.get("projects/".concat(pId, "/forks"), options);
    }
  }, {
    key: "remove",
    value: function remove(projectId) {
      var pId = (0, _Utils.parse)(projectId);
      return this.delete("projects/".concat(pId));
    }
  }, {
    key: "search",
    value: function search(projectName) {
      return this.get('projects', {
        search: projectName
      });
    }
  }, {
    key: "share",
    value: function share(projectId, groupId, groupAccess, options) {
      var pId = (0, _Utils.parse)(projectId);
      if (!groupId || !groupAccess) throw new Error('Missing required arguments');
      options.group_id = groupId;
      options.group_access = groupAccess;
      return this.post("projects/".concat(pId, "/share"), options);
    }
  }, {
    key: "show",
    value: function show(projectId) {
      var pId = (0, _Utils.parse)(projectId);
      return this.get("projects/".concat(pId));
    }
  }, {
    key: "star",
    value: function star(projectId) {
      var pId = (0, _Utils.parse)(projectId);
      return this.post("projects/".concat(pId, "/star"));
    }
  }, {
    key: "statuses",
    value: function statuses(projectId, sha, state) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var pId = (0, _Utils.parse)(projectId);
      return this.post("projects/".concat(pId, "/statuses/").concat(sha), (0, _assign.default)({
        state: state
      }, options));
    }
  }, {
    key: "unshare",
    value: function unshare(projectId, groupId) {
      var _map = [projectId, groupId].map(_Utils.parse),
          _map2 = (0, _slicedToArray2.default)(_map, 2),
          pId = _map2[0],
          gId = _map2[1];

      return this.delete("projects/".concat(pId, "/share").concat(gId));
    }
  }, {
    key: "unstar",
    value: function unstar(projectId) {
      var pId = (0, _Utils.parse)(projectId);
      return this.post("projects/".concat(pId, "/unstar"));
    }
  }, {
    key: "upload",
    value: function upload(projectId, filePath) {
      var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref2$fileName = _ref2.fileName,
          fileName = _ref2$fileName === void 0 ? _path.default.basename(filePath) : _ref2$fileName;

      var pId = (0, _Utils.parse)(projectId);

      var file = _fs.default.readFileSync(filePath);

      return this.postForm("projects/".concat(pId, "/uploads"), {
        file: {
          value: file,
          options: {
            filename: fileName,
            contentType: 'application/octet-stream'
          }
        }
      });
    }
  }]);
  return Projects;
}(_BaseModel2.default);

module.exports = Projects;