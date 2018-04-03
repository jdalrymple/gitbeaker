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

var Branches =
/*#__PURE__*/
function (_BaseService) {
  (0, _inherits2.default)(Branches, _BaseService);

  function Branches() {
    (0, _classCallCheck2.default)(this, Branches);
    return (0, _possibleConstructorReturn2.default)(this, (Branches.__proto__ || (0, _getPrototypeOf.default)(Branches)).apply(this, arguments));
  }

  (0, _createClass2.default)(Branches, [{
    key: "all",
    value: function all(projectId, options) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/repository/branches"), options);
    }
  }, {
    key: "create",
    value: function create(projectId, branchName, ref) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.post(this, "projects/".concat(pId, "/repository/branches"), {
        branch: branchName,
        ref: ref
      });
    }
  }, {
    key: "protect",
    value: function protect(projectId, branchName, options) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.put(this, "projects/".concat(pId, "/repository/branches/").concat(branchName, "/protect"), options);
    }
  }, {
    key: "remove",
    value: function remove(projectId, branchName) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.delete(this, "projects/".concat(pId, "/repository/branches/").concat(branchName));
    }
  }, {
    key: "show",
    value: function show(projectId, branchName) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/repository/branches/").concat(branchName));
    }
  }, {
    key: "unprotect",
    value: function unprotect(projectId, branchName) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.put(this, "projects/".concat(pId, "/repository/branches/").concat(branchName, "/unprotect"));
    }
  }]);
  return Branches;
}(_infrastructure.BaseService);

var _default = Branches;
exports.default = _default;