import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GroupSecuritySettings } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: GroupSecuritySettings;

beforeEach(() => {
  service = new GroupSecuritySettings({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('GroupSecuritySettings.edit', () => {
  it('should request PUT /groups/1/security_settings', async () => {
    await service.edit(1, true, { projectsToExclude: [2, 3] });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'groups/1/security_settings', {
      sudo: undefined,
      showExpanded: undefined,
      body: { projectsToExclude: [2, 3], secretPushProtectionEnabled: true },
    });
  });
});
