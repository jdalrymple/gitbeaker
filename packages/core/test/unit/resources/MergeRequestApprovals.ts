import { MergeRequestApprovals } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: MergeRequestApprovals;

beforeEach(() => {
  service = new MergeRequestApprovals({
    requesterFn: vi.fn(),
    token: 'abcdefg',
  });
  jest.clearAllMocks();
});

describe('MergeRequestApprovals.showConfiguration', () => {
  it('should request GET /projects/:id/approvals without options', async () => {
    await service.showConfiguration(3);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/3/approvals', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /projects/:id/approvals', async () => {
    await service.showConfiguration(3, { sudo: 'sudo' });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/3/approvals', {
      showExpanded: undefined,
      sudo: 'sudo',
    });
  });

  it('should request GET /projects/:id/merge_requests/:merge_request_iid/approvals when mergerequestIId Id is passed', async () => {
    await service.showConfiguration(3, { mergerequestIId: 1 });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(
      service,
      'projects/3/merge_requests/1/approvals',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('MergeRequestApprovals.editConfiguration', () => {
  it('should request POST /projects/:id/approvals without options', async () => {
    await service.editConfiguration(3);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/3/approvals', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request POST /projects/:id/approvals', async () => {
    await service.editConfiguration(3, { requirePasswordToApprove: true });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/3/approvals', {
      body: { requirePasswordToApprove: true },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('MergeRequestApprovals.showApprovalRule', () => {
  it('should request GET /projects/:id/approval_rules/:approval_rule_id', async () => {
    await service.showApprovalRule(2, 4);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/2/approval_rules/4', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('MergeRequestApprovals.allApprovalRules', () => {
  it('should request GET /projects/:id/approval_rules without options', async () => {
    await service.allApprovalRules(2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/2/approval_rules', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /projects/:id/approval_rules', async () => {
    await service.allApprovalRules(2);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/2/approval_rules', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /projects/:id/merge_requests/:merge_request_iid/approval_rules when mergerequestIId is passed', async () => {
    await service.allApprovalRules(2, { mergerequestIId: 1 });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(
      service,
      'projects/2/merge_requests/1/approval_rules',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('MergeRequestApprovals.createApprovalRule', () => {
  it('should request POST /projects/:id/approval_rules without options', async () => {
    await service.createApprovalRule(2, 'Some rule', 5);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/2/approval_rules', {
      body: { name: 'Some rule', approvalsRequired: 5 },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request POST /projects/:id/approval_rules', async () => {
    await service.createApprovalRule(2, 'Some rule', 5, {
      userIds: [1, 2],
      groupIds: [3, 4],
      protectedBranchIds: [5, 6],
    });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/2/approval_rules', {
      body: {
        name: 'Some rule',
        approvalsRequired: 5,
        userIds: [1, 2],
        groupIds: [3, 4],
        protectedBranchIds: [5, 6],
      },
      showExpanded: undefined,
      sudo: undefined,
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
        body: { name: 'Some rule', approvalsRequired: 5, userIds: [1, 2], groupIds: [3, 4] },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('MergeRequestApprovals.editApprovalRule', () => {
  it('should request PUT /projects/:id/approval_rules/:approval_rule_id without options', async () => {
    await service.editApprovalRule(2, 30, 'Some rule', 5);

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/2/approval_rules/30', {
      body: { name: 'Some rule', approvalsRequired: 5 },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request PUT /projects/:id/approval_rules/:approval_rule_id', async () => {
    await service.editApprovalRule(2, 30, 'Some rule', 5, {
      userIds: [1, 2],
      groupIds: [3, 4],
      protectedBranchIds: [5, 6],
    });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/2/approval_rules/30', {
      body: {
        name: 'Some rule',
        approvalsRequired: 5,
        userIds: [1, 2],
        groupIds: [3, 4],
        protectedBranchIds: [5, 6],
      },
      showExpanded: undefined,
      sudo: undefined,
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
        body: { name: 'Some rule', approvalsRequired: 5, userIds: [1, 2], groupIds: [3, 4] },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('MergeRequestApprovals.removeApprovalRule', () => {
  it('should request DELETE /projects/:id/approval_rules/:approval_rule_id', async () => {
    await service.removeApprovalRule(2, 30);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/2/approval_rules/30', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request DELETE /projects/:id/merge_requests/:merge_request_iid/approval_rules/:approval_rule_id when mergerequestIId is passed', async () => {
    await service.removeApprovalRule(2, 30, { mergerequestIId: 3 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/approval_rules/30',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('MergeRequestApprovals.showApprovalState', () => {
  it('should request GET /projects/:id/merge_requests/:merge_request_iid/approval_state', async () => {
    await service.showApprovalState(2, 3);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/approval_state',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('MergeRequestApprovals.approve', () => {
  it('should request POST /projects/:id/merge_requests/:merge_request_iid/approve', async () => {
    await service.approve(2, 3);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/approve',
      { body: {}, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('MergeRequestApprovals.unapprove', () => {
  it('should request POST /projects/:id/merge_requests/:merge_request_iid/unapprove', async () => {
    await service.unapprove(2, 3);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/unapprove',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});
