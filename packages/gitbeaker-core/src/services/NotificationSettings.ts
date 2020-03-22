import { formatQuery } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  BaseService,
  PaginatedRequestOptions,
  RequestHelper,
} from '../infrastructure';

type NotificationSettingLevel =
  | 'disabled'
  | 'participating'
  | 'watch'
  | 'global'
  | 'mention'
  | 'custom';

type ProjectOrGroup = { projectId: string | number } | { groupId: string | number } | {};

export class NotificationSettings extends BaseService {
  all({ projectId, groupId, sudo, ...query }: ProjectOrGroup & PaginatedRequestOptions = {}) {
    const q = formatQuery(query);
    let url = '';

    if (projectId) {
      url += `projects/${encodeURIComponent(projectId)}/`;
    } else if (groupId) {
      url += `groups/${encodeURIComponent(groupId)}/`;
    }

    return RequestHelper.get(this, `${url}notification_settings?${q}`, { sudo });
  }

  edit({
    projectId,
    groupId,
    sudo,
    ...query
  }: { level?: NotificationSettingLevel } & ProjectOrGroup & BaseRequestOptions = {}) {
    const q = formatQuery(query);
    let url = '';

    if (projectId) {
      url += `projects/${encodeURIComponent(projectId)}/`;
    } else if (groupId) {
      url += `groups/${encodeURIComponent(groupId)}/`;
    }

    return RequestHelper.put(this, `${url}notification_settings?${q}`, { sudo });
  }
}
