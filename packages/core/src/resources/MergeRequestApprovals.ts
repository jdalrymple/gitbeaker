import type { GitlabAPIResponse, MappedOmit, ShowExpanded, Sudo } from '../infrastructure';
import type { GroupSchema } from './Groups';
import type { ProtectedBranchSchema } from './ProtectedBranches';
import type { SimpleUserSchema } from './Users';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint, getPrefixedUrl } from '../infrastructure';

export interface ProjectLevelMergeRequestApprovalSchema extends Record<string, unknown> {
  approvals_before_merge: number;
  reset_approvals_on_push: boolean;
  disable_overriding_approvers_per_merge_request: boolean;
  merge_requests_author_approval: boolean;
  merge_requests_disable_committers_approval: boolean;
  require_password_to_approve: boolean;
}

export interface ApprovedByEntity {
  user: MappedOmit<SimpleUserSchema, 'created_at'>;
}

export interface MergeRequestLevelMergeRequestApprovalSchema extends Record<string, unknown> {
  id: number;
  iid: number;
  project_id: number;
  title: string;
  description: string;
  state: string;
  created_at: string;
  updated_at: string;
  merge_status: string;
  approvals_required: number;
  approvals_left: number;
  approved_by?: ApprovedByEntity[];
}

export interface ApprovalRuleSchema extends Record<string, unknown> {
  id: number;
  name: string;
  rule_type: string;
  eligible_approvers?: MappedOmit<SimpleUserSchema, 'created_at'>[];
  approvals_required: number;
  users?: MappedOmit<SimpleUserSchema, 'created_at'>[];
  groups?: GroupSchema[];
  contains_hidden_groups: boolean;
  overridden: boolean;
}

export interface ProjectLevelApprovalRuleSchema extends ApprovalRuleSchema {
  protected_branches?: ProtectedBranchSchema[];
}

export interface MergeRequestLevelApprovalRuleSchema extends ApprovalRuleSchema {
  source_rule?: string;
}

export interface ApprovalStateSchema extends Record<string, unknown> {
  approval_rules_overwritten: boolean;
  rules: ({ approved: boolean } & MergeRequestLevelApprovalRuleSchema)[];
}

export type CreateApprovalRuleOptions = {
  userIds?: number[];
  groupIds?: number[];
  protectedBranchIds?: number[];
  appliesToAllProtectedBranches?: boolean;
  reportType?: string;
  ruleType?: string;
  usernames?: string[];
};

export type EditApprovalRuleOptions = {
  userIds?: number[];
  groupIds?: number[];
  protectedBranchIds?: number[];
  appliesToAllProtectedBranches?: boolean;
  usernames?: string[];
  removeHiddenGroups?: boolean;
};

export type EditConfigurationOptions = {
  disableOverridingApproversPerMergeRequest?: boolean;
  mergeRequestsAuthorApproval?: boolean;
  mergeRequestsDisableCommittersApproval?: boolean;
  requirePasswordToApprove?: boolean;
  resetApprovalsOnPush?: boolean;
  selectiveCodeOwnerRemovals?: boolean;
};

export class MergeRequestApprovals<C extends boolean = false> extends BaseResource<C> {
  allApprovalRules<E extends boolean = false>(
    projectId: string | number,
    options: { mergerequestIId: number } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MergeRequestLevelApprovalRuleSchema[], C, E, void>>;

  allApprovalRules<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectLevelApprovalRuleSchema[], C, E, void>>;

  allApprovalRules<E extends boolean = false>(
    projectId: string | number,
    { mergerequestIId, ...options }: { mergerequestIId?: number } & ShowExpanded<E> & Sudo = {},
  ): Promise<
    GitlabAPIResponse<
      (ProjectLevelApprovalRuleSchema | MergeRequestLevelApprovalRuleSchema)[],
      C,
      E,
      void
    >
  > {
    const { sudo, showExpanded } = options;
    const url = getPrefixedUrl('approval_rules', {
      projects: projectId,
      merge_requests: mergerequestIId,
    });

    return RequestHelper.get<
      (ProjectLevelApprovalRuleSchema | MergeRequestLevelApprovalRuleSchema)[]
    >()(this, url, { sudo, showExpanded });
  }

  approve<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: { sha?: string; approvalPassword?: string } & ShowExpanded<E> & Sudo,
  ) {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<MergeRequestLevelMergeRequestApprovalSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/approve`,
      { sudo, showExpanded, body },
    );
  }

  createApprovalRule<E extends boolean = false>(
    projectId: string | number,
    name: string,
    approvalsRequired: number,
    options: { mergerequestIId: number } & CreateApprovalRuleOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MergeRequestLevelApprovalRuleSchema, C, E, void>>;

  createApprovalRule<E extends boolean = false>(
    projectId: string | number,
    name: string,
    approvalsRequired: number,
    options?: CreateApprovalRuleOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectLevelApprovalRuleSchema, C, E, void>>;

  createApprovalRule<E extends boolean = false>(
    projectId: string | number,
    name: string,
    approvalsRequired: number,
    {
      mergerequestIId,
      ...options
    }: { mergerequestIId?: number } & CreateApprovalRuleOptions & ShowExpanded<E> & Sudo = {},
  ): Promise<
    GitlabAPIResponse<
      ProjectLevelApprovalRuleSchema | MergeRequestLevelApprovalRuleSchema,
      C,
      E,
      void
    >
  > {
    const { sudo, showExpanded, ...body } = options;
    const url = getPrefixedUrl('approval_rules', {
      projects: projectId,
      merge_requests: mergerequestIId,
    });

    return RequestHelper.post<
      ProjectLevelApprovalRuleSchema | MergeRequestLevelApprovalRuleSchema
    >()(this, url, { sudo, showExpanded, body: { ...body, name, approvalsRequired } });
  }

  editApprovalRule<E extends boolean = false>(
    projectId: string | number,
    approvalRuleId: number,
    name: string,
    approvalsRequired: number,
    options: { mergerequestIId: number } & EditApprovalRuleOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MergeRequestLevelApprovalRuleSchema, C, E, void>>;

  editApprovalRule<E extends boolean = false>(
    projectId: string | number,
    approvalRuleId: number,
    name: string,
    approvalsRequired: number,
    options?: EditApprovalRuleOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectLevelApprovalRuleSchema, C, E, void>>;

  editApprovalRule<E extends boolean = false>(
    projectId: string | number,
    approvalRuleId: number,
    name: string,
    approvalsRequired: number,
    {
      mergerequestIId,
      ...options
    }: { mergerequestIId?: number } & EditApprovalRuleOptions & ShowExpanded<E> & Sudo = {},
  ): Promise<
    GitlabAPIResponse<
      ProjectLevelApprovalRuleSchema | MergeRequestLevelApprovalRuleSchema,
      C,
      E,
      void
    >
  > {
    const { sudo, showExpanded, ...body } = options;
    const url = getPrefixedUrl(endpoint`approval_rules/${approvalRuleId}`, {
      projects: projectId,
      merge_requests: mergerequestIId,
    });

    return RequestHelper.put<
      ProjectLevelApprovalRuleSchema | MergeRequestLevelApprovalRuleSchema
    >()(this, url, { sudo, showExpanded, body: { ...body, name, approvalsRequired } });
  }

  editConfiguration<E extends boolean = false>(
    projectId: string | number,
    options?: EditConfigurationOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectLevelMergeRequestApprovalSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ProjectLevelMergeRequestApprovalSchema>()(
      this,
      endpoint`projects/${projectId}/approvals`,
      { sudo, showExpanded, body },
    );
  }

  removeApprovalRule<E extends boolean = false>(
    projectId: string | number,
    approvalRuleId: number,
    {
      mergerequestIId,
      ...options
    }: { mergerequestIId?: number } & ShowExpanded<E> & Sudo = {} as any,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options;
    const url = getPrefixedUrl(endpoint`approval_rules/${approvalRuleId}`, {
      projects: projectId,
      merge_requests: mergerequestIId,
    });

    return RequestHelper.del()(this, url, { sudo, showExpanded });
  }

  showApprovalRule<E extends boolean = false>(
    projectId: string | number,
    approvalRuleId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectLevelApprovalRuleSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ProjectLevelApprovalRuleSchema>()(
      this,
      endpoint`projects/${projectId}/approval_rules/${approvalRuleId}`,
      { sudo, showExpanded },
    );
  }

  showApprovalState<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ApprovalStateSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ApprovalStateSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/approval_state`,
      { sudo, showExpanded },
    );
  }

  showConfiguration<E extends boolean = false>(
    projectId: string | number,
    options: { mergerequestIId: number } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MergeRequestLevelMergeRequestApprovalSchema, C, E, void>>;

  showConfiguration<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectLevelMergeRequestApprovalSchema, C, E, void>>;

  showConfiguration<E extends boolean = false>(
    projectId: string | number,
    { mergerequestIId, ...options }: { mergerequestIId?: number } & ShowExpanded<E> & Sudo = {},
  ): Promise<
    GitlabAPIResponse<
      MergeRequestLevelMergeRequestApprovalSchema | ProjectLevelMergeRequestApprovalSchema,
      C,
      E,
      void
    >
  > {
    const { sudo, showExpanded } = options;
    const url = getPrefixedUrl('approvals', {
      projects: projectId,
      merge_requests: mergerequestIId,
    });

    return RequestHelper.get<
      MergeRequestLevelMergeRequestApprovalSchema | ProjectLevelMergeRequestApprovalSchema
    >()(this, url, { sudo, showExpanded });
  }

  unapprove<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<void>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/unapprove`,
      { sudo, showExpanded },
    );
  }
}
