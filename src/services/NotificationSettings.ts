import { BaseService, RequestHelper } from '../infrastructure';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

const LEVELS = {
  DISABLED: 'disabled',
  PARTICIPATING: 'participating',
  WATCH: 'watch',
  GLOBAL: 'global',
  MENTION: 'mention',
  CUSTOM: 'custom',
};

const EVENTS = {
  NEW_NOTE: 'new_note',
  NEW_ISSUE: 'new_issue',
  REOPEM_ISSUE: 'reopen_issue',
  CLOSE_ISSUE: 'close_issue',
  REASSIGN_ISSUE: 'reassign_issue',
  NEW_MERGE_REQUESTS: 'new_merge_request',
  PUSH_TO_MERGE_REQUEST: 'push_to_merge_request',
  REOPEN_MERGE_REQUESTS: 'reopen_merge_request',
  CLOSE_MERGE_REQUEST: 'close_merge_request',
  REASSIGN_MERGE_REQUEST: 'reassign_merge_request',
  MERGE_MERGE_REQUEST: 'merge_merge_request',
  FAILED_PIPELINE: 'failed_pipeline',
  SUCCESS_PIPELINE: 'success_pipeline',
};
interface NotificationSettingsOptions {
  projectId?: string;
  groupId?: string;
}
class NotificationSettings extends BaseService {
  protected LEVELS: typeof LEVELS;
  protected EVENTS: typeof EVENTS;
  constructor(baseParams: BaseModelContructorOptions) {
    super(baseParams);

    this.LEVELS = LEVELS;
    this.EVENTS = EVENTS;
  }

  all({ projectId, groupId }: NotificationSettingsOptions = {}) {
    let url;

    if (projectId) {
      url += `projects/${encodeURIComponent(projectId)}/`;
    } else if (groupId) {
      url += `groups/${encodeURIComponent(groupId)}/`;
    }

    return RequestHelper.get(this, `${url}notification_settings`);
  }

  edit(options, { projectId, groupId }: NotificationSettingsOptions = {}) {
    let url;

    if (projectId) {
      url += `projects/${encodeURIComponent(projectId)}/`;
    } else if (groupId) {
      url += `groups/${encodeURIComponent(groupId)}/`;
    }

    return RequestHelper.put(this, `${url}notification_settings`, options);
  }
}

export default NotificationSettings;
