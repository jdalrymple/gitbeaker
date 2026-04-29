import { RequestHelper } from '../../../src/infrastructure';
import { RequesterFn } from '@gitbeaker/requester-utils';
import { ResourceAccessRequests } from '../../../src/templates';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ResourceAccessRequests;

beforeEach(() => {
  service = new ResourceAccessRequests('resource', {
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Instantiating ResourceAccessRequests service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(ResourceAccessRequests);
    expect(service.url).toBeDefined();
    expect(service.url).toContain('resource');
  });
});

describe('ResourceAccessRequests.all', () => {
  it('should call the correct url for getting all access requests with a string identifer', async () => {
    await service.all('5');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/access_requests', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should call the correct url for getting all access requests with a number identifer', async () => {
    await service.all(5);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/access_requests', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceAccessRequests.request', () => {
  it('should call the correct url for requesting access requests with a string identifer', async () => {
    await service.request('5');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '5/access_requests', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should call the correct url for requesting access requests with a number identifer', async () => {
    await service.request(5);

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, '5/access_requests', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceAccessRequests.approve', () => {
  it('should call the correct url for approving access requests with the resource id and user id', async () => {
    await service.approve('5', 1);

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, '5/access_requests/1/approve', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should accept the correct access levels', async () => {
    await service.approve(5, 1, { accessLevel: 20 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '5/access_requests/1/approve', {
      body: {
        accessLevel: 20,
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should allow for sudo calls', async () => {
    await service.approve(5, 1, { sudo: 'test' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '5/access_requests/1/approve', {
      body: {},
      showExpanded: undefined,
      sudo: 'test',
    });
  });
});

describe('ResourceAccessRequests.deny', () => {
  it('should call the correct url denying access requests with the resource id and user id', async () => {
    await service.deny('5', 1);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, '5/access_requests/1', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
