import { BaseService, RequestHelper } from '../infrastructure';
import { RequestOptions } from '../infrastructure/RequestHelper';

const ACTION_TYPES = {
  created: 'created',
  updated: 'updated',
  closed: 'closed',
  reopened: 'reopened',
  pushed: 'pushed',
  commented: 'commented',
  merged: 'merged',
  joined: 'joined',
  left: 'left',
  destroyed: 'destroyed',
  expired: 'expired',
};

const TARGET_TYPES = {
  issue: 'issue',
  milestone: 'milestone',
  merge_request: 'merge_request',
  note: 'note',
  project: 'project',
  snippet: 'snippet',
  user: 'user',
};

function assertEventOptions(
  action: keyof typeof ACTION_TYPES,
  target: keyof typeof TARGET_TYPES,
) {
  if (action && !(action in ACTION_TYPES)) {
    throw new Error(`This action is not supported. Pleased use one of following options: ${Object.keys(ACTION_TYPES)}`);
  }

  if (target && !(target in TARGET_TYPES)) {
    throw new Error(`This target is not supported. Pleased use one of following options: ${Object.keys(TARGET_TYPES)}`);
  }
}
export interface EventOptions {
  action: keyof typeof ACTION_TYPES;
  targetType: keyof typeof TARGET_TYPES;
}
class Events extends BaseService {
  all(options: RequestOptions & EventOptions) {
    assertEventOptions(options.action, options.targetType);

    return RequestHelper.get(this, 'events', options);
  }
}

export default Events;
export { assertEventOptions };
