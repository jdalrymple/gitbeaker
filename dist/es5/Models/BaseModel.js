"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("babel-runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("babel-runtime/helpers/createClass"));

var _regenerator = _interopRequireDefault(require("babel-runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("babel-runtime/helpers/asyncToGenerator"));

var _parseLinkHeader = _interopRequireDefault(require("parse-link-header"));

var getAllPages = function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(client, endpoint, options) {
    var results,
        response,
        links,
        limit,
        moreResults,
        _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            results = _args.length > 3 && _args[3] !== undefined ? _args[3] : [];
            _context.next = 3;
            return client.get(endpoint, options, true);

          case 3:
            response = _context.sent;

            if (response.headers['x-page']) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", response.body);

          case 6:
            links = (0, _parseLinkHeader.default)(response.headers.link);
            limit = options.max_pages ? response.headers['x-page'] < options.max_pages : true;
            moreResults = results.concat(response.body);

            if (!(links.next && limit)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", getAllPages(client, links.next.url.replace(client.url, ''), options, moreResults));

          case 11:
            return _context.abrupt("return", moreResults);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getAllPages(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var BaseModel =
/*#__PURE__*/
function () {
  function BaseModel(APIClient) {
    (0, _classCallCheck2.default)(this, BaseModel);
    this.client = APIClient;
  }

  (0, _createClass2.default)(BaseModel, [{
    key: "get",
    value: function get(endpoint) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!options.page) {
        return getAllPages(this.client, endpoint, options);
      }

      return this.client.get(endpoint, options);
    }
  }, {
    key: "post",
    value: function post(endpoint) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.client.post(endpoint, options);
    }
  }, {
    key: "postForm",
    value: function postForm(endpoint) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.client.postForm(endpoint, options);
    }
  }, {
    key: "put",
    value: function put(endpoint) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.client.put(endpoint, options);
    }
  }, {
    key: "delete",
    value: function _delete(endpoint) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.client.delete(endpoint, options);
    }
  }]);
  return BaseModel;
}();

var _default = BaseModel;
exports.default = _default;