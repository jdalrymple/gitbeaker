"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("babel-runtime/helpers/slicedToArray"));

var _assign = _interopRequireDefault(require("babel-runtime/core-js/object/assign"));

var _getPrototypeOf = _interopRequireDefault(require("babel-runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("babel-runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("babel-runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("babel-runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("babel-runtime/helpers/inherits"));

var _BaseModel2 = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

var ProjectLabels =
/*#__PURE__*/
function (_BaseModel) {
  (0, _inherits2.default)(ProjectLabels, _BaseModel);

  function ProjectLabels() {
    (0, _classCallCheck2.default)(this, ProjectLabels);
    return (0, _possibleConstructorReturn2.default)(this, (ProjectLabels.__proto__ || (0, _getPrototypeOf.default)(ProjectLabels)).apply(this, arguments));
  }

  (0, _createClass2.default)(ProjectLabels, [{
    key: "all",
    value: function all(projectId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var pId = (0, _Utils.parse)(projectId);
      return this.get("projects/".concat(pId, "/labels"), options);
    }
  }, {
    key: "create",
    value: function create(projectId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var pId = (0, _Utils.parse)(projectId);
      return this.post("projects/".concat(pId, "/labels"), options);
    }
  }, {
    key: "edit",
    value: function edit(projectId, labelName) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var pId = (0, _Utils.parse)(projectId);
      return this.put("projects/".concat(pId, "/labels"), (0, _assign.default)({
        name: labelName
      }, options));
    }
  }, {
    key: "remove",
    value: function remove(projectId, labelName) {
      var pId = (0, _Utils.parse)(projectId);
      return this.delete("projects/".concat(pId, "/labels"), {
        name: labelName
      });
    }
  }, {
    key: "subscribe",
    value: function subscribe(projectId, labelId) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var _map = [projectId, labelId].map(_Utils.parse),
          _map2 = (0, _slicedToArray2.default)(_map, 2),
          pId = _map2[0],
          lId = _map2[1];

      return this.post("projects/".concat(pId, "/issues/").concat(lId, "/subscribe"), options);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(projectId, labelId) {
      var _map3 = [projectId, labelId].map(_Utils.parse),
          _map4 = (0, _slicedToArray2.default)(_map3, 2),
          pId = _map4[0],
          lId = _map4[1];

      return this.delete("projects/".concat(pId, "/issues/").concat(lId, "/unsubscribe"));
    }
  }]);
  return ProjectLabels;
}(_BaseModel2.default);

var _default = ProjectLabels;
exports.default = _default;