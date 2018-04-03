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

var SystemHooks =
/*#__PURE__*/
function (_BaseService) {
  (0, _inherits2.default)(SystemHooks, _BaseService);

  function SystemHooks() {
    (0, _classCallCheck2.default)(this, SystemHooks);
    return (0, _possibleConstructorReturn2.default)(this, (SystemHooks.__proto__ || (0, _getPrototypeOf.default)(SystemHooks)).apply(this, arguments));
  }

  (0, _createClass2.default)(SystemHooks, [{
    key: "all",
    value: function all(options) {
      return _infrastructure.RequestHelper.get(this, 'hooks', options);
    }
  }, {
    key: "show",
    value: function show(hookId) {
      var hId = encodeURIComponent(hookId);
      return _infrastructure.RequestHelper.get(this, "hooks/".concat(hId));
    }
  }, {
    key: "add",
    value: function add(url, options) {
      return _infrastructure.RequestHelper.post(this, 'hooks', (0, _objectSpread2.default)({
        url: url
      }, options));
    }
  }, {
    key: "edit",
    value: function edit(hookId, url, options) {
      var hId = encodeURIComponent(hookId);
      return _infrastructure.RequestHelper.put(this, "hooks/".concat(hId), (0, _objectSpread2.default)({
        url: url
      }, options));
    }
  }, {
    key: "remove",
    value: function remove(projectId, hookId) {
      var hId = encodeURIComponent(hookId);
      return _infrastructure.RequestHelper.delete(this, "hooks/".concat(hId));
    }
  }]);
  return SystemHooks;
}(_infrastructure.BaseService);

var _default = SystemHooks;
exports.default = _default;