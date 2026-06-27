import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export interface ApprovalSettingValue {
  value: boolean;
  locked: boolean;
  inherited_from: string | null;
}

export interface MergeRequestApprovalSettingsSchema extends Record<string, unknown> {
  allow_author_approval: ApprovalSettingValue;
  allow_committer_approval: ApprovalSettingValue;
  allow_overrides_to_approver_list_per_merge_request: ApprovalSettingValue;
  retain_approvals_on_push: ApprovalSettingValue;
  selective_code_owner_removals: ApprovalSettingValue;
  require_password_to_approve: ApprovalSettingValue;
  require_reauthentication_to_approve: ApprovalSettingValue;
}

export type EditMergeRequestApprovalSettingsOptions = {
  allowAuthorApproval?: boolean;
  allowCommitterApproval?: boolean;
  allowOverridesToApproverListPerMergeRequest?: boolean;
  retainApprovalsOnPush?: boolean;
  selectiveCodeOwnerRemovals?: boolean;
  requireReauthenticationToApprove?: boolean;
};

export class MergeRequestApprovalSettings<C extends boolean = false> extends BaseResource<C> {
  show<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MergeRequestApprovalSettingsSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<MergeRequestApprovalSettingsSchema>()(
      this,
      endpoint`projects/${projectId}/merge_request_approval_setting`,
      { sudo, showExpanded },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    options?: EditMergeRequestApprovalSettingsOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MergeRequestApprovalSettingsSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<MergeRequestApprovalSettingsSchema>()(
      this,
      endpoint`projects/${projectId}/merge_request_approval_setting`,
      { sudo, showExpanded, body },
    );
  }

  showGroup<E extends boolean = false>(
    groupId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MergeRequestApprovalSettingsSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<MergeRequestApprovalSettingsSchema>()(
      this,
      endpoint`groups/${groupId}/merge_request_approval_setting`,
      { sudo, showExpanded },
    );
  }

  editGroup<E extends boolean = false>(
    groupId: string | number,
    options?: EditMergeRequestApprovalSettingsOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MergeRequestApprovalSettingsSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<MergeRequestApprovalSettingsSchema>()(
      this,
      endpoint`groups/${groupId}/merge_request_approval_setting`,
      { sudo, showExpanded, body },
    );
  }
}