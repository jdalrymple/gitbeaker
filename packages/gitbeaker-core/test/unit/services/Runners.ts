import { RequesterType } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../../../src/infrastructure';
import { Runners } from '../../../src';

jest.mock('../../../src/infrastructure/RequestHelper');

let service: Runners;

beforeEach(() => {
  const requester = {
    get: jest.fn(() => Promise.resolve([])),
    post: jest.fn(() => Promise.resolve({})),
    put: jest.fn(() => Promise.resolve({})),
    delete: jest.fn(() => Promise.resolve({})),
  } as RequesterType;

  service = new Runners({
    requester,
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating Runners service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(Runners);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('Runners.all', () => {
  it('should request GET /runners/all', async () => {
    await service.all();

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'runners/all', {});
  });

  it('should request GET /projects/:id/runners', async () => {
    await service.all({ projectId: 1 });

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'projects/1/runners', {});
  });
});

describe('Runners.allOwned', () => {
  it('should request GET /runners', async () => {
    await service.allOwned();

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'runners', undefined);
  });
});

describe('Runners.edit', () => {
  it('should request PUT /runners/:id', async () => {
    await service.edit(2);

    expect(RequestHelper.put).toHaveBeenCalledWith(service, 'runners/2', undefined);
  });
});

describe('Runners.enable', () => {
  it('should request POST /projects/:id/runners', async () => {
    await service.enable(1, 2);

    expect(RequestHelper.post).toHaveBeenCalledWith(service, 'projects/1/runners', {
      runnerId: '2',
    });
  });
});

describe('Runners.disable', () => {
  it('should request DELETE /projects/:id/runners/:id', async () => {
    await service.disable(1, 2);

    expect(RequestHelper.del).toHaveBeenCalledWith(service, 'projects/1/runners/2', undefined);
  });
});

describe('Runners.jobs', () => {
  it('should request GET /runners/:id/jobs', async () => {
    await service.jobs(1);

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'runners/1/jobs', undefined);
  });
});

describe('Runners.remove', () => {
  it('should request DEL /runners/:id', async () => {
    await service.remove(2);

    expect(RequestHelper.del).toHaveBeenCalledWith(service, 'runners/2', undefined);
  });
});

describe('Runners.show', () => {
  it('should request GET /runners/:id', async () => {
    await service.show(1);

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'runners/1', undefined);
  });
});
