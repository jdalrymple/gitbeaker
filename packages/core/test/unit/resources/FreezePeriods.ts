import { FreezePeriods } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: FreezePeriods;

beforeEach(() => {
  service = new FreezePeriods({
    requesterFn: vi.fn(),
    token: 'abcdefg',
  });
});

describe('FreezePeriods.all', () => {
  it('should request GET /projects/:id/freeze_periods', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/freeze_periods', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('FreezePeriods.show', () => {
  it('should request GET /projects/:id/freeze_periods/:freeze_period_id', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/freeze_periods/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('FreezePeriods.create', () => {
  it('should request POST projects/:id/freeze_periods', async () => {
    await service.create(1, '* * * * *', '* * * * *', { cronTimezone: 'UTC' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/freeze_periods', {
      body: {
        freezeStart: '* * * * *',
        freezeEnd: '* * * * *',
        cronTimezone: 'UTC',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('FreezePeriods.edit', () => {
  it('should request PUT projects/:id/freeze_periods/:freeze_period_id', async () => {
    await service.edit(1, 2, { freezeStart: '* * * * *' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/freeze_periods/2', {
      body: {
        freezeStart: '* * * * *',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('FreezePeriods.delete', () => {
  it('should request DELETE projects/:id/freeze_periods/:freeze_period_id', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/freeze_periods/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
