import { RequestHelper } from '../../../src/infrastructure';
import { FreezePeriods } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: FreezePeriods;

beforeEach(() => {
  service = new FreezePeriods({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('FreezePeriods.all', () => {
  it('should request GET /projects/:id/freeze_periods', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/freeze_periods',
      undefined,
    );
  });
});

describe('FreezePeriods.show', () => {
  it('should request GET /projects/:id/freeze_periods/:freeze_period_id', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/freeze_periods/2',
      undefined,
    );
  });
});

describe('FreezePeriods.create', () => {
  it('should request POST projects/:id/freeze_periods', async () => {
    await service.create(1, '* * * * *', '* * * * *', { cronTimezone: 'UTC' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/freeze_periods', {
      freezeStart: '* * * * *',
      freezeEnd: '* * * * *',
      cronTimezone: 'UTC',
    });
  });
});

describe('FreezePeriods.edit', () => {
  it('should request PUT projects/:id/freeze_periods/:freeze_period_id', async () => {
    await service.edit(1, 2, { freezeStart: '* * * * *' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/freeze_periods/2', {
      freezeStart: '* * * * *',
    });
  });
});

describe('FreezePeriods.delete', () => {
  it('should request DELETE projects/:id/freeze_periods/:freeze_period_id', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/freeze_periods/2',
      undefined,
    );
  });
});
