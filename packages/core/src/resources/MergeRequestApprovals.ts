import { BaseResource } from '@gitbeaker/requester-utils';
import { BaseRequestOptions, RequestHelper, Sudo } from '../infrastructure';
import { GroupSchema } from './Groups';
import { ProtectedBranchSchema } from './ProtectedBranches';
import { UserSchema } from './Users';

// TODO: This one is has changed quite a bit, requires a deeper look
// https://docs.gitlab.com/ee/api/merge_request_approvals.html#project-level-mr-approvals

export interface MergeRequestApprovalConfigSchema extends Record<string, unknown> {
  approvals_before_merge: number;
  reset_approvals_on_push: boolean;
  disable_overriding_approvers_per_merge_request?: boolean;
  merge_requests_author_approval?: boolean;
  merge_requests_disable_committers_approval?: boolean;
  require_password_to_approve?: boolean;
}

export type ApprovalRulesRequestOptions = {
  userIds?: number[];
  groupIds?: number[];
  protectedBranchIds?: number[];
};

export interface MergeRequestApprovalRuleSchema extends Record<string, unknown> {
  id: number;
  name: string;
  rule_type: string;
  eligible_approvers: UserSchema[];
  users: UserSchema[];
  groups: GroupSchema[];
  contains_hidden_groups: boolean;
  protected_branches: ProtectedBranchSchema[];
}

export interface MergeRequestApprovalStatusSchema extends Record<string, unknown> {
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
  approved_by: { user: UserSchema }[];
}

export interface MergeRequestApprovalStateSchema extends Record<string, unknown> {
  approval_rules_overwritten: boolean;
  rules: MergeRequestApprovalRuleSchema[];
}

export class MergeRequestApprovals<C extends boolean = false> extends BaseResource<C> {
  addApprovalRule(
    projectId: string | number,
    name: string,
    approvalsRequired: number,
    {
      mergerequestIid,
      ...options
    }: { mergerequestIid?: number } & ApprovalRulesRequestOptions & BaseRequestOptions,
  ) {
    const pId = encodeURIComponent(projectId);

    let url: string;

    if (mergerequestIid) {
      const mIid = encodeURIComponent(mergerequestIid);
      url = `projects/${pId}/merge_requests/${mIid}/approval_rules`;
    } else {
      url = `projects/${pId}/approval_rules`;
    }

    return RequestHelper.post<MergeRequestApprovalRuleSchema>()(this, url, {
      name,
      approvalsRequired,
      ...options,
    });
  }

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
    return RequestHelper.get<MergeRequestApprovalRuleSchema[]>()(this, url, options);
  }

  approvalConfig(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    const url = `projects/${pId}/approvals`;

    return RequestHelper.get<MergeRequestApprovalConfigSchema>()(this, url, options);
  }

  approvalStatus(
    projectId: string | number,
    mergerequestIid: number,
    options?: BaseRequestOptions,
  ) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    const url = `projects/${pId}/merge_requests/${mIid}/approvals`;

    return RequestHelper.get<MergeRequestApprovalStatusSchema>()(this, url, options);
  }

  approvalState(
    projectId: string | number,
    mergerequestIid: number,
    options?: { sha?: string } & BaseRequestOptions,
  ) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.get<MergeRequestApprovalStateSchema>()(
      this,
      `projects/${pId}/merge_requests/${mIid}/approval_state`,
      options,
    );
  }

  approve(
    projectId: string | number,
    mergerequestIid: number,
    options?: { sha?: string } & BaseRequestOptions,
  ) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.post<MergeRequestApprovalStatusSchema>()(
      this,
      `projects/${pId}/merge_requests/${mIid}/approve`,
      options,
    );
  }

  addApprovers(
    projectId: string | number,
    approverIds: number[],
    approverGroupIds: (string | number)[],
    { mergerequestIid, ...options }: { mergerequestIid?: number } & BaseRequestOptions = {},
  ) {
    const pId = encodeURIComponent(projectId);

    let url: string;

    if (mergerequestIid) {
      const mIid = encodeURIComponent(mergerequestIid);
      url = `projects/${pId}/merge_requests/${mIid}/approvers`;
    } else {
      url = `projects/${pId}/approvers`;
    }

    return RequestHelper.put()(this, url, { approverIds, approverGroupIds, ...options });
  }

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

    return RequestHelper.put<MergeRequestApprovalRuleSchema>()(this, url, {
      name,
      approvalsRequired,
      ...options,
    });
  }

  editApprovalsRequired(
    projectId: string | number,
    mergerequestIid: number,
    approvals_required: number,
    options?: BaseRequestOptions,
  ) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    const url = `projects/${pId}/merge_requests/${mIid}/approvals`;

    return RequestHelper.post<MergeRequestApprovalStatusSchema>()(this, url, {
      approvals_required,
      options,
    });
  }

  removeApprovalRule(
    projectId: string | number,
    approvalRuleId: number,
    { mergerequestIid, ...options }: { mergerequestIid?: number } & BaseRequestOptions = {},
  ) {
    const [pId, aId] = [projectId, approvalRuleId].map(encodeURIComponent);

    let url: string;

    if (mergerequestIid) {
      const mIid = encodeURIComponent(mergerequestIid);
      url = `projects/${pId}/merge_requests/${mIid}/approval_rules/${aId}`;
    } else {
      url = `projects/${pId}/approval_rules/${aId}`;
    }

    return RequestHelper.del()(this, url, options);
  }

  unapprove(projectId: string | number, mergerequestIid: number, options?: Sudo) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.post()(this, `projects/${pId}/merge_requests/${mIid}/unapprove`, options);
  }
}
