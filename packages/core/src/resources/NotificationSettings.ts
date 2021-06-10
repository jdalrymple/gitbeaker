import { BaseResource } from '@gitbeaker/requester-utils';
import { BaseRequestOptions, PaginatedRequestOptions, RequestHelper } from '../infrastructure';

// TODO: Add missing functions

export type NotificationSettingLevel =
  | 'disabled'
  | 'participating'
  | 'watch'
  | 'global'
  | 'mention'
  | 'custom';

export interface NotificationSettingSchema extends Record<string, unknown> {
  level: NotificationSettingLevel;
  notification_email: string;
}

function url({ projectId, groupId }) {
  let uri = '';

  if (projectId) {
    uri += `projects/${encodeURIComponent(projectId)}/`;
  } else if (groupId) {
    uri += `groups/${encodeURIComponent(groupId)}/`;
  }

  return `${uri}notification_settings`;
}

export class NotificationSettings<C extends boolean = false> extends BaseResource<C> {
  all({
    projectId,
    groupId,
    ...options
  }: ({ projectId?: string | number } | { groupId?: string | number }) &
    PaginatedRequestOptions = {}) {
    return RequestHelper.get<NotificationSettingSchema[]>()(
      this,
      url({ groupId, projectId }),
      options,
    );
  }

  edit({
    projectId,
    groupId,
    ...options
  }: { level?: NotificationSettingLevel } & (
    | { projectId?: string | number }
    | { groupId?: string | number }
  ) &
    BaseRequestOptions = {}) {
    return RequestHelper.put<NotificationSettingSchema>()(
      this,
      url({ groupId, projectId }),
      options,
    );
  }
}
