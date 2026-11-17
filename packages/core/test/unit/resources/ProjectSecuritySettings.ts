import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ProjectSecuritySettings } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ProjectSecuritySettings;

beforeEach(() => {
  service = new ProjectSecuritySettings({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('ProjectSecuritySettings.show', () => {
  it('should request GET /projects/1/security_settings', async () => {
    await service.show(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/security_settings', {
      sudo: undefined,
      showExpanded: undefined,
    });
  });
});

describe('ProjectSecuritySettings.edit', () => {
  it('should request PUT /projects/1/security_settings', async () => {
    await service.edit(1, { secretPushProtectionEnabled: true });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/security_settings', {
      sudo: undefined,
      showExpanded: undefined,
      body: { secretPushProtectionEnabled: true },
    });
  });
});
