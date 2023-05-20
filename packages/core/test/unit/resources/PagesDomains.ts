import { RequestHelper } from '../../../src/infrastructure';
import { PagesDomains } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: PagesDomains;

beforeEach(() => {
  service = new PagesDomains({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('PagesDomains.all', () => {
  it('should request GET /projects/:id/pages/domains', async () => {
    await service.all({ projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/pages/domains', {});
  });

  it('should request GET /pages/domains', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'pages/domains', {});
  });
});

describe('PagesDomains.create', () => {
  it('should request POST /projects/:id/pages/domains', async () => {
    await service.create(1, 'domain');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/pages/domains', {
      domain: 'domain',
    });
  });
});

describe('PagesDomains.edit', () => {
  it('should request PUT /projects/:id/pages/domains/:domain', async () => {
    await service.edit(1, 'domain');

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'projects/1/pages/domains/domain',
      undefined,
    );
  });
});

describe('PagesDomains.show', () => {
  it('should request GET /projects/:id/pages/domains/:domain', async () => {
    await service.show(1, 'domain');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/pages/domains/domain',
      undefined,
    );
  });
});

describe('PagesDomains.remove', () => {
  it('should request DEL /projects/:id/pages/domains/:domain', async () => {
    await service.remove(1, 'domain');

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/pages/domains/domain',
      undefined,
    );
  });
});
