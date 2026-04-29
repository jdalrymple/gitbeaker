import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ApplicationPlanLimits } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ApplicationPlanLimits;

beforeEach(() => {
  service = new ApplicationPlanLimits({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('ApplicationPlanLimits.show', () => {
  it('should request GET /application/plan_limits', async () => {
    await service.show();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'application/plan_limits', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ApplicationPlanLimits.edit', () => {
  it('should request PUT /application/plan_limits with a terms property', async () => {
    await service.edit('Plan name');

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'application/plan_limits', {
      searchParams: {
        planName: 'Plan name',
      },
    });
  });
});
