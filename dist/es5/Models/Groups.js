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

var _GroupProjects = _interopRequireDefault(require("./GroupProjects"));

var _ResourceAccessRequests = _interopRequireDefault(require("./ResourceAccessRequests"));

var _ResourceCustomAttributes = _interopRequireDefault(require("./ResourceCustomAttributes"));

var _ResourceMembers = _interopRequireDefault(require("./ResourceMembers"));

var _ResourceMilestones = _interopRequireDefault(require("./ResourceMilestones"));

var _Utils = require("../Utils");

var Groups =
/*#__PURE__*/
function (_BaseModel) {
  (0, _inherits2.default)(Groups, _BaseModel);

  function Groups() {
    var _ref;

    var _this;

    (0, _classCallCheck2.default)(this, Groups);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_ref = Groups.__proto__ || (0, _getPrototypeOf.default)(Groups)).call.apply(_ref, [this].concat(args)));
    _this.projects = new (Function.prototype.bind.apply(_GroupProjects.default, [null].concat(args)))();
    _this.accessRequests = new (Function.prototype.bind.apply(_ResourceAccessRequests.default, [null].concat(['groups'], args)))();
    _this.customAttributes = new (Function.prototype.bind.apply(_ResourceCustomAttributes.default, [null].concat(['groups'], args)))();
    _this.members = new (Function.prototype.bind.apply(_ResourceMembers.default, [null].concat(['groups'], args)))();
    _this.milestones = new (Function.prototype.bind.apply(_ResourceMilestones.default, [null].concat(['groups'], args)))();
    return _this;
  }

  (0, _createClass2.default)(Groups, [{
    key: "all",
    value: function all() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.get('groups', options);
    }
  }, {
    key: "allSubgroups",
    value: function allSubgroups(groupId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var gId = (0, _Utils.parse)(groupId);
      return this.get("groups/".concat(gId, "/subgroups"), options);
    }
  }, {
    key: "show",
    value: function show(groupId) {
      var gId = (0, _Utils.parse)(groupId);
      return this.get("groups/".concat(gId));
    }
  }, {
    key: "create",
    value: function create() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.post('groups', options);
    }
  }, {
    key: "remove",
    value: function remove(groupId) {
      var gId = (0, _Utils.parse)(groupId);
      return this.delete("groups/".concat(gId));
    }
  }, {
    key: "search",
    value: function search(nameOrPath) {
      return this.get('groups', {
        search: nameOrPath
      });
    }
  }]);
  return Groups;
}(_BaseModel2.default);

var _default = Groups;
exports.default = _default;