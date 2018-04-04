"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _humps = _interopRequireDefault(require("humps"));

var _parseLinkHeader = _interopRequireDefault(require("parse-link-header"));

var _qs = _interopRequireDefault(require("qs"));

var _urlJoin = _interopRequireDefault(require("url-join"));

function defaultRequest(_ref, endpoint, _ref2) {
  var url = _ref.url,
      useXMLHttpRequest = _ref.useXMLHttpRequest;
  var headers = _ref2.headers,
      body = _ref2.body,
      qs = _ref2.qs,
      formData = _ref2.formData,
      _ref2$resolveWithFull = _ref2.resolveWithFullResponse,
      resolveWithFullResponse = _ref2$resolveWithFull === void 0 ? false : _ref2$resolveWithFull;
  var params = {
    url: (0, _urlJoin.default)(url, endpoint),
    headers: headers,
    json: true
  };
  if (body) params.body = _humps.default.decamelizeKeys(body);

  if (qs) {
    if (useXMLHttpRequest) {
      // The xhr package doesn't have a way of passing in a qs object until v3
      params.url = (0, _urlJoin.default)(params.url, "?".concat(_qs.default.stringify(qs)));
    } else params.qs = _humps.default.decamelizeKeys(qs);
  }

  if (formData) params.formData = formData;
  params.resolveWithFullResponse = resolveWithFullResponse;
  return params;
}

var RequestHelper =
/*#__PURE__*/
function () {
  function RequestHelper() {
    (0, _classCallCheck2.default)(this, RequestHelper);
  }

  (0, _createClass2.default)(RequestHelper, null, [{
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(service, endpoint) {
        var options,
            response,
            links,
            page,
            limit,
            more,
            _args = arguments;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
                _context.next = 3;
                return service.requester.get(defaultRequest(service, endpoint, {
                  headers: service.headers,
                  qs: options,
                  resolveWithFullResponse: true
                }));

              case 3:
                response = _context.sent;
                links = (0, _parseLinkHeader.default)(response.headers.link);
                page = response.headers['x-page'];
                limit = options.maxPages ? page < options.maxPages : true;
                more = [];

                if (!(page && limit && links.next)) {
                  _context.next = 13;
                  break;
                }

                _context.next = 11;
                return RequestHelper.get(service, links.next.url.replace(service.url, ''), options);

              case 11:
                more = _context.sent;
                return _context.abrupt("return", (0, _toConsumableArray2.default)(response.body).concat((0, _toConsumableArray2.default)(more)));

              case 13:
                return _context.abrupt("return", response.body);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function get(_x, _x2) {
        return _get.apply(this, arguments);
      };
    }()
  }, {
    key: "post",
    value: function () {
      var _post = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(service, endpoint) {
        var options,
            form,
            body,
            response,
            _args2 = arguments;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                options = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
                form = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : false;
                body = form ? 'fromData' : 'body';
                _context2.next = 5;
                return service.requester.post(defaultRequest(service, endpoint, (0, _defineProperty2.default)({
                  headers: service.headers
                }, body, options)));

              case 5:
                response = _context2.sent;
                return _context2.abrupt("return", response.body);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function post(_x3, _x4) {
        return _post.apply(this, arguments);
      };
    }()
  }, {
    key: "put",
    value: function () {
      var _put = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(service, endpoint) {
        var options,
            response,
            _args3 = arguments;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                options = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};
                _context3.next = 3;
                return service.requester.put(defaultRequest(service, endpoint, {
                  headers: service.headers,
                  body: options
                }));

              case 3:
                response = _context3.sent;
                return _context3.abrupt("return", response.body);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function put(_x5, _x6) {
        return _put.apply(this, arguments);
      };
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4(service, endpoint) {
        var options,
            response,
            _args4 = arguments;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                options = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
                _context4.next = 3;
                return service.requester.delete(defaultRequest(service, endpoint, {
                  headers: service.headers,
                  qs: options
                }));

              case 3:
                response = _context4.sent;
                return _context4.abrupt("return", response.body);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function _delete(_x7, _x8) {
        return _delete2.apply(this, arguments);
      };
    }()
  }]);
  return RequestHelper;
}();

var _default = RequestHelper;
exports.default = _default;