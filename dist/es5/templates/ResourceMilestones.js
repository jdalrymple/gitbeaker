"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _infrastructure = require("../infrastructure");

var ResourceMilestones =
/*#__PURE__*/
function (_BaseService) {
  (0, _inherits2.default)(ResourceMilestones, _BaseService);

  function ResourceMilestones(resourceType) {
    var _ref;

    var _this;

    (0, _classCallCheck2.default)(this, ResourceMilestones);

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_ref = ResourceMilestones.__proto__ || (0, _getPrototypeOf.default)(ResourceMilestones)).call.apply(_ref, [this].concat(args)));
    _this.resourceType = resourceType;
    return _this;
  }

  (0, _createClass2.default)(ResourceMilestones, [{
    key: "all",
    value: function all(resourceId, options) {
      var rId = encodeURIComponent(resourceId);
      return _infrastructure.RequestHelper.get(this, "".concat(this.resourceType, "/").concat(rId, "/milestones"), options);
    }
  }, {
    key: "create",
    value: function create(resourceId, title, options) {
      var rId = encodeURIComponent(resourceId);
      return _infrastructure.RequestHelper.post(this, "".concat(this.resourceType, "/").concat(rId, "/milestones"), options);
    }
  }, {
    key: "edit",
    value: function edit(resourceId, milestoneId, options) {
      var _map = [resourceId, milestoneId].map(encodeURIComponent),
          _map2 = (0, _slicedToArray2.default)(_map, 2),
          rId = _map2[0],
          mId = _map2[1];

      return _infrastructure.RequestHelper.put(this, "".concat(this.resourceType, "/").concat(rId, "/milestones/").concat(mId), options);
    }
  }, {
    key: "issues",
    value: function issues(resourceId, milestoneId) {
      var _map3 = [resourceId, milestoneId].map(encodeURIComponent),
          _map4 = (0, _slicedToArray2.default)(_map3, 2),
          rId = _map4[0],
          mId = _map4[1];

      return _infrastructure.RequestHelper.get(this, "".concat(this.resourceType, "/").concat(rId, "/milestones/").concat(mId, "/issues"));
    }
  }, {
    key: "mergeRequests",
    value: function mergeRequests(resourceId, milestoneId) {
      var _map5 = [resourceId, milestoneId].map(encodeURIComponent),
          _map6 = (0, _slicedToArray2.default)(_map5, 2),
          rId = _map6[0],
          mId = _map6[1];

      return _infrastructure.RequestHelper.get(this, "".concat(this.resourceType, "/").concat(rId, "/milestones/").concat(mId, "/merge_requests"));
    }
  }, {
    key: "show",
    value: function show(resourceId, milestoneId) {
      var _map7 = [resourceId, milestoneId].map(encodeURIComponent),
          _map8 = (0, _slicedToArray2.default)(_map7, 2),
          rId = _map8[0],
          mId = _map8[1];

      return _infrastructure.RequestHelper.get(this, "".concat(this.resourceType, "/").concat(rId, "/milestones/").concat(mId));
    }
  }]);
  return ResourceMilestones;
}(_infrastructure.BaseService);

var _default = ResourceMilestones;
exports.default = _default;