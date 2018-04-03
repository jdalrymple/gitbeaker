"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _infrastructure = require("../infrastructure");

var Repositories =
/*#__PURE__*/
function (_BaseService) {
  (0, _inherits2.default)(Repositories, _BaseService);

  function Repositories() {
    (0, _classCallCheck2.default)(this, Repositories);
    return (0, _possibleConstructorReturn2.default)(this, (Repositories.__proto__ || (0, _getPrototypeOf.default)(Repositories)).apply(this, arguments));
  }

  (0, _createClass2.default)(Repositories, [{
    key: "compare",
    value: function compare(projectId, from, to) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/repository/compare"), {
        from: from,
        to: to
      });
    }
  }, {
    key: "contributors",
    value: function contributors(projectId) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/repository/contributors"));
    }
  }, {
    key: "showArchive",
    value: function showArchive(projectId, _ref) {
      var sha = _ref.sha;
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/repository/archive"), {
        sha: sha
      });
    }
  }, {
    key: "showBlob",
    value: function showBlob(projectId, sha) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/repository/blobs/").concat(sha));
    }
  }, {
    key: "showBlobRaw",
    value: function showBlobRaw(projectId, sha) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/repository/blobs/").concat(sha, "/raw"));
    }
  }, {
    key: "tree",
    value: function tree(projectId, options) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/repository/tree"), options);
    }
  }]);
  return Repositories;
}(_infrastructure.BaseService);

var _default = Repositories;
exports.default = _default;