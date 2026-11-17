import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CompliancePolicySettings } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: CompliancePolicySettings;

beforeEach(() => {
  service = new CompliancePolicySettings({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('CompliancePolicySettings.show', () => {
  it('should request GET /admin/security/compliance_policy_settings', async () => {
    await service.show();

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'admin/security/compliance_policy_settings',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('CompliancePolicySettings.edit', () => {
  it('should request PUT /admin/security/compliance_policy_settings', async () => {
    await service.edit(5, { sudo: 'user', showExpanded: true });

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'admin/security/compliance_policy_settings',
      { body: { cspNamespaceId: 5 }, showExpanded: true, sudo: 'user' },
    );
  });

  it('should allow a null namespace id', async () => {
    await service.edit(null);

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'admin/security/compliance_policy_settings',
      { body: { cspNamespaceId: null }, showExpanded: undefined, sudo: undefined },
    );
  });
});
