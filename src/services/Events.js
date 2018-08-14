import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

const ACTION_TYPES = [
  'created',
  'updated',
  'closed',
  'reopened',
  'pushed',
  'commented',
  'merged',
  'joined',
  'left',
  'destroyed',
  'expired',
];

const TARGET_TYPES = [
  'issue',
  'milestone',
  'merge_request',
  'note',
  'project',
  'snippet',
  'user',
];

function validateEventOptions(action, target) {
  if (action && !ACTION_TYPES.includes(action)) {
    throw new Error(`This action is not supported. Pleased use one of following options: ${ACTION_TYPES}`);
  }

  if (target && !TARGET_TYPES.includes(target)) {
    throw new Error(`This target is not supported. Pleased use one of following options: ${TARGET_TYPES}`);
  }
}
@cls()
class Events extends BaseService {
  @api({ options: true, method: 'GET' })
  all(options) {
    validateEventOptions(options.action, options.targetType);

    return RequestHelper.get(this, 'events', options);
  }
}

export default Events;
export { validateEventOptions };
