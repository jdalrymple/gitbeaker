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

var ProtectedBranches =
/*#__PURE__*/
function (_BaseService) {
  (0, _inherits2.default)(ProtectedBranches, _BaseService);

  function ProtectedBranches() {
    (0, _classCallCheck2.default)(this, ProtectedBranches);
    return (0, _possibleConstructorReturn2.default)(this, (ProtectedBranches.__proto__ || (0, _getPrototypeOf.default)(ProtectedBranches)).apply(this, arguments));
  }

  (0, _createClass2.default)(ProtectedBranches, [{
    key: "all",
    value: function all(projectId, options) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/protected_branches"), options);
    }
  }, {
    key: "protect",
    value: function protect(projectId, branchName, options) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.post(this, "projects/".concat(pId, "/protected_branches"), (0, _objectSpread2.default)({
        name: branchName
      }, options));
    }
  }, {
    key: "show",
    value: function show(projectId, branchName) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/protected_branches/").concat(branchName));
    }
  }, {
    key: "unprotect",
    value: function unprotect(projectId, branchName) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.delete(this, "projects/".concat(pId, "/protected_branches/").concat(branchName));
    }
  }]);
  return ProtectedBranches;
}(_infrastructure.BaseService);

var _default = ProtectedBranches;
exports.default = _default;