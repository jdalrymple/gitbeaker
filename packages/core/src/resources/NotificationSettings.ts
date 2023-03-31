import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestOptions,
  EitherOrNone,
  GitlabAPIResponse,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export type NotificationSettingLevel =
  | 'disabled'
  | 'participating'
  | 'watch'
  | 'global'
  | 'mention'
  | 'custom';

export type CustomSettingLevelEmailEvents =
  | 'new_note'
  | 'new_issue'
  | 'reopen_issue'
  | 'close_issue'
  | 'reassign_issue'
  | 'issue_due'
  | 'new_merge_request'
  | 'push_to_merge_request'
  | 'reopen_merge_request'
  | 'close_merge_request'
  | 'reassign_merge_request'
  | 'merge_merge_request'
  | 'failed_pipeline'
  | 'fixed_pipeline'
  | 'success_pipeline'
  | 'moved_project'
  | 'merge_when_pipeline_succeeds'
  | 'new_epic ';

export interface NotificationSettingSchema extends Record<string, unknown> {
  level: NotificationSettingLevel;
  notification_email: string;
}

function url({
  projectId,
  groupId,
}: { projectId?: string | number; groupId?: string | number } = {}): string {
  let prefix = '';

  if (projectId) prefix = endpoint`projects/${projectId}/`;
  if (groupId) prefix = endpoint`groups/${groupId}/`;

  return `${prefix}notification_settings`;
}

export class NotificationSettings<C extends boolean = false> extends BaseResource<C> {
  edit<E extends boolean = false>({
    groupId,
    projectId,
    ...options
  }: EitherOrNone<{ projectId: string | number }, { groupId: string | number }> &
    BaseRequestOptions<E> = {}): Promise<GitlabAPIResponse<NotificationSettingSchema, C, E, void>> {
    const uri = url({ groupId, projectId });

    return RequestHelper.put<NotificationSettingSchema>()(this, uri, options);
  }

  show<E extends boolean = false>({
    groupId,
    projectId,
    ...options
  }: EitherOrNone<{ projectId: string | number }, { groupId: string | number }> &
    Sudo &
    ShowExpanded<E> = {}): Promise<GitlabAPIResponse<NotificationSettingSchema, C, E, void>> {
    const uri = url({ groupId, projectId });

    return RequestHelper.get<NotificationSettingSchema>()(this, uri, options);
  }
}
