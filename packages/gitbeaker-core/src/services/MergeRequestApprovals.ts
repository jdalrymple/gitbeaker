import { BaseService } from '@gitbeaker/requester-utils';
import { BaseRequestOptions, RequestHelper, Sudo } from '../infrastructure';

// TODO: This one is has changed quite a bit, requires a deeper look
// https://docs.gitlab.com/ee/api/merge_request_approvals.html#project-level-mr-approvals

export interface MergeRequestApprovalSchema extends Record<string, unknown> {
  approvals_before_merge: number;
  reset_approvals_on_push: boolean;
  disable_overriding_approvers_per_merge_request: boolean;
  merge_requests_author_approval: boolean;
  merge_requests_disable_committers_approval: boolean;
  require_password_to_approve: boolean;
}

export type ApprovalRulesRequestOptions = {
  userIds?: number[];
  groupIds?: number[];
  protectedBranchIds?: number[];
};

export class MergeRequestApprovals extends BaseService {
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

  approvals(
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
