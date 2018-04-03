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

var ProjectAccessRequests =
/*#__PURE__*/
function (_ResourceAccessReques) {
  (0, _inherits2.default)(ProjectAccessRequests, _ResourceAccessReques);

  function ProjectAccessRequests(options) {
    (0, _classCallCheck2.default)(this, ProjectAccessRequests);
    return (0, _possibleConstructorReturn2.default)(this, (ProjectAccessRequests.__proto__ || (0, _getPrototypeOf.default)(ProjectAccessRequests)).call(this, 'projects', options));
  }

  return ProjectAccessRequests;
}(_templates.ResourceAccessRequests);

var _default = ProjectAccessRequests;
exports.default = _default;