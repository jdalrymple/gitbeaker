import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { MergeRequestApprovalSettings } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: MergeRequestApprovalSettings;

beforeEach(() => {
  service = new MergeRequestApprovalSettings({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('MergeRequestApprovalSettings.show', () => {
  it('should request GET /projects/:id/merge_request_approval_setting', async () => {
    await service.show(1, { sudo: 'u', showExpanded: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/merge_request_approval_setting',
      { sudo: 'u', showExpanded: true },
    );
  });
});

describe('MergeRequestApprovalSettings.edit', () => {
  it('should request PUT /projects/:id/merge_request_approval_setting', async () => {
    await service.edit(1, { allowAuthorApproval: true, sudo: 'u', showExpanded: true });

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'projects/1/merge_request_approval_setting',
      { sudo: 'u', showExpanded: true, body: { allowAuthorApproval: true } },
    );
  });

  it('should work without options', async () => {
    await service.edit(1);

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'projects/1/merge_request_approval_setting',
      { sudo: undefined, showExpanded: undefined, body: {} },
    );
  });
});

describe('MergeRequestApprovalSettings.showGroup', () => {
  it('should request GET /groups/:id/merge_request_approval_setting', async () => {
    await service.showGroup(1, { sudo: 'u', showExpanded: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/1/merge_request_approval_setting',
      { sudo: 'u', showExpanded: true },
    );
  });
});

describe('MergeRequestApprovalSettings.editGroup', () => {
  it('should request PUT /groups/:id/merge_request_approval_setting', async () => {
    await service.editGroup(1, { retainApprovalsOnPush: false, sudo: 'u', showExpanded: true });

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'groups/1/merge_request_approval_setting',
      { sudo: 'u', showExpanded: true, body: { retainApprovalsOnPush: false } },
    );
  });
});
