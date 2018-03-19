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

var _ResourceMilestoneIssues = _interopRequireDefault(require("./ResourceMilestoneIssues"));

var _ResourceMilestoneMergeRequests = _interopRequireDefault(require("./ResourceMilestoneMergeRequests"));

var ResourceMilestones =
/*#__PURE__*/
function (_BaseModel) {
  (0, _inherits2.default)(ResourceMilestones, _BaseModel);

  function ResourceMilestones(resourceType) {
    var _ref;

    var _this;

    (0, _classCallCheck2.default)(this, ResourceMilestones);

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_ref = ResourceMilestones.__proto__ || (0, _getPrototypeOf.default)(ResourceMilestones)).call.apply(_ref, [this].concat(args)));
    _this.resourceType = resourceType;
    _this.issues = new (Function.prototype.bind.apply(_ResourceMilestoneIssues.default, [null].concat([resourceType], args)))();
    _this.mergeRequests = new (Function.prototype.bind.apply(_ResourceMilestoneMergeRequests.default, [null].concat([resourceType], args)))();
    return _this;
  }

  (0, _createClass2.default)(ResourceMilestones, [{
    key: "all",
    value: function all(resourceId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var rId = (0, _Utils.parse)(resourceId);
      return this.get("".concat(this.resourceType, "/").concat(rId, "/milestones"), options);
    }
  }, {
    key: "create",
    value: function create(resourceId, title, options) {
      var rId = (0, _Utils.parse)(resourceId);
      return this.post("".concat(this.resourceType, "/").concat(rId, "/milestones"), options);
    }
  }, {
    key: "edit",
    value: function edit(resourceId, milestoneId, options) {
      var _map = [resourceId, milestoneId].map(_Utils.parse),
          _map2 = (0, _slicedToArray2.default)(_map, 2),
          rId = _map2[0],
          mId = _map2[1];

      return this.put("".concat(this.resourceType, "/").concat(rId, "/milestones/").concat(mId), options);
    }
  }, {
    key: "show",
    value: function show(resourceId, milestoneId) {
      var _map3 = [resourceId, milestoneId].map(_Utils.parse),
          _map4 = (0, _slicedToArray2.default)(_map3, 2),
          rId = _map4[0],
          mId = _map4[1];

      return this.get("".concat(this.resourceType, "/").concat(rId, "/milestones/").concat(mId));
    }
  }]);
  return ResourceMilestones;
}(_BaseModel2.default);

var _default = ResourceMilestones;
exports.default = _default;