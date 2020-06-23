import { RequesterType } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../../../src/infrastructure';
import { Environments } from '../../../src';

jest.mock('../../../src/infrastructure/RequestHelper');

let service: Environments;

beforeEach(() => {
  const requester = {
    get: jest.fn(() => Promise.resolve([])),
    post: jest.fn(() => Promise.resolve({})),
    put: jest.fn(() => Promise.resolve({})),
    delete: jest.fn(() => Promise.resolve({})),
  } as RequesterType;

  service = new Environments({
    requester,
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating Environments service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(Environments);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('Environments.all', () => {
  it('should request GET /projects/:id/environments', async () => {
    await service.all(1);

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'projects/1/environments', undefined);
  });
});

describe('Environments.create', () => {
  it('should request POST /projects/:id/environments', async () => {
    await service.create(1, { prop: 1 });

    expect(RequestHelper.post).toHaveBeenCalledWith(service, 'projects/1/environments', {
      prop: 1,
    });
  });
});

describe('Environments.edit', () => {
  it('should request PUT /projects/:id/environments', async () => {
    await service.edit(1, 2);

    expect(RequestHelper.put).toHaveBeenCalledWith(service, 'projects/1/environments/2', undefined);
  });
});

describe('Environments.show', () => {
  it('should request GET /projects/:id/environments/:id', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'projects/1/environments/2', undefined);
  });
});

describe('Environments.remove', () => {
  it('should request DEL /projects/:id/environments/:id', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del).toHaveBeenCalledWith(service, 'projects/1/environments/2', undefined);
  });
});

describe('Environments.stop', () => {
  it('should request POST /projects/:id/environments/:id/stop', async () => {
    await service.stop(1, 2);

    expect(RequestHelper.post).toHaveBeenCalledWith(
      service,
      'projects/1/environments/2/stop',
      undefined,
    );
  });
});
