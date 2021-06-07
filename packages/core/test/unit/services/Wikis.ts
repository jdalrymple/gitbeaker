import { RequestHelper } from '../../../src/infrastructure';
import { Wikis } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: Wikis;

beforeEach(() => {
  service = new Wikis({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating Wikis service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(Wikis);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('Wikis.all', () => {
  it('should request GET /projects/:id/wikis', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/wikis', undefined);
  });
});

describe('Wikis.create', () => {
  it('should request POST /projects/:id/wikis', async () => {
    await service.create(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/wikis', undefined);
  });
});

describe('Wikis.edit', () => {
  it('should request PUT /projects/:id/wikis/:slug', async () => {
    await service.edit(1, 'slug');

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/wikis/slug', undefined);
  });
});

describe('Wikis.show', () => {
  it('should request GET /projects/:id/wikis/:slug', async () => {
    await service.show(1, 'slug');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/wikis/slug', undefined);
  });
});

describe('Wikis.remove', () => {
  it('should request DEL /projects/:id/wikis/:slug', async () => {
    await service.remove(1, 'slug');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/wikis/slug', undefined);
  });
});
