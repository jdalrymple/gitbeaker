"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _entries = _interopRequireDefault(require("@babel/runtime/core-js/object/entries"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _assign = _interopRequireDefault(require("@babel/runtime/core-js/object/assign"));

function init() {
  for (var _len = arguments.length, services = new Array(_len), _key = 0; _key < _len; _key++) {
    services[_key] = arguments[_key];
  }

  var combined = _assign.default.apply(Object, [{}].concat(services));

  return function Namespace(options) {
    var _this = this;

    (0, _classCallCheck2.default)(this, Namespace);
    (0, _entries.default)(combined).forEach(function (_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
          name = _ref2[0],
          Service = _ref2[1];

      _this[name] = new Service(options);
    });
  };
}