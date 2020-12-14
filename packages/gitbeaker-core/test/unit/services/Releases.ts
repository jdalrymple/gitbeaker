import { RequestHelper } from '../../../src/infrastructure';
import { Releases } from '../../../src';
import { mockRequesterFn } from '../../mocks/requesterFn';

jest.mock('../../../src/infrastructure/RequestHelper');

let service: Releases;

beforeEach(() => {
  service = new Releases({
    requesterFn: mockRequesterFn,
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating Releases service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(Releases);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('Releases.all', () => {
  it('should request GET /projects/:id/releases', async () => {
    await service.all(1);

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'projects/1/releases', undefined);
  });
});

describe('Releases.create', () => {
  it('should request POST /projects/:id/releases', async () => {
    await service.create(1, { prop: 1 });

    expect(RequestHelper.post).toHaveBeenCalledWith(service, 'projects/1/releases', {
      prop: 1,
    });
  });
});

describe('Releases.edit', () => {
  it('should request PUT /projects/:id/releases', async () => {
    await service.edit(1, '2');

    expect(RequestHelper.put).toHaveBeenCalledWith(service, 'projects/1/releases/2', undefined);
  });
});

describe('Releases.show', () => {
  it('should request GET /projects/:id/releases/:id', async () => {
    await service.show(1, '2');

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'projects/1/releases/2', undefined);
  });
});

describe('Releases.remove', () => {
  it('should request DEL /projects/:id/releases/:id', async () => {
    await service.remove(1, '2');

    expect(RequestHelper.del).toHaveBeenCalledWith(service, 'projects/1/releases/2', undefined);
  });
});
