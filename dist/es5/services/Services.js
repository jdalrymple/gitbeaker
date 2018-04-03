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

var Services =
/*#__PURE__*/
function (_BaseService) {
  (0, _inherits2.default)(Services, _BaseService);

  function Services() {
    (0, _classCallCheck2.default)(this, Services);
    return (0, _possibleConstructorReturn2.default)(this, (Services.__proto__ || (0, _getPrototypeOf.default)(Services)).apply(this, arguments));
  }

  (0, _createClass2.default)(Services, [{
    key: "edit",
    value: function edit(projectId, serviceName, options) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.put(this, "projects/".concat(pId, "/services/").concat(serviceName), options);
    }
  }, {
    key: "remove",
    value: function remove(projectId, serviceName) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.delete(this, "projects/".concat(pId, "/services/").concat(serviceName));
    }
  }, {
    key: "show",
    value: function show(projectId, serviceName) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/services/").concat(serviceName));
    }
  }]);
  return Services;
}(_infrastructure.BaseService);

var _default = Services;
exports.default = _default;