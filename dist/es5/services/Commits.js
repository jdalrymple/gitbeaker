"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _infrastructure = require("../infrastructure");

var Commits =
/*#__PURE__*/
function (_BaseService) {
  (0, _inherits2.default)(Commits, _BaseService);

  function Commits() {
    (0, _classCallCheck2.default)(this, Commits);
    return (0, _possibleConstructorReturn2.default)(this, (Commits.__proto__ || (0, _getPrototypeOf.default)(Commits)).apply(this, arguments));
  }

  (0, _createClass2.default)(Commits, [{
    key: "all",
    value: function all(projectId, options) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/repository/commits"), options);
    }
  }, {
    key: "comments",
    value: function comments(projectId, sha) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/repository/commits/").concat(sha, "/comments"));
    }
  }, {
    key: "createComment",
    value: function createComment(projectId, sha, note, options) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.post(this, "projects/".concat(pId, "/repository/commits/").concat(sha, "/comments"), (0, _objectSpread2.default)({
        note: note
      }, options));
    }
  }, {
    key: "diff",
    value: function diff(projectId, sha) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/repository/commits/").concat(sha, "/diff"));
    }
  }, {
    key: "show",
    value: function show(projectId, sha) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/repository/commits/").concat(sha));
    }
  }, {
    key: "statuses",
    value: function statuses(projectId, sha, options) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/repository/commits/").concat(sha, "/statuses"), options);
    }
  }]);
  return Commits;
}(_infrastructure.BaseService);

var _default = Commits;
exports.default = _default;