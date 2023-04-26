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

describe('MergeRequestApprovals.showConfiguration', () => {
  it('should request GET /projects/:id/approvals without options', async () => {
    await service.showConfiguration(3);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/3/approvals', {});
  });

  it('should request GET /projects/:id/approvals', async () => {
    await service.showConfiguration(3, { sudo: 'sudo' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/3/approvals', {
      sudo: 'sudo',
    });
  });

  it('should request GET /projects/:id/merge_requests/:merge_request_iid/approvals when mergerequestIId Id is passed', async () => {
    await service.showConfiguration(3, { mergerequestIId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/3/merge_requests/1/approvals',
      {},
    );
  });
});

describe('MergeRequestApprovals.editConfiguration', () => {
  it('should request POST /projects/:id/approvals without options', async () => {
    await service.editConfiguration(3);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/3/approvals', {});
  });

  it('should request POST /projects/:id/approvals', async () => {
    await service.editConfiguration(3, { requirePasswordToApprove: true });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/3/approvals', {
      requirePasswordToApprove: true,
    });
  });
});

describe('MergeRequestApprovals.showApprovalRule', () => {
  it('should request GET /projects/:id/approval_rules/:approval_rule_id', async () => {
    await service.showApprovalRule(2, 4);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/2/approval_rules/4',
      undefined,
    );
  });
});

describe('MergeRequestApprovals.allApprovalRules', () => {
  it('should request GET /projects/:id/approval_rules without options', async () => {
    await service.allApprovalRules(2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/2/approval_rules', {});
  });

  it('should request GET /projects/:id/approval_rules', async () => {
    await service.allApprovalRules(2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/2/approval_rules', {});
  });

  it('should request GET /projects/:id/merge_requests/:merge_request_iid/approval_rules when mergerequestIId is passed', async () => {
    await service.allApprovalRules(2, { mergerequestIId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/1/approval_rules',
      {},
    );
  });
});

describe('MergeRequestApprovals.createApprovalRule', () => {
  it('should request POST /projects/:id/approval_rules without options', async () => {
    await service.createApprovalRule(2, 'Some rule', 5);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/2/approval_rules', {
      name: 'Some rule',
      approvalsRequired: 5,
    });
  });

  it('should request POST /projects/:id/approval_rules', async () => {
    await service.createApprovalRule(2, 'Some rule', 5, {
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

  it('should request POST /projects/:id/merge_requests/:merge_request_iid/approval_rules when mergerequestIId is passed', async () => {
    await service.createApprovalRule(2, 'Some rule', 5, {
      mergerequestIId: 3,
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
      approvalsRequired: 5,
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

  it('should request PUT /projects/:id/merge_requests/:merge_request_iid/approval_rules/:approval_rule_id when mergerequestIId is passed', async () => {
    await service.editApprovalRule(2, 30, 'Some rule', 5, {
      mergerequestIId: 3,
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

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/2/approval_rules/30', {});
  });

  it('should request DELETE /projects/:id/merge_requests/:merge_request_iid/approval_rules/:approval_rule_id when mergerequestIId is passed', async () => {
    await service.removeApprovalRule(2, 30, { mergerequestIId: 3 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/approval_rules/30',
      {},
    );
  });
});

describe('MergeRequestApprovals.showApprovalState', () => {
  it('should request GET /projects/:id/merge_requests/:merge_request_iid/approval_state', async () => {
    await service.showApprovalState(2, 3);

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
