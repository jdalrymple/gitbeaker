"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _infrastructure = require("../infrastructure");

var Issues =
/*#__PURE__*/
function (_BaseService) {
  (0, _inherits2.default)(Issues, _BaseService);

  function Issues() {
    (0, _classCallCheck2.default)(this, Issues);
    return (0, _possibleConstructorReturn2.default)(this, (Issues.__proto__ || (0, _getPrototypeOf.default)(Issues)).apply(this, arguments));
  }

  (0, _createClass2.default)(Issues, [{
    key: "all",
    value: function all(_ref) {
      var projectId = _ref.projectId,
          options = (0, _objectWithoutProperties2.default)(_ref, ["projectId"]);
      var url = projectId ? "projects/".concat(encodeURIComponent(projectId), "/issues") : 'issues';
      return _infrastructure.RequestHelper.get(this, url, options);
    }
  }, {
    key: "create",
    value: function create(projectId, options) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.post(this, "projects/".concat(pId, "/issues"), options);
    }
  }, {
    key: "edit",
    value: function edit(projectId, issueId, options) {
      var _map = [projectId, issueId].map(encodeURIComponent),
          _map2 = (0, _slicedToArray2.default)(_map, 2),
          pId = _map2[0],
          iId = _map2[1];

      return _infrastructure.RequestHelper.put(this, "projects/".concat(pId, "/issues/").concat(iId), options);
    }
  }, {
    key: "link",
    value: function link(projectId, issueIId, targetProjectId, targetIssueId) {
      var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

      var _map3 = [projectId, issueIId].map(encodeURIComponent),
          _map4 = (0, _slicedToArray2.default)(_map3, 2),
          pId = _map4[0],
          iId = _map4[1];

      var _map5 = [targetProjectId, targetIssueId].map(encodeURIComponent),
          _map6 = (0, _slicedToArray2.default)(_map5, 2),
          targetpId = _map6[0],
          targetIId = _map6[1];

      return _infrastructure.RequestHelper.post(this, "projects/".concat(pId, "/issues/").concat(iId, "/links"), (0, _objectSpread2.default)({
        targetProjectId: targetpId,
        targetIssueId: targetIId
      }, options));
    }
  }, {
    key: "remove",
    value: function remove(projectId, issueId) {
      var _map7 = [projectId, issueId].map(encodeURIComponent),
          _map8 = (0, _slicedToArray2.default)(_map7, 2),
          pId = _map8[0],
          iId = _map8[1];

      return _infrastructure.RequestHelper.delete(this, "projects/".concat(pId, "/issues/").concat(iId));
    }
  }, {
    key: "show",
    value: function show(projectId, issueId) {
      var _map9 = [projectId, issueId].map(encodeURIComponent),
          _map10 = (0, _slicedToArray2.default)(_map9, 2),
          pId = _map10[0],
          iId = _map10[1];

      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/issues/").concat(iId));
    }
  }, {
    key: "subscribe",
    value: function subscribe(projectId, issueId, options) {
      var _map11 = [projectId, issueId].map(encodeURIComponent),
          _map12 = (0, _slicedToArray2.default)(_map11, 2),
          pId = _map12[0],
          iId = _map12[1];

      return _infrastructure.RequestHelper.post(this, "projects/".concat(pId, "/issues/").concat(iId, "/subscribe"), options);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(projectId, issueId) {
      var _map13 = [projectId, issueId].map(encodeURIComponent),
          _map14 = (0, _slicedToArray2.default)(_map13, 2),
          pId = _map14[0],
          iId = _map14[1];

      return _infrastructure.RequestHelper.delete(this, "projects/".concat(pId, "/issues/").concat(iId, "/unsubscribe"));
    }
  }]);
  return Issues;
}(_infrastructure.BaseService);

var _default = Issues;
exports.default = _default;