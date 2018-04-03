"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateEventOptions = validateEventOptions;
exports.default = void 0;

var _infrastructure = require("../infrastructure");

const ACTION_TYPES = ['created', 'updated', 'closed', 'reopened', 'pushed', 'commented', 'merged', 'joined', 'left', 'destroyed', 'expired'];
const TARGET_TYPES = ['issue', 'milestone', 'merge_request', 'note', 'project', 'snippet', 'user'];

function validateEventOptions(action, target) {
  if (!ACTION_TYPES.includes(action)) {
    throw new Error(`This action is not supported. Pleased use one of following options: ${ACTION_TYPES}`);
  }

  if (!TARGET_TYPES.includes(target)) {
    throw new Error(`This target is not supported. Pleased use one of following options: ${TARGET_TYPES}`);
  }
}

class Events extends _infrastructure.BaseService {
  all(options) {
    validateEventOptions(options.action, options.targetType);
    return _infrastructure.RequestHelper.get(this, 'events', options);
  }

}

var _default = Events;
exports.default = _default;