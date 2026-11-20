import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ErrorTrackingSettings } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ErrorTrackingSettings;

beforeEach(() => {
  service = new ErrorTrackingSettings({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('ErrorTrackingSettings.create', () => {
  it('should request PUT /projects/:id/error_tracking/settings', async () => {
    await service.create(1, true, false, { sudo: 'u', showExpanded: true });

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'projects/1/error_tracking/settings',
      { sudo: 'u', showExpanded: true, searchParams: { active: true, integrated: false } },
    );
  });
});

describe('ErrorTrackingSettings.edit', () => {
  it('should request PATCH /projects/:id/error_tracking/settings', async () => {
    await service.edit(1, true, { integrated: true, sudo: 'u', showExpanded: true });

    expect(RequestHelper.patch()).toHaveBeenCalledWith(
      service,
      'projects/1/error_tracking/settings',
      { sudo: 'u', showExpanded: true, searchParams: { integrated: true, active: true } },
    );
  });

  it('should work without options', async () => {
    await service.edit(1, false);

    expect(RequestHelper.patch()).toHaveBeenCalledWith(
      service,
      'projects/1/error_tracking/settings',
      { sudo: undefined, showExpanded: undefined, searchParams: { active: false } },
    );
  });
});

describe('ErrorTrackingSettings.show', () => {
  it('should request GET /projects/:id/error_tracking/settings', async () => {
    await service.show('a/b', { sudo: 'u', showExpanded: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/a%2Fb/error_tracking/settings',
      { sudo: 'u', showExpanded: true },
    );
  });
});
