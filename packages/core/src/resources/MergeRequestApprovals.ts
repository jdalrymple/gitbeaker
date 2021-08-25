import { BaseResource } from '@gitbeaker/requester-utils';
import { BaseRequestOptions, RequestHelper, Sudo } from '../infrastructure';
import { UserSchema } from './Users';
import { GroupSchema } from './Groups';
import { ProtectedBranchSchema } from './ProtectedBranches';

export interface ProjectLevelMergeRequestApprovalSchema extends Record<string, unknown> {
  approvals_before_merge: number;
  reset_approvals_on_push: boolean;
  disable_overriding_approvers_per_merge_request: boolean;
  merge_requests_author_approval: boolean;
  merge_requests_disable_committers_approval: boolean;
  require_password_to_approve: boolean;
}

export interface ApprovedByEntity {
  user: Pick<UserSchema, 'name' | 'username' | 'id' | 'state' | 'avatar_url' | 'web_url'>;
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

export type ApprovalRulesRequestOptions = {
  userIds?: number[];
  groupIds?: number[];
  protectedBranchIds?: number[];
};

export interface ApprovalRuleSchema extends Record<string, unknown> {
  id: number;
  name: string;
  rule_type: string;
  eligible_approvers?: Pick<
    UserSchema,
    'name' | 'username' | 'id' | 'state' | 'avatar_url' | 'web_url'
  >[];
  approvals_required: number;
  users?: Pick<UserSchema, 'name' | 'username' | 'id' | 'state' | 'avatar_url' | 'web_url'>[];
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

export class MergeRequestApprovals<C extends boolean = false> extends BaseResource<C> {
  configuration(
    projectId: string | number,
    options: BaseRequestOptions,
  ): Promise<ProjectLevelMergeRequestApprovalSchema>;

  configuration(
    projectId: string | number,
    options: { mergerequestIid: number } & BaseRequestOptions,
  ): Promise<MergeRequestLevelMergeRequestApprovalSchema>;

  configuration(
    projectId: string | number,
    { mergerequestIid, ...options }: { mergerequestIid?: number } & BaseRequestOptions = {},
  ) {
    const pId = encodeURIComponent(projectId);
    let url: string;

    if (mergerequestIid) {
      const mIid = encodeURIComponent(mergerequestIid);
      url = `projects/${pId}/merge_requests/${mIid}/approvals`;
    } else {
      url = `projects/${pId}/approvals`;
    }

    return RequestHelper.get()(this, url, options);
  }

  editConfiguration(
    projectId: string | number,
    options: BaseRequestOptions,
  ): Promise<ProjectLevelMergeRequestApprovalSchema>;

  editConfiguration(
    projectId: string | number,
    options: { mergerequestIid: number } & BaseRequestOptions,
  ): Promise<MergeRequestLevelMergeRequestApprovalSchema>;

  editConfiguration(
    projectId: string | number,
    { mergerequestIid, ...options }: { mergerequestIid?: number } & BaseRequestOptions = {},
  ) {
    const pId = encodeURIComponent(projectId);
    let url: string;

    if (mergerequestIid) {
      const mIid = encodeURIComponent(mergerequestIid);

      url = `projects/${pId}/merge_requests/${mIid}/approvals`;
    } else {
      url = `projects/${pId}/approvals`;
    }

    return RequestHelper.post()(this, url, options);
  }

  approvalRule(projectId: string | number, approvalRuleId: number, options: BaseRequestOptions) {
    const [pId, aId] = [projectId, approvalRuleId].map(encodeURIComponent);

    return RequestHelper.get()(this, `projects/${pId}/approval_rule/${aId}`, options);
  }

  approvalRules(
    projectId: string | number,
    options: BaseRequestOptions,
  ): Promise<ProjectLevelApprovalRuleSchema>;

  approvalRules(
    projectId: string | number,
    options: { mergerequestIid: number } & BaseRequestOptions,
  ): Promise<MergeRequestLevelApprovalRuleSchema>;

  approvalRules(
    projectId: string | number,
    { mergerequestIid, ...options }: { mergerequestIid?: number } & BaseRequestOptions = {},
  ) {
    const pId = encodeURIComponent(projectId);

    let url: string;

    if (mergerequestIid) {
      const mIid = encodeURIComponent(mergerequestIid);
      url = `projects/${pId}/merge_requests/${mIid}/approval_rules`;
    } else {
      url = `projects/${pId}/approval_rules`;
    }
    return RequestHelper.get()(this, url, options);
  }

  addApprovalRule(
    projectId: string | number,
    name: string,
    approvalsRequired: number,
    options: ApprovalRulesRequestOptions & BaseRequestOptions,
  ): Promise<ProjectLevelApprovalRuleSchema>;

  addApprovalRule(
    projectId: string | number,
    name: string,
    approvalsRequired: number,
    options: { mergerequestIid: number } & ApprovalRulesRequestOptions & BaseRequestOptions,
  ): Promise<MergeRequestLevelApprovalRuleSchema>;

  addApprovalRule(
    projectId: string | number,
    name: string,
    approvalsRequired: number,
    {
      mergerequestIid,
      ...options
    }: { mergerequestIid?: number } & ApprovalRulesRequestOptions & BaseRequestOptions = {},
  ) {
    const pId = encodeURIComponent(projectId);

    let url: string;

    if (mergerequestIid) {
      const mIid = encodeURIComponent(mergerequestIid);
      url = `projects/${pId}/merge_requests/${mIid}/approval_rules`;
    } else {
      url = `projects/${pId}/approval_rules`;
    }

    return RequestHelper.post()(this, url, { name, approvalsRequired, ...options });
  }

  approvalState(
    projectId: string | number,
    mergerequestIid: number,
    options?: { sha?: string } & BaseRequestOptions,
  ) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.get()(
      this,
      `projects/${pId}/merge_requests/${mIid}/approval_state`,
      options,
    );
  }

  editApprovalRule(
    projectId: string | number,
    approvalRuleId: number,
    name: string,
    approvalsRequired: number,
    options?: ApprovalRulesRequestOptions & BaseRequestOptions,
  ): Promise<ProjectLevelApprovalRuleSchema>;

  editApprovalRule(
    projectId: string | number,
    approvalRuleId: number,
    name: string,
    approvalsRequired: number,
    options: { mergerequestIid: number } & ApprovalRulesRequestOptions & BaseRequestOptions,
  ): Promise<MergeRequestLevelApprovalRuleSchema>;

  editApprovalRule(
    projectId: string | number,
    approvalRuleId: number,
    name: string,
    approvalsRequired: number,
    {
      mergerequestIid,
      ...options
    }: { mergerequestIid?: number } & ApprovalRulesRequestOptions & BaseRequestOptions = {},
  ) {
    const [pId, aId] = [projectId, approvalRuleId].map(encodeURIComponent);

    let url: string;

    if (mergerequestIid) {
      const mIid = encodeURIComponent(mergerequestIid);
      url = `projects/${pId}/merge_requests/${mIid}/approval_rules/${aId}`;
    } else {
      url = `projects/${pId}/approval_rules/${aId}`;
    }

    return RequestHelper.put()(this, url, { name, approvalsRequired, ...options });
  }

  removeApprovalRule(
    projectId: string | number,
    approvalRuleId: number,
    options?: Sudo,
  ): Promise<void>;

  removeApprovalRule(
    projectId: string | number,
    approvalRuleId: number,
    options: { mergerequestIid: number } & Sudo,
  ): Promise<void>;

  removeApprovalRule(
    projectId: string | number,
    approvalRuleId: number,
    { mergerequestIid }: { mergerequestIid?: number } & Sudo = {},
  ) {
    const [pId, aId] = [projectId, approvalRuleId].map(encodeURIComponent);

    let url: string;

    if (mergerequestIid) {
      const mIid = encodeURIComponent(mergerequestIid);
      url = `projects/${pId}/merge_requests/${mIid}/approval_rules/${aId}`;
    } else {
      url = `projects/${pId}/approval_rules/${aId}`;
    }

    return RequestHelper.del()(this, url);
  }

  approve(
    projectId: string | number,
    mergerequestIid: number,
    options?: { sha?: string } & BaseRequestOptions,
  ) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.post<MergeRequestLevelMergeRequestApprovalSchema>()(
      this,
      `projects/${pId}/merge_requests/${mIid}/approve`,
      options,
    );
  }

  unapprove(projectId: string | number, mergerequestIid: number, options?: Sudo) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.post<void>()(
      this,
      `projects/${pId}/merge_requests/${mIid}/unapprove`,
      options,
    );
  }
}
