"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _templates = require("../templates");

var GroupVariables =
/*#__PURE__*/
function (_ResourceVariables) {
  (0, _inherits2.default)(GroupVariables, _ResourceVariables);

  function GroupVariables(options) {
    (0, _classCallCheck2.default)(this, GroupVariables);
    return (0, _possibleConstructorReturn2.default)(this, (GroupVariables.__proto__ || (0, _getPrototypeOf.default)(GroupVariables)).call(this, 'groups', options));
  }

  return GroupVariables;
}(_templates.ResourceVariables);

var _default = GroupVariables;
exports.default = _default;