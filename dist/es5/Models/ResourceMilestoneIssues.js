"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("babel-runtime/helpers/slicedToArray"));

var _getPrototypeOf = _interopRequireDefault(require("babel-runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("babel-runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("babel-runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("babel-runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("babel-runtime/helpers/inherits"));

var _BaseModel2 = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

var GroupMilestoneIssues =
/*#__PURE__*/
function (_BaseModel) {
  (0, _inherits2.default)(GroupMilestoneIssues, _BaseModel);

  function GroupMilestoneIssues(resourceType) {
    var _ref;

    var _this;

    (0, _classCallCheck2.default)(this, GroupMilestoneIssues);

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_ref = GroupMilestoneIssues.__proto__ || (0, _getPrototypeOf.default)(GroupMilestoneIssues)).call.apply(_ref, [this].concat(args)));
    _this.resourceType = resourceType;
    return _this;
  }

  (0, _createClass2.default)(GroupMilestoneIssues, [{
    key: "all",
    value: function all(resourceId, milestoneId) {
      var _map = [resourceId, milestoneId].map(_Utils.parse),
          _map2 = (0, _slicedToArray2.default)(_map, 2),
          rId = _map2[0],
          mId = _map2[1];

      return this.get("".concat(this.resourceType, "/").concat(rId, "/milestones/").concat(mId, "/issues"));
    }
  }]);
  return GroupMilestoneIssues;
}(_BaseModel2.default);

var _default = GroupMilestoneIssues;
exports.default = _default;