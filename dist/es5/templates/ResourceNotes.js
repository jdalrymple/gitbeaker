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

var ResourceNotes =
/*#__PURE__*/
function (_BaseService) {
  (0, _inherits2.default)(ResourceNotes, _BaseService);

  function ResourceNotes(resourceType, resource2Type) {
    var _ref;

    var _this;

    (0, _classCallCheck2.default)(this, ResourceNotes);

    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_ref = ResourceNotes.__proto__ || (0, _getPrototypeOf.default)(ResourceNotes)).call.apply(_ref, [this].concat(args)));
    _this.resourceType = resourceType;
    _this.resource2Type = resource2Type;
    return _this;
  }

  (0, _createClass2.default)(ResourceNotes, [{
    key: "all",
    value: function all(resourceId, resource2Id, options) {
      var _map = [resourceId, resource2Id].map(encodeURIComponent),
          _map2 = (0, _slicedToArray2.default)(_map, 2),
          rId = _map2[0],
          r2Id = _map2[1];

      return _infrastructure.RequestHelper.get(this, "".concat(this.resourceType, "/").concat(rId, "/").concat(this.resource2Type, "/").concat(r2Id, "/notes"), options);
    }
  }, {
    key: "create",
    value: function create(resourceId, resource2Id, options) {
      if (!options.body) throw new Error('Missing required property: body');

      var _map3 = [resourceId, resource2Id].map(encodeURIComponent),
          _map4 = (0, _slicedToArray2.default)(_map3, 2),
          rId = _map4[0],
          r2Id = _map4[1];

      return _infrastructure.RequestHelper.post(this, "".concat(this.resourceType, "/").concat(rId, "/").concat(this.resource2Type, "/").concat(r2Id, "/notes"), options);
    }
  }, {
    key: "edit",
    value: function edit(resourceId, resource2Id, noteId, options) {
      if (!options.body) throw new Error('Missing required property: body');

      var _map5 = [resourceId, resource2Id, noteId].map(encodeURIComponent),
          _map6 = (0, _slicedToArray2.default)(_map5, 3),
          rId = _map6[0],
          r2Id = _map6[1],
          nId = _map6[2];

      return _infrastructure.RequestHelper.put(this, "".concat(this.resourceType, "/").concat(rId, "/").concat(this.resource2Type, "/").concat(r2Id, "/notes/").concat(nId), options);
    }
  }, {
    key: "remove",
    value: function remove(resourceId, resource2Id, noteId) {
      var _map7 = [resourceId, resource2Id, noteId].map(encodeURIComponent),
          _map8 = (0, _slicedToArray2.default)(_map7, 3),
          rId = _map8[0],
          r2Id = _map8[1],
          nId = _map8[2];

      return _infrastructure.RequestHelper.delete(this, "".concat(this.resourceType, "/").concat(rId, "/").concat(this.resource2Type, "/").concat(r2Id, "/notes/").concat(nId));
    }
  }, {
    key: "show",
    value: function show(resourceId, resource2Id, noteId) {
      var _map9 = [resourceId, resource2Id, noteId].map(encodeURIComponent),
          _map10 = (0, _slicedToArray2.default)(_map9, 3),
          rId = _map10[0],
          r2Id = _map10[1],
          nId = _map10[2];

      return _infrastructure.RequestHelper.get(this, "".concat(this.resourceType, "/").concat(rId, "/").concat(this.resource2Type, "/").concat(r2Id, "/notes/").concat(nId));
    }
  }]);
  return ResourceNotes;
}(_infrastructure.BaseService);

var _default = ResourceNotes;
exports.default = _default;