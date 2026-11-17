import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { PlanLimits } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: PlanLimits;

beforeEach(() => {
  service = new PlanLimits({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('PlanLimits.show', () => {
  it('should request GET /application/plan_limits', async () => {
    await service.show({ planName: 'default' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'application/plan_limits', {
      sudo: undefined,
      showExpanded: undefined,
      searchParams: { planName: 'default' },
    });
  });
});

describe('PlanLimits.edit', () => {
  it('should request PUT /application/plan_limits', async () => {
    await service.edit({ planName: 'default', ciPipelineSize: 5 });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'application/plan_limits', {
      sudo: undefined,
      showExpanded: undefined,
      body: { planName: 'default', ciPipelineSize: 5 },
    });
  });
});

describe('PlanLimits.show without options', () => {
  it('should send empty searchParams', async () => {
    await service.show();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'application/plan_limits', {
      sudo: undefined,
      showExpanded: undefined,
      searchParams: {},
    });
  });
});
