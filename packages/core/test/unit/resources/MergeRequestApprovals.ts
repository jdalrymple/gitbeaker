import { RequestHelper } from '../../../src/infrastructure';
import { MergeRequestApprovals } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: MergeRequestApprovals;

beforeEach(() => {
  service = new MergeRequestApprovals({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating MergeRequestApprovals service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(MergeRequestApprovals);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('MergeRequestApprovals.configuration', () => {
  it('should request GET /projects/:id/approvals', async () => {
    await service.configuration(3);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/3/approvals', {});
  });

  it('should request GET /projects/:id/approvals', async () => {
    await service.configuration(3, { prop: 4 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/3/approvals', { prop: 4 });
  });

  it('should request GET /projects/:id/merge_requests/:merge_request_iid/approvals when mergerequestIid Id is passed', async () => {
    await service.configuration(3, { mergerequestIid: 1, prop: 4 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/3/merge_requests/1/approvals',
      { prop: 4 },
    );
  });
});

describe('MergeRequestApprovals.editConfiguration', () => {
  it('should request POST /projects/:id/approvals without options', async () => {
    await service.editConfiguration(3);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/3/approvals', {});
  });

  it('should request POST /projects/:id/approvals', async () => {
    await service.editConfiguration(3, { prop: 4 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/3/approvals', { prop: 4 });
  });

  it('should request POST /projects/:id/merge_requests/:merge_request_iid/approvals when mergerequestIid Id is passed', async () => {
    await service.editConfiguration(3, { mergerequestIid: 1, prop: 4 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/3/merge_requests/1/approvals',
      { prop: 4 },
    );
  });
});

describe('MergeRequestApprovals.approvalRule', () => {
  it('should request GET /projects/:id/approval_rules/:approval_rule_id', async () => {
    await service.approvalRule(2, 4, { prop: 3 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/2/approval_rules/4', {
      prop: 3,
    });
  });
});

describe('MergeRequestApprovals.approvalRules', () => {
  it('should request GET /projects/:id/approval_rules without options', async () => {
    await service.approvalRules(2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/2/approval_rules', {});
  });

  it('should request GET /projects/:id/approval_rules', async () => {
    await service.approvalRules(2, { prop: 3 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/2/approval_rules', {
      prop: 3,
    });
  });

  it('should request GET /projects/:id/merge_requests/:merge_request_iid/approval_rules when mergerequestIid is passed', async () => {
    await service.approvalRules(2, { mergerequestIid:1, prop: 3 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/2/merge_requests/1/approval_rules', {
      prop: 3,
    });
  });
});

describe('MergeRequestApprovals.addApprovalRule', () => {
  it('should request POST /projects/:id/approval_rules without options', async () => {
    await service.addApprovalRule(2, 'Some rule', 5);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/2/approval_rules', {
      name: 'Some rule',
      approvalsRequired: 5
    });
  });

  it('should request POST /projects/:id/approval_rules', async () => {
    await service.addApprovalRule(2, 'Some rule', 5, {
      userIds: [1, 2],
      groupIds: [3, 4],
      protectedBranchIds: [5, 6],
    });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/2/approval_rules', {
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

    expect(RequestHelper.post()).toHaveBeenCalledWith(
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

describe('MergeRequestApprovals.editApprovalRule', () => {
  it('should request PUT /projects/:id/approval_rules/:approval_rule_id without options', async () => {
    await service.editApprovalRule(2, 30, 'Some rule', 5);

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/2/approval_rules/30', {
      name: 'Some rule',
      approvalsRequired: 5
    });
  });

  it('should request PUT /projects/:id/approval_rules/:approval_rule_id', async () => {
    await service.editApprovalRule(2, 30, 'Some rule', 5, {
      userIds: [1, 2],
      groupIds: [3, 4],
      protectedBranchIds: [5, 6],
    });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/2/approval_rules/30', {
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

    expect(RequestHelper.put()).toHaveBeenCalledWith(
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

describe('MergeRequestApprovals.removeApprovalRule', () => {
  it('should request DELETE /projects/:id/approval_rules/:approval_rule_id', async () => {
    await service.removeApprovalRule(2, 30);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/2/approval_rules/30');
  });

  it('should request DELETE /projects/:id/merge_requests/:merge_request_iid/approval_rules/:approval_rule_id when mergerequestIid is passed', async () => {
    await service.removeApprovalRule(2, 30, { mergerequestIid: 3 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/approval_rules/30',
    );
  });
});

describe('MergeRequestApprovals.approvalState', () => {
  it('should request GET /projects/:id/merge_requests/:merge_request_iid/approval_state', async () => {
    await service.approvalState(2, 3);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/approval_state',
      undefined,
    );
  });
});

describe('MergeRequestApprovals.approve', () => {
  it('should request POST /projects/:id/merge_requests/:merge_request_iid/approve', async () => {
    await service.approve(2, 3);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/approve',
      undefined,
    );
  });
});

describe('MergeRequestApprovals.unapprove', () => {
  it('should request POST /projects/:id/merge_requests/:merge_request_iid/unapprove', async () => {
    await service.unapprove(2, 3);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/unapprove',
      undefined,
    );
  });
});
