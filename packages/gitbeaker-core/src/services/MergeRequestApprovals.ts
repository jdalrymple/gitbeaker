import { BaseService } from '@gitbeaker/requester-utils';
import { BaseRequestOptions, RequestHelper, Sudo } from '../infrastructure';

export type ApprovalRulesRequestOptions = {
  userIds?: number[];
  groupIds?: number[];
  protectedBranchIds?: number[];
};

export class MergeRequestApprovals<C extends boolean> extends BaseService<C> {
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

    let url;

    if (mergerequestIid) {
      const mIid = encodeURIComponent(mergerequestIid);
      url = `projects/${pId}/merge_requests/${mIid}/approval_rules`;
    } else {
      url = `projects/${pId}/approval_rules`;
    }

    return RequestHelper.post<C>(this, url, { name, approvalsRequired, ...options });
  }

  approvalRules(
    projectId: string | number,
    { mergerequestIid, ...options }: { mergerequestIid?: number } & BaseRequestOptions = {},
  ) {
    const pId = encodeURIComponent(projectId);

    let url;

    if (mergerequestIid) {
      const mIid = encodeURIComponent(mergerequestIid);
      url = `projects/${pId}/merge_requests/${mIid}/approval_rules`;
    } else {
      url = `projects/${pId}/approval_rules`;
    }
    return RequestHelper.get<C>(this, url, options);
  }

  approvals(
    projectId: string | number,
    { mergerequestIid, ...options }: { mergerequestIid?: number } & BaseRequestOptions = {},
  ) {
    const pId = encodeURIComponent(projectId);

    let url;

    if (mergerequestIid) {
      const mIid = encodeURIComponent(mergerequestIid);
      url = `projects/${pId}/merge_requests/${mIid}/approvals`;
    } else {
      url = `projects/${pId}/approvals`;
    }

    return RequestHelper.get<C>(this, url, options);
  }

  approvalState(
    projectId: string | number,
    mergerequestIid: number,
    options?: { sha?: string } & BaseRequestOptions,
  ) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.get<C>(
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

    return RequestHelper.post<C>(this, `projects/${pId}/merge_requests/${mIid}/approve`, options);
  }

  approvers(
    projectId: string | number,
    approverIds: number[],
    approverGroupIds: (string | number)[],
    { mergerequestIid, ...options }: { mergerequestIid?: number } & BaseRequestOptions = {},
  ) {
    const pId = encodeURIComponent(projectId);

    let url;

    if (mergerequestIid) {
      const mIid = encodeURIComponent(mergerequestIid);
      url = `projects/${pId}/merge_requests/${mIid}/approvers`;
    } else {
      url = `projects/${pId}/approvers`;
    }

    return RequestHelper.put<C>(this, url, { approverIds, approverGroupIds, ...options });
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

    let url;

    if (mergerequestIid) {
      const mIid = encodeURIComponent(mergerequestIid);
      url = `projects/${pId}/merge_requests/${mIid}/approval_rules/${aId}`;
    } else {
      url = `projects/${pId}/approval_rules/${aId}`;
    }

    return RequestHelper.put<C>(this, url, { name, approvalsRequired, ...options });
  }

  editApprovals(
    projectId: string | number,
    { mergerequestIid, ...options }: { mergerequestIid?: number } & BaseRequestOptions = {},
  ) {
    const pId = encodeURIComponent(projectId);

    let url;

    if (mergerequestIid) {
      const mIid = encodeURIComponent(mergerequestIid);
      url = `projects/${pId}/merge_requests/${mIid}/approvals`;
    } else {
      url = `projects/${pId}/approvals`;
    }

    return RequestHelper.post<C>(this, url, options);
  }

  removeApprovalRule(
    projectId: string | number,
    approvalRuleId: number,
    { mergerequestIid, ...options }: { mergerequestIid?: number } & BaseRequestOptions = {},
  ) {
    const [pId, aId] = [projectId, approvalRuleId].map(encodeURIComponent);

    let url;

    if (mergerequestIid) {
      const mIid = encodeURIComponent(mergerequestIid);
      url = `projects/${pId}/merge_requests/${mIid}/approval_rules/${aId}`;
    } else {
      url = `projects/${pId}/approval_rules/${aId}`;
    }

    return RequestHelper.del<C>(this, url, options);
  }

  unapprove(projectId: string | number, mergerequestIid: number, options?: Sudo) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.post<C>(this, `projects/${pId}/merge_requests/${mIid}/unapprove`, options);
  }
}
