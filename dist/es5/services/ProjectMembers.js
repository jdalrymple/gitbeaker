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

var ProjectMembers =
/*#__PURE__*/
function (_ResourceMembers) {
  (0, _inherits2.default)(ProjectMembers, _ResourceMembers);

  function ProjectMembers(options) {
    (0, _classCallCheck2.default)(this, ProjectMembers);
    return (0, _possibleConstructorReturn2.default)(this, (ProjectMembers.__proto__ || (0, _getPrototypeOf.default)(ProjectMembers)).call(this, 'projects', options));
  }

  return ProjectMembers;
}(_templates.ResourceMembers);

var _default = ProjectMembers;
exports.default = _default;