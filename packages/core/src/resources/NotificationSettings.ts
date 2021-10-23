import { BaseResource } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  endpoint,
  PaginatedRequestOptions,
  RequestHelper,
} from '../infrastructure';

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

interface ScopedURLOptions {
  projectId?: string | number;
  groupId?: string | number;
}

function url({ projectId, groupId }: ScopedURLOptions) {
  let uri: string;

  if (projectId) {
    uri = endpoint`projects/${projectId}/`;
  } else if (groupId) {
    uri = endpoint`groups/${groupId}/`;
  } else {
    uri = '';
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
      url({ groupId, projectId } as ScopedURLOptions),
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
      url({ groupId, projectId } as ScopedURLOptions),
      options,
    );
  }
}
