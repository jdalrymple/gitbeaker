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

var ProjectMilestones =
/*#__PURE__*/
function (_ResourceMilestones) {
  (0, _inherits2.default)(ProjectMilestones, _ResourceMilestones);

  function ProjectMilestones(options) {
    (0, _classCallCheck2.default)(this, ProjectMilestones);
    return (0, _possibleConstructorReturn2.default)(this, (ProjectMilestones.__proto__ || (0, _getPrototypeOf.default)(ProjectMilestones)).call(this, 'projects', options));
  }

  return ProjectMilestones;
}(_templates.ResourceMilestones);

var _default = ProjectMilestones;
exports.default = _default;