"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _infrastructure = require("../infrastructure");

var _Events = require("./Events");

var Projects =
/*#__PURE__*/
function (_BaseService) {
  (0, _inherits2.default)(Projects, _BaseService);

  function Projects() {
    (0, _classCallCheck2.default)(this, Projects);
    return (0, _possibleConstructorReturn2.default)(this, (Projects.__proto__ || (0, _getPrototypeOf.default)(Projects)).apply(this, arguments));
  }

  (0, _createClass2.default)(Projects, [{
    key: "all",
    value: function all(options) {
      return _infrastructure.RequestHelper.get(this, 'projects', options);
    }
  }, {
    key: "create",
    value: function create(options) {
      var url = options.userId ? "projects/user/".concat(encodeURIComponent(options.userId)) : 'projects';
      return _infrastructure.RequestHelper.post(this, url, options);
    }
  }, {
    key: "edit",
    value: function edit(projectId, options) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.put(this, "projects/".concat(pId), options);
    }
  }, {
    key: "events",
    value: function events(projectId, options) {
      (0, _Events.validateEventOptions)(options.action, options.targetType);
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/events"), options);
    }
  }, {
    key: "fork",
    value: function fork(projectId, options) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.post(this, "projects/".concat(pId, "/fork"), options);
    }
  }, {
    key: "forks",
    value: function forks(projectId, options) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/forks"), options);
    }
  }, {
    key: "remove",
    value: function remove(projectId) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.delete(this, "projects/".concat(pId));
    }
  }, {
    key: "search",
    value: function search(projectName) {
      return _infrastructure.RequestHelper.get(this, 'projects', {
        search: projectName
      });
    }
  }, {
    key: "share",
    value: function share(projectId, groupId, groupAccess, options) {
      var pId = encodeURIComponent(projectId);
      if (!groupId || !groupAccess) throw new Error('Missing required arguments');
      return _infrastructure.RequestHelper.post(this, "projects/".concat(pId, "/share"), (0, _objectSpread2.default)({
        groupId: groupId,
        groupAccess: groupAccess
      }, options));
    }
  }, {
    key: "show",
    value: function show(projectId) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId));
    }
  }, {
    key: "star",
    value: function star(projectId) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.post(this, "projects/".concat(pId, "/star"));
    }
  }, {
    key: "statuses",
    value: function statuses(projectId, sha, state, options) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.post(this, "projects/".concat(pId, "/statuses/").concat(sha), (0, _objectSpread2.default)({
        state: state
      }, options));
    }
  }, {
    key: "unshare",
    value: function unshare(projectId, groupId) {
      var _map = [projectId, groupId].map(encodeURIComponent),
          _map2 = (0, _slicedToArray2.default)(_map, 2),
          pId = _map2[0],
          gId = _map2[1];

      return _infrastructure.RequestHelper.delete(this, "projects/".concat(pId, "/share").concat(gId));
    }
  }, {
    key: "unstar",
    value: function unstar(projectId) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.post(this, "projects/".concat(pId, "/unstar"));
    }
  }, {
    key: "upload",
    value: function upload(projectId, filePath) {
      var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref$fileName = _ref.fileName,
          fileName = _ref$fileName === void 0 ? _path.default.basename(filePath) : _ref$fileName;

      var pId = encodeURIComponent(projectId);

      var file = _fs.default.readFileSync(filePath);

      return _infrastructure.RequestHelper.post(this, "projects/".concat(pId, "/uploads"), {
        file: {
          value: file,
          options: {
            filename: fileName,
            contentType: 'application/octet-stream'
          }
        }
      }, true);
    }
  }]);
  return Projects;
}(_infrastructure.BaseService);

var _default = Projects;
exports.default = _default;