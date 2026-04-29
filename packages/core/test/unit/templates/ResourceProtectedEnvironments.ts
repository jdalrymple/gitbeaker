import { RequestHelper } from '../../../src/infrastructure';
import { RequesterFn } from '@gitbeaker/requester-utils';
import { ResourceProtectedEnvironments } from '../../../src/templates';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ResourceProtectedEnvironments;

beforeEach(() => {
  service = new ResourceProtectedEnvironments('resource', {
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Instantiating ResourceProtectedEnvironments service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(ResourceProtectedEnvironments);
    expect(service.url).toBeDefined();
    expect(service.url).toContain('resource');
  });
});

describe('ResourceProtectedEnvironments.all', () => {
  it('should call the correct url for getting all protected environments with a string identifier', async () => {
    await service.all('5');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/protected_environments', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should call the correct url for getting all protected environments with a number identifier', async () => {
    await service.all(5);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/protected_environments', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceProtectedEnvironments.create', () => {
  it('should call the correct url for creating a protected environment', async () => {
    const deployAccessLevels = [{ accessLevel: 30 }];
    await service.create('5', 'test-env', deployAccessLevels);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '5/protected_environments', {
      body: {
        name: 'test-env',
        deployAccessLevels,
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceProtectedEnvironments.edit', () => {
  it('should call the correct url for editing a protected environment', async () => {
    const deployAccessLevels = [{ accessLevel: 30 }];

    await service.edit('5', 'test-env', { deployAccessLevels });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, '5/protected_environments/test-env', {
      body: {
        deployAccessLevels,
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceProtectedEnvironments.show', () => {
  it('should call the correct url for showing a protected environment', async () => {
    await service.show('5', 'test-env');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/protected_environments/test-env', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceProtectedEnvironments.remove', () => {
  it('should call the correct url for removing a protected environment', async () => {
    await service.remove('5', 'test-env');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, '5/protected_environments/test-env', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
