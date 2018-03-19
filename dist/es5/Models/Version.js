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

var Version =
/*#__PURE__*/
function (_BaseModel) {
  (0, _inherits2.default)(Version, _BaseModel);

  function Version() {
    (0, _classCallCheck2.default)(this, Version);
    return (0, _possibleConstructorReturn2.default)(this, (Version.__proto__ || (0, _getPrototypeOf.default)(Version)).apply(this, arguments));
  }

  (0, _createClass2.default)(Version, [{
    key: "show",
    value: function show() {
      return this.get('version');
    }
  }]);
  return Version;
}(_BaseModel2.default);

var _default = Version;
exports.default = _default;