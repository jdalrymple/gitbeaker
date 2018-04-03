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

var GroupProjects =
/*#__PURE__*/
function (_BaseService) {
  (0, _inherits2.default)(GroupProjects, _BaseService);

  function GroupProjects() {
    (0, _classCallCheck2.default)(this, GroupProjects);
    return (0, _possibleConstructorReturn2.default)(this, (GroupProjects.__proto__ || (0, _getPrototypeOf.default)(GroupProjects)).apply(this, arguments));
  }

  (0, _createClass2.default)(GroupProjects, [{
    key: "all",
    value: function all(groupId, options) {
      var gId = encodeURIComponent(groupId);
      return _infrastructure.RequestHelper.get(this, "groups/".concat(gId, "/projects"), options);
    }
  }, {
    key: "add",
    value: function add(groupId, projectId) {
      var _map = [groupId, projectId].map(encodeURIComponent),
          _map2 = (0, _slicedToArray2.default)(_map, 2),
          gId = _map2[0],
          pId = _map2[1];

      return _infrastructure.RequestHelper.post(this, "groups/".concat(gId, "/projects/").concat(pId));
    }
  }]);
  return GroupProjects;
}(_infrastructure.BaseService);

var _default = GroupProjects;
exports.default = _default;