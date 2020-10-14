import { RequesterType } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../../../src/infrastructure';
import { FreezePeriods } from '../../../src';

jest.mock('../../../src/infrastructure/RequestHelper');

let service: FreezePeriods;

beforeEach(() => {
  const requester = {
    get: jest.fn(() => Promise.resolve([])),
    post: jest.fn(() => Promise.resolve({})),
    put: jest.fn(() => Promise.resolve({})),
    delete: jest.fn(() => Promise.resolve({})),
  } as RequesterType;

  service = new FreezePeriods({
    requester,
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating FreezePeriods service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(FreezePeriods);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('FreezePeriods.all', () => {
  it('should request GET /projects/:id/freeze_periods', async () => {
    await service.all(1);

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'projects/1/freeze_periods', undefined);
  });
});

describe('FreezePeriods.show', () => {
  it('should request GET /projects/:id/freeze_periods/:freeze_period_id', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get).toHaveBeenCalledWith(
      service,
      'projects/1/freeze_periods/2',
      undefined,
    );
  });
});

describe('FreezePeriods.create', () => {
  it('should request POST projects/:id/freeze_periods', async () => {
    await service.create(1, '* * * * *', '* * * * *', { cronTimezone: 'UTC' });

    expect(RequestHelper.post).toHaveBeenCalledWith(service, 'projects/1/freeze_periods', {
      freezeStart: '* * * * *',
      freezeEnd: '* * * * *',
      cronTimezone: 'UTC',
    });
  });
});

describe('FreezePeriods.edit', () => {
  it('should request PUT projects/:id/freeze_periods/:freeze_period_id', async () => {
    await service.edit(1, 2, { freezeStart: '* * * * *' });

    expect(RequestHelper.put).toHaveBeenCalledWith(service, 'projects/1/freeze_periods/2', {
      freezeStart: '* * * * *',
    });
  });
});

describe('FreezePeriods.delete', () => {
  it('should request DELETE projects/:id/freeze_periods/:freeze_period_id', async () => {
    await service.delete(1, 2);

    expect(RequestHelper.del).toHaveBeenCalledWith(
      service,
      'projects/1/freeze_periods/2',
      undefined,
    );
  });
});
