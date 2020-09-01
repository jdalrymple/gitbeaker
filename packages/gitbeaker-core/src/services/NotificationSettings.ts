import { BaseService } from '@gitbeaker/requester-utils';
import { BaseRequestOptions, PaginatedRequestOptions, RequestHelper } from '../infrastructure';

type NotificationSettingLevel =
  | 'disabled'
  | 'participating'
  | 'watch'
  | 'global'
  | 'mention'
  | 'custom';

type ProjectOrGroup = { projectId?: string | number } | { groupId?: string | number };

function url({ projectId, groupId }) {
  let uri = '';

  if (projectId) {
    uri += `projects/${encodeURIComponent(projectId)}/`;
  } else if (groupId) {
    uri += `groups/${encodeURIComponent(groupId)}/`;
  }

  return `${uri}notification_settings`;
}

export class NotificationSettings extends BaseService {
  all({ projectId, groupId, ...options }: ProjectOrGroup & PaginatedRequestOptions = {}) {
    return RequestHelper.get(this, url({ groupId, projectId }), options);
  }

  edit({
    projectId,
    groupId,
    ...options
  }: { level?: NotificationSettingLevel } & ProjectOrGroup & BaseRequestOptions = {}) {
    return RequestHelper.put(this, url({ groupId, projectId }), options);
  }
}
