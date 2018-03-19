"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getPrototypeOf = _interopRequireDefault(require("babel-runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("babel-runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("babel-runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("babel-runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("babel-runtime/helpers/inherits"));

var _BaseModel2 = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

var Runners =
/*#__PURE__*/
function (_BaseModel) {
  (0, _inherits2.default)(Runners, _BaseModel);

  function Runners() {
    (0, _classCallCheck2.default)(this, Runners);
    return (0, _possibleConstructorReturn2.default)(this, (Runners.__proto__ || (0, _getPrototypeOf.default)(Runners)).apply(this, arguments));
  }

  (0, _createClass2.default)(Runners, [{
    key: "all",
    value: function all() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.get('runners/all', options);
    }
  }, {
    key: "allOwned",
    value: function allOwned() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.get('runners', options);
    }
  }, {
    key: "edit",
    value: function edit(runnerId, attributes) {
      var rId = (0, _Utils.parse)(runnerId);
      return this.put("runners/".concat(rId), attributes);
    }
  }, {
    key: "remove",
    value: function remove(runnerId) {
      var rId = (0, _Utils.parse)(runnerId);
      return this.delete("runners/".concat(rId));
    }
  }, {
    key: "show",
    value: function show(runnerId) {
      var rId = (0, _Utils.parse)(runnerId);
      return this.get("runners/".concat(rId));
    }
  }, {
    key: "showJobs",
    value: function showJobs(runnerId) {
      var rId = (0, _Utils.parse)(runnerId);
      return this.get("runners/".concat(rId, "/jobs"));
    }
  }]);
  return Runners;
}(_BaseModel2.default);

var _default = Runners;
exports.default = _default;