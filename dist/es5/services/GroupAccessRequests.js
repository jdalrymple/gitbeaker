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

var GroupAccessRequests =
/*#__PURE__*/
function (_ResourceAccessReques) {
  (0, _inherits2.default)(GroupAccessRequests, _ResourceAccessReques);

  function GroupAccessRequests(options) {
    (0, _classCallCheck2.default)(this, GroupAccessRequests);
    return (0, _possibleConstructorReturn2.default)(this, (GroupAccessRequests.__proto__ || (0, _getPrototypeOf.default)(GroupAccessRequests)).call(this, 'groups', options));
  }

  return GroupAccessRequests;
}(_templates.ResourceAccessRequests);

var _default = GroupAccessRequests;
exports.default = _default;