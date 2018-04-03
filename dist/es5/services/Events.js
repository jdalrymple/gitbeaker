"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateEventOptions = validateEventOptions;
exports.default = void 0;

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _infrastructure = require("../infrastructure");

var ACTION_TYPES = ['created', 'updated', 'closed', 'reopened', 'pushed', 'commented', 'merged', 'joined', 'left', 'destroyed', 'expired'];
var TARGET_TYPES = ['issue', 'milestone', 'merge_request', 'note', 'project', 'snippet', 'user'];

function validateEventOptions(action, target) {
  if (!ACTION_TYPES.includes(action)) {
    throw new Error("This action is not supported. Pleased use one of following options: ".concat(ACTION_TYPES));
  }

  if (!TARGET_TYPES.includes(target)) {
    throw new Error("This target is not supported. Pleased use one of following options: ".concat(TARGET_TYPES));
  }
}

var Events =
/*#__PURE__*/
function (_BaseService) {
  (0, _inherits2.default)(Events, _BaseService);

  function Events() {
    (0, _classCallCheck2.default)(this, Events);
    return (0, _possibleConstructorReturn2.default)(this, (Events.__proto__ || (0, _getPrototypeOf.default)(Events)).apply(this, arguments));
  }

  (0, _createClass2.default)(Events, [{
    key: "all",
    value: function all(options) {
      validateEventOptions(options.action, options.targetType);
      return _infrastructure.RequestHelper.get(this, 'events', options);
    }
  }]);
  return Events;
}(_infrastructure.BaseService);

var _default = Events;
exports.default = _default;