import { BaseService, RequestHelper } from '../infrastructure';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  NotificationSettingLevel,
  ProjectId,
  GroupId,
} from '../../types/types';

class NotificationSettings extends BaseService {
  all({
    projectId,
    groupId,
    ...options
  }: ({ projectId: ProjectId } | { groupId: GroupId }) & PaginatedRequestOptions) {
    let url = '';

    if (projectId) {
      url += `projects/${encodeURIComponent(projectId)}/`;
    } else if (groupId) {
      url += `groups/${encodeURIComponent(groupId)}/`;
    }

    return RequestHelper.get(this, `${url}notification_settings`, options);
  }

  edit({
    projectId,
    groupId,
    ...options
  }: { level?: NotificationSettingLevel } & ({ projectId: ProjectId } | { groupId: GroupId }) &
    BaseRequestOptions) {
    let url = '';

    if (projectId) {
      url += `projects/${encodeURIComponent(projectId)}/`;
    } else if (groupId) {
      url += `groups/${encodeURIComponent(groupId)}/`;
    }

    return RequestHelper.put(this, `${url}notification_settings`, options);
  }
}

export default NotificationSettings;
