import { BaseResource } from '@gitbeaker/requester-utils';
import { BaseRequestOptions, RequestHelper, Sudo } from '../infrastructure';
import { UserSchema } from './Users';

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
    let url: string

    if (mergerequestIid) {
      const mIid = encodeURIComponent(mergerequestIid);
      url =  `projects/${pId}/merge_requests/${mIid}/approvals`
    } else {
      url = `projects/${pId}/approvals`
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


  approvalRules(
    projectId: string | number,
    options: BaseRequestOptions,
  ): Promise<ProjectLevelApprovalRulesSchema>;
  approvalRules(
    projectId: string | number,
    options: { mergerequestIid: number } & BaseRequestOptions,
  ): Promise<MergeRequestLevelApprovalRulesSchema>;
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

  approve(
    projectId: string | number,
    mergerequestIid: number,
    options?: { sha?: string } & BaseRequestOptions,
  ) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.post()(this, `projects/${pId}/merge_requests/${mIid}/approve`, options);
  }

  approvers(
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

    return RequestHelper.put()(this, url, { name, approvalsRequired, ...options });
  }

  editApprovals(
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
