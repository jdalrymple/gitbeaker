import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, OneOrNoneOf, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper, ensureRequiredParams, getPrefixedUrl } from '../infrastructure';

export type NotificationSettingLevel =
  | 'disabled'
  | 'participating'
  | 'watch'
  | 'global'
  | 'mention'
  | 'custom';

export type CustomSettingLevelEmailEvents =
  | 'approver'
  | 'change_reviewer_merge_request'
  | 'close_issue'
  | 'close_merge_request'
  | 'failed_pipeline'
  | 'fixed_pipeline'
  | 'issue_due'
  | 'merge_merge_request'
  | 'merge_when_pipeline_succeeds'
  | 'moved_project'
  | 'new_epic'
  | 'new_issue'
  | 'new_merge_request'
  | 'new_note'
  | 'new_release'
  | 'push_to_merge_request'
  | 'reassign_issue'
  | 'reassign_merge_request'
  | 'reopen_issue'
  | 'reopen_merge_request'
  | 'success_pipeline';

export interface NotificationSettingSchema extends Record<string, unknown> {
  level: NotificationSettingLevel;
  notification_email?: string;
  events?: Record<CustomSettingLevelEmailEvents, boolean | null>;
}

export type EditNotificationSettingsOptions = {
  level?: NotificationSettingLevel;
  notificationEmail?: string;
  approver?: boolean;
  changeReviewerMergeRequest?: boolean;
  closeIssue?: boolean;
  closeMergeRequest?: boolean;
  failedPipeline?: boolean;
  fixedPipeline?: boolean;
  issueDue?: boolean;
  mergeMergeRequest?: boolean;
  mergeWhenPipelineSucceeds?: boolean;
  movedProject?: boolean;
  newEpic?: boolean;
  newIssue?: boolean;
  newMergeRequest?: boolean;
  newNote?: boolean;
  newRelease?: boolean;
  pushToMergeRequest?: boolean;
  reassignIssue?: boolean;
  reassignMergeRequest?: boolean;
  reopenIssue?: boolean;
  reopenMergeRequest?: boolean;
  successPipeline?: boolean;
};

export class NotificationSettings<C extends boolean = false> extends BaseResource<C> {
  edit<E extends boolean = false>(
    options: EditNotificationSettingsOptions &
      OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      ShowExpanded<E> &
      Sudo = {} as any,
  ): Promise<GitlabAPIResponse<NotificationSettingSchema, C, E, void>> {
    const { projectId, groupId, sudo, showExpanded, ...body } = options;

    ensureRequiredParams({ projectId, groupId }, { minExpected: 0 });

    const url = getPrefixedUrl('notification_settings', { projects: projectId, groups: groupId });

    return RequestHelper.put<NotificationSettingSchema>()(this, url, {
      sudo,
      showExpanded,
      body,
    });
  }

  show<E extends boolean = false>(
    options: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      ShowExpanded<E> &
      Sudo = {} as any,
  ): Promise<GitlabAPIResponse<NotificationSettingSchema, C, E, void>> {
    const { projectId, groupId, sudo, showExpanded } = options;

    ensureRequiredParams({ projectId, groupId }, { minExpected: 0 });

    const url = getPrefixedUrl('notification_settings', { projects: projectId, groups: groupId });

    return RequestHelper.get<NotificationSettingSchema>()(this, url, {
      sudo,
      showExpanded,
    });
  }
}
