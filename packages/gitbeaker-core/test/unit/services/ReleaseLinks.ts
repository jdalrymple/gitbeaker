import { RequesterType } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../../../src/infrastructure';
import { ReleaseLinks } from '../../../src';

jest.mock('../../../src/infrastructure/RequestHelper');

let service: ReleaseLinks;

beforeEach(() => {
  const requester = {
    get: jest.fn(() => Promise.resolve([])),
    post: jest.fn(() => Promise.resolve({})),
    put: jest.fn(() => Promise.resolve({})),
    delete: jest.fn(() => Promise.resolve({})),
  } as RequesterType;

  service = new ReleaseLinks({
    requester,
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating ReleaseLinks service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(ReleaseLinks);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('ReleaseLinks.all', () => {
  it('should request GET /projects/:id/releases/:id/assets/links', async () => {
    await service.all(1, 'tag');

    expect(RequestHelper.get).toHaveBeenCalledWith(
      service,
      'projects/1/releases/tag/assets/links',
      undefined,
    );
  });
});

describe('ReleaseLinks.create', () => {
  it('should request POST /projects/:id/releases/:id/assets/links', async () => {
    await service.create(1, 'tag', 'name', 'url');

    expect(RequestHelper.post).toHaveBeenCalledWith(
      service,
      'projects/1/releases/tag/assets/links',
      { name: 'name', url: 'url' },
    );
  });
});

describe('ReleaseLinks.edit', () => {
  it('should request PUT /projects/:id/releases/:id/assets/links/:id', async () => {
    await service.edit(1, 'tag', 2, { name: 'new name' });

    expect(RequestHelper.put).toHaveBeenCalledWith(
      service,
      'projects/1/releases/tag/assets/links/2',
      { name: 'new name' },
    );
  });
});

describe('ReleaseLinks.remove', () => {
  it('should request DELETE /projects/:id/releases/:id/assets/links/:id', async () => {
    await service.remove(1, 'tag', 2);

    expect(RequestHelper.del).toHaveBeenCalledWith(
      service,
      'projects/1/releases/tag/assets/links/2',
      undefined,
    );
  });
});

describe('ReleaseLinks.show', () => {
  it('should request GET /projects/:id/releases/:id/assets/links/:id', async () => {
    await service.show(1, 'tag', 2);

    expect(RequestHelper.get).toHaveBeenCalledWith(
      service,
      'projects/1/releases/tag/assets/links/2',
      undefined,
    );
  });
});
