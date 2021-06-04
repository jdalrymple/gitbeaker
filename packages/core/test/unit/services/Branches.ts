import { RequestHelper } from '../../../src/infrastructure';
import { Branches } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: Branches;

beforeEach(() => {
  service = new Branches({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating Branches service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(Branches);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('Branches.all', () => {
  it('should request GET /projects/:id/repository/branches', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/branches',
      undefined,
    );
  });
});

describe('Branches.create', () => {
  it('should request POST /projects/:id/repository/branches in v4', async () => {
    await service.create(1, 'name', 'ref');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/repository/branches', {
      branch: 'name',
      ref: 'ref',
    });
  });

  it('should request POST /projects/:id/repository/branches in v3', async () => {
    const v3Service = new Branches({
      requesterFn: jest.fn(),
      token: 'abcdefg',
      requestTimeout: 3000,
      version: 3,
    });

    await v3Service.create(1, 'name', 'ref');

    expect(RequestHelper.post()).toHaveBeenCalledWith(v3Service, 'projects/1/repository/branches', {
      branchName: 'name',
      ref: 'ref',
    });
  });
});

describe('Branches.remove', () => {
  it('should request DEL /projects/:id/repository/branches/:name', async () => {
    await service.remove(1, 'name');

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/branches/name',
      undefined,
    );
  });
});

describe('Branches.show', () => {
  it('should request GET /projects/:id/repository/branches/:name', async () => {
    await service.show(1, 'name');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/branches/name',
      undefined,
    );
  });
});
