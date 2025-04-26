import { ResourceProtectedEnvironments } from '../../../src/templates';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: ResourceProtectedEnvironments;

beforeEach(() => {
  service = new ResourceProtectedEnvironments('resource', {
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  jest.clearAllMocks();
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

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      '5/protected_environments',
      undefined,
    );
  });

  it('should call the correct url for getting all protected environments with a number identifier', async () => {
    await service.all(5);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      '5/protected_environments',
      undefined,
    );
  });
});

describe('ResourceProtectedEnvironments.create', () => {
  it('should call the correct url for creating a protected environment', async () => {
    const deployAccessLevels = [{ accessLevel: 30 }];
    await service.create('5', 'test-env', deployAccessLevels);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '5/protected_environments', {
      name: 'test-env',
      deployAccessLevels,
    });
  });
});

describe('ResourceProtectedEnvironments.edit', () => {
  it('should call the correct url for editing a protected environment', async () => {
    const deployAccessLevels = [{ accessLevel: 30 }];

    await service.edit('5', 'test-env', { deployAccessLevels });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, '5/protected_environments/test-env', {
      deployAccessLevels,
    });
  });
});

describe('ResourceProtectedEnvironments.show', () => {
  it('should call the correct url for showing a protected environment', async () => {
    await service.show('5', 'test-env');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      '5/protected_environments/test-env',
      undefined,
    );
  });
});

describe('ResourceProtectedEnvironments.remove', () => {
  it('should call the correct url for removing a protected environment', async () => {
    await service.remove('5', 'test-env');

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      '5/protected_environments/test-env',
      undefined,
    );
  });
});
