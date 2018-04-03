"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _infrastructure = require("../infrastructure");

var MergeRequests =
/*#__PURE__*/
function (_BaseService) {
  (0, _inherits2.default)(MergeRequests, _BaseService);

  function MergeRequests() {
    (0, _classCallCheck2.default)(this, MergeRequests);
    return (0, _possibleConstructorReturn2.default)(this, (MergeRequests.__proto__ || (0, _getPrototypeOf.default)(MergeRequests)).apply(this, arguments));
  }

  (0, _createClass2.default)(MergeRequests, [{
    key: "accept",
    value: function accept(projectId, mergerequestId, options) {
      var _map = [projectId, mergerequestId].map(encodeURIComponent),
          _map2 = (0, _slicedToArray2.default)(_map, 2),
          pId = _map2[0],
          mId = _map2[1];

      return _infrastructure.RequestHelper.put(this, "projects/".concat(pId, "/merge_requests/").concat(mId, "/merge"), options);
    }
  }, {
    key: "approve",
    value: function approve(projectId, mergerequestId, _ref) {
      var sha = _ref.sha;

      var _map3 = [projectId, mergerequestId].map(encodeURIComponent),
          _map4 = (0, _slicedToArray2.default)(_map3, 2),
          pId = _map4[0],
          mId = _map4[1];

      return _infrastructure.RequestHelper.post(this, "projects/".concat(pId, "/merge_requests/").concat(mId, "/approve"), {
        sha: sha
      });
    }
  }, {
    key: "approvals",
    value: function approvals(projectId) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          mergerequestId = _ref2.mergerequestId;

      var pId = encodeURIComponent(projectId);
      var mergeRequest = mergerequestId ? "merge_requests/".concat(encodeURIComponent(mergerequestId)) : '';
      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/").concat(mergeRequest, "/approvals"));
    }
  }, {
    key: "all",
    value: function all() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var projectId = _ref3.projectId,
          options = (0, _objectWithoutProperties2.default)(_ref3, ["projectId"]);
      var url = projectId ? "projects/".concat(encodeURIComponent(projectId), "/merge_requests") : 'merge_requests';
      return _infrastructure.RequestHelper.get(this, url, options);
    }
  }, {
    key: "cancelOnPipelineSucess",
    value: function cancelOnPipelineSucess(projectId, mergerequestId) {
      var _map5 = [projectId, mergerequestId].map(encodeURIComponent),
          _map6 = (0, _slicedToArray2.default)(_map5, 2),
          pId = _map6[0],
          mId = _map6[1];

      return _infrastructure.RequestHelper.put(this, "projects/".concat(pId, "/merge_requests/").concat(mId, "/cancel_merge_when_pipeline_succeeds"));
    }
  }, {
    key: "changes",
    value: function changes(projectId, mergerequestId) {
      var _map7 = [projectId, mergerequestId].map(encodeURIComponent),
          _map8 = (0, _slicedToArray2.default)(_map7, 2),
          pId = _map8[0],
          mId = _map8[1];

      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/merge_requests/").concat(mId, "/changes"));
    }
  }, {
    key: "closesIssues",
    value: function closesIssues(projectId, mergerequestId) {
      var _map9 = [projectId, mergerequestId].map(encodeURIComponent),
          _map10 = (0, _slicedToArray2.default)(_map9, 2),
          pId = _map10[0],
          mId = _map10[1];

      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/merge_requests/").concat(mId, "/closes_issues"));
    }
  }, {
    key: "commits",
    value: function commits(projectId, mergerequestId) {
      var _map11 = [projectId, mergerequestId].map(encodeURIComponent),
          _map12 = (0, _slicedToArray2.default)(_map11, 2),
          pId = _map12[0],
          mId = _map12[1];

      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/merge_requests/").concat(mId, "/commits"));
    }
  }, {
    key: "create",
    value: function create(projectId, sourceBranch, targetBranch, title, options) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.post(this, "projects/".concat(pId, "/merge_requests"), (0, _objectSpread2.default)({
        id: pId,
        sourceBranch: sourceBranch,
        targetBranch: targetBranch,
        title: title
      }, options));
    }
  }, {
    key: "edit",
    value: function edit(projectId, mergerequestId, options) {
      var _map13 = [projectId, mergerequestId].map(encodeURIComponent),
          _map14 = (0, _slicedToArray2.default)(_map13, 2),
          pId = _map14[0],
          mId = _map14[1];

      return _infrastructure.RequestHelper.put(this, "projects/".concat(pId, "/merge_requests/").concat(mId), options);
    }
  }, {
    key: "editApprovals",
    value: function editApprovals(projectId, _ref4) {
      var mergerequestId = _ref4.mergerequestId,
          options = (0, _objectWithoutProperties2.default)(_ref4, ["mergerequestId"]);
      var pId = encodeURIComponent(projectId);
      var mergeRequest = mergerequestId ? "merge_requests/".concat(encodeURIComponent(mergerequestId), "/") : '';
      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/").concat(mergeRequest, "approvals"), options);
    }
  }, {
    key: "editApprovers",
    value: function editApprovers(projectId, _ref5) {
      var mergerequestId = _ref5.mergerequestId,
          options = (0, _objectWithoutProperties2.default)(_ref5, ["mergerequestId"]);
      var pId = encodeURIComponent(projectId);
      var mergeRequest = mergerequestId ? "merge_requests/".concat(encodeURIComponent(mergerequestId), "/") : '';
      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/").concat(mergeRequest, "approvers"), options);
    }
  }, {
    key: "remove",
    value: function remove(projectId, mergerequestId) {
      var _map15 = [projectId, mergerequestId].map(encodeURIComponent),
          _map16 = (0, _slicedToArray2.default)(_map15, 2),
          pId = _map16[0],
          mId = _map16[1];

      return _infrastructure.RequestHelper.delete(this, "projects/".concat(pId, "/merge_requests/").concat(mId));
    }
  }, {
    key: "show",
    value: function show(projectId, mergerequestId) {
      var _map17 = [projectId, mergerequestId].map(encodeURIComponent),
          _map18 = (0, _slicedToArray2.default)(_map17, 2),
          pId = _map18[0],
          mId = _map18[1];

      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/merge_requests/").concat(mId));
    }
  }, {
    key: "subscribe",
    value: function subscribe(projectId, mergerequestId, options) {
      var _map19 = [projectId, mergerequestId].map(encodeURIComponent),
          _map20 = (0, _slicedToArray2.default)(_map19, 2),
          pId = _map20[0],
          mId = _map20[1];

      return _infrastructure.RequestHelper.post(this, "projects/".concat(pId, "/merge_requests/").concat(mId, "/subscribe"), options);
    }
  }, {
    key: "resetSpentTime",
    value: function resetSpentTime(projectId, mergerequestId) {
      var _map21 = [projectId, mergerequestId].map(encodeURIComponent),
          _map22 = (0, _slicedToArray2.default)(_map21, 2),
          pId = _map22[0],
          mId = _map22[1];

      return _infrastructure.RequestHelper.post(this, "projects/".concat(pId, "/merge_requests/").concat(mId, "/reset_spent_time"));
    }
  }, {
    key: "resetTimeEstimate",
    value: function resetTimeEstimate(projectId, mergerequestId) {
      var _map23 = [projectId, mergerequestId].map(encodeURIComponent),
          _map24 = (0, _slicedToArray2.default)(_map23, 2),
          pId = _map24[0],
          mId = _map24[1];

      return _infrastructure.RequestHelper.post(this, "projects/".concat(pId, "/merge_requests/").concat(mId, "/reset_time_estimate"));
    }
  }, {
    key: "spentTime",
    value: function spentTime(projectId, mergerequestId, duration) {
      var _map25 = [projectId, mergerequestId].map(encodeURIComponent),
          _map26 = (0, _slicedToArray2.default)(_map25, 2),
          pId = _map26[0],
          mId = _map26[1];

      return _infrastructure.RequestHelper.post(this, "projects/".concat(pId, "/merge_requests/").concat(mId, "/add_spent_time"), {
        duration: duration
      });
    }
  }, {
    key: "timeEstimate",
    value: function timeEstimate(projectId, mergerequestId, duration) {
      var _map27 = [projectId, mergerequestId].map(encodeURIComponent),
          _map28 = (0, _slicedToArray2.default)(_map27, 2),
          pId = _map28[0],
          mId = _map28[1];

      return _infrastructure.RequestHelper.post(this, "projects/".concat(pId, "/merge_requests/").concat(mId, "/time_estimate"), {
        duration: duration
      });
    }
  }, {
    key: "timeStats",
    value: function timeStats(projectId, mergerequestId) {
      var _map29 = [projectId, mergerequestId].map(encodeURIComponent),
          _map30 = (0, _slicedToArray2.default)(_map29, 2),
          pId = _map30[0],
          mId = _map30[1];

      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/merge_requests/").concat(mId, "/time_stats"));
    }
  }, {
    key: "version",
    value: function version(projectId, mergerequestId, versionId) {
      var _map31 = [projectId, mergerequestId, versionId].map(encodeURIComponent),
          _map32 = (0, _slicedToArray2.default)(_map31, 3),
          pId = _map32[0],
          mId = _map32[1],
          vId = _map32[2];

      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/merge_requests/").concat(mId, "/versions/").concat(vId));
    }
  }, {
    key: "versions",
    value: function versions(projectId, mergerequestId) {
      var _map33 = [projectId, mergerequestId].map(encodeURIComponent),
          _map34 = (0, _slicedToArray2.default)(_map33, 2),
          pId = _map34[0],
          mId = _map34[1];

      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/merge_requests/").concat(mId, "/versions"));
    }
  }, {
    key: "unapprove",
    value: function unapprove(projectId, mergerequestId) {
      var _map35 = [projectId, mergerequestId].map(encodeURIComponent),
          _map36 = (0, _slicedToArray2.default)(_map35, 2),
          pId = _map36[0],
          mId = _map36[1];

      return _infrastructure.RequestHelper.post(this, "projects/".concat(pId, "/merge_requests/").concat(mId, "/approve"));
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(projectId, mergerequestId) {
      var _map37 = [projectId, mergerequestId].map(encodeURIComponent),
          _map38 = (0, _slicedToArray2.default)(_map37, 2),
          pId = _map38[0],
          mId = _map38[1];

      return _infrastructure.RequestHelper.delete(this, "projects/".concat(pId, "/merge_requests/").concat(mId, "/unsubscribe"));
    }
  }]);
  return MergeRequests;
}(_infrastructure.BaseService);

var _default = MergeRequests;
exports.default = _default;