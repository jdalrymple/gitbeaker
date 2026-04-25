import { PagesDomains } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: PagesDomains;

beforeEach(() => {
  service = new PagesDomains({
    requesterFn: vi.fn(),
    token: 'abcdefg',
  });
});

describe('PagesDomains.all', () => {
  it('should request GET /projects/:id/pages/domains', async () => {
    await service.all({ projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/pages/domains', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /pages/domains', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'pages/domains', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('PagesDomains.create', () => {
  it('should request POST /projects/:id/pages/domains', async () => {
    await service.create(1, 'domain');

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'projects/1/pages/domains', {
      body: {
        domain: 'domain',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('PagesDomains.edit', () => {
  it('should request PUT /projects/:id/pages/domains/:domain', async () => {
    await service.edit(1, 'domain');

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(
      service,
      'projects/1/pages/domains/domain',
      { body: {}, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('PagesDomains.show', () => {
  it('should request GET /projects/:id/pages/domains/:domain', async () => {
    await service.show(1, 'domain');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/pages/domains/domain', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('PagesDomains.remove', () => {
  it('should request DEL /projects/:id/pages/domains/:domain', async () => {
    await service.remove(1, 'domain');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/pages/domains/domain', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
