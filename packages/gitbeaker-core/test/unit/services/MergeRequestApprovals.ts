import { RequesterType } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../../../src/infrastructure';
import { MergeRequestApprovals } from '../../../src';

jest.mock('../../../src/infrastructure/RequestHelper');

let service: MergeRequestApprovals;

beforeEach(() => {
  const requester = {
    get: jest.fn(() => Promise.resolve([])),
    post: jest.fn(() => Promise.resolve({})),
    put: jest.fn(() => Promise.resolve({})),
    delete: jest.fn(() => Promise.resolve({})),
  } as RequesterType;

  service = new MergeRequestApprovals({
    requester,
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating MergeRequestApprovals service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(MergeRequestApprovals);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('MergeRequests.addApprovalRules', () => {
  it('should request POST /projects/:id/approval_rules', async () => {
    await service.addApprovalRule(2, 'Some rule', 5, {
      userIds: [1, 2],
      groupIds: [3, 4],
      protectedBranchIds: [5, 6],
    });

    expect(RequestHelper.post).toHaveBeenCalledWith(service, 'projects/2/approval_rules', {
      name: 'Some rule',
      approvalsRequired: 5,
      userIds: [1, 2],
      groupIds: [3, 4],
      protectedBranchIds: [5, 6],
    });
  });

  it('should request POST /projects/:id/merge_requests/:merge_request_iid/approval_rules when mergerequestIid is passed', async () => {
    await service.addApprovalRule(2, 'Some rule', 5, {
      mergerequestIid: 3,
      userIds: [1, 2],
      groupIds: [3, 4],
    });

    expect(RequestHelper.post).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/approval_rules',
      {
        name: 'Some rule',
        approvalsRequired: 5,
        userIds: [1, 2],
        groupIds: [3, 4],
      },
    );
  });
});

describe('MergeRequests.approvals', () => {
  it('should request GET /projects/:id/approvals', async () => {
    await service.approvals(3);

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'projects/3/approvals', {});
  });

  it('should request GET /projects/:id/merge_requests/:merge_request_iid/approvals when mergerequestIid Id is passed', async () => {
    await service.approvals(3, { mergerequestIid: 1 });

    expect(RequestHelper.get).toHaveBeenCalledWith(
      service,
      'projects/3/merge_requests/1/approvals',
      {},
    );
  });
});

describe('MergeRequests.approvalRules', () => {
  it('should request GET /projects/:id/approval_rules', async () => {
    await service.approvalRules(2);

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'projects/2/approval_rules', {});
  });

  it('should request GET /projects/:id/merge_requests/:merge_request_iid/approval_rules when mergerequestIid Id is passed', async () => {
    await service.approvalRules(2, { mergerequestIid: 3 });

    expect(RequestHelper.get).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/approval_rules',
      {},
    );
  });
});

describe('MergeRequests.approvalState', () => {
  it('should request GET /projects/:id/merge_requests/:merge_request_iid/approval_state', async () => {
    await service.approvalState(2, 3);

    expect(RequestHelper.get).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/approval_state',
      undefined,
    );
  });
});

describe('MergeRequests.approve', () => {
  it('should request POST /projects/:id/merge_requests/:merge_request_iid/approve', async () => {
    await service.approve(2, 3);

    expect(RequestHelper.post).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/approve',
      undefined,
    );
  });
});

describe('MergeRequests.approvers', () => {
  it('should request PUT /projects/:id/approvers', async () => {
    await service.approvers(3, [4, 5], [6, 7]);

    expect(RequestHelper.put).toHaveBeenCalledWith(service, 'projects/3/approvers', {
      approverIds: [4, 5],
      approverGroupIds: [6, 7],
    });
  });

  it('should request PUT /projects/:id/merge_requests/:merge_request_iid/approvers when mergerequestIid Id is passed', async () => {
    await service.approvers(3, [4, 5], [6, 7], {
      approverIds: [4, 5],
      approverGroupIds: [6, 7],
      mergerequestIid: 1,
    });

    expect(RequestHelper.put).toHaveBeenCalledWith(
      service,
      'projects/3/merge_requests/1/approvers',
      { approverIds: [4, 5], approverGroupIds: [6, 7] },
    );
  });
});

describe('MergeRequests.editApprovalRules', () => {
  it('should request PUT /projects/:id/approval_rules/:approval_rule_id', async () => {
    await service.editApprovalRule(2, 30, 'Some rule', 5, {
      userIds: [1, 2],
      groupIds: [3, 4],
      protectedBranchIds: [5, 6],
    });

    expect(RequestHelper.put).toHaveBeenCalledWith(service, 'projects/2/approval_rules/30', {
      name: 'Some rule',
      approvalsRequired: 5,
      userIds: [1, 2],
      groupIds: [3, 4],
      protectedBranchIds: [5, 6],
    });
  });

  it('should request PUT /projects/:id/merge_requests/:merge_request_iid/approval_rules/:approval_rule_id when mergerequestIid is passed', async () => {
    await service.editApprovalRule(2, 30, 'Some rule', 5, {
      mergerequestIid: 3,
      userIds: [1, 2],
      groupIds: [3, 4],
    });

    expect(RequestHelper.put).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/approval_rules/30',
      {
        name: 'Some rule',
        approvalsRequired: 5,
        userIds: [1, 2],
        groupIds: [3, 4],
      },
    );
  });
});

describe('MergeRequests.editApprovals', () => {
  it('should request POST /projects/:id/approvals', async () => {
    await service.editApprovals(3, { prop: 4 });

    expect(RequestHelper.post).toHaveBeenCalledWith(service, 'projects/3/approvals', { prop: 4 });
  });

  it('should request POST /projects/:id/merge_requests/:merge_request_iid/approvals when mergerequestIid Id is passed', async () => {
    await service.editApprovals(3, { mergerequestIid: 1, prop: 4 });

    expect(RequestHelper.post).toHaveBeenCalledWith(
      service,
      'projects/3/merge_requests/1/approvals',
      { prop: 4 },
    );
  });
});

describe('MergeRequests.removeApprovalRules', () => {
  it('should request DELETE /projects/:id/approval_rules/:approval_rule_id', async () => {
    await service.removeApprovalRule(2, 30);

    expect(RequestHelper.del).toHaveBeenCalledWith(service, 'projects/2/approval_rules/30', {});
  });

  it('should request DELETE /projects/:id/merge_requests/:merge_request_iid/approval_rules/:approval_rule_id when mergerequestIid is passed', async () => {
    await service.removeApprovalRule(2, 30, { mergerequestIid: 3 });

    expect(RequestHelper.del).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/approval_rules/30',
      {},
    );
  });
});

describe('MergeRequests.unapprove', () => {
  it('should request POST /projects/:id/merge_requests/:merge_request_iid/unapprove', async () => {
    await service.unapprove(2, 3);

    expect(RequestHelper.post).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/unapprove',
      undefined,
    );
  });
});
