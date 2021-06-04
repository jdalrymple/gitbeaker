import { ResourceDeployTokens } from '../../../src/templates';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: ResourceDeployTokens;

beforeEach(() => {
  service = new ResourceDeployTokens('resource', {
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Instantiating ResourceDeployTokens service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(ResourceDeployTokens);
    expect(service.url).toBeDefined();
    expect(service.url).toContain('resource');
  });
});

describe('ResourceDeployTokens.add', () => {
  it('should call the correct url with a resource id, token name and scope', async () => {
    await service.add('5', 'token', ['read_repository']);

    expect(RequestHelper.post()).toBeCalledWith(service, '5/deploy_tokens', {
      name: 'token',
      scopes: ['read_repository'],
    });
  });
});

describe('ResourceDeployTokens.all', () => {
  it('should request GET /deploy_tokens', async () => {
    await service.all();

    expect(RequestHelper.get()).toBeCalledWith(service, 'deploy_tokens', {});
  });

  it('should request GET /5/deploy_tokens with resourceId', async () => {
    await service.all({ resourceId: 5 });

    expect(RequestHelper.get()).toBeCalledWith(service, '5/deploy_tokens', {});
  });

  it('should request GET /5/deploy_tokens with groupId', async () => {
    await service.all({ groupId: 5 });

    expect(RequestHelper.get()).toBeCalledWith(service, '5/deploy_tokens', {});
  });

  it('should request GET /5/deploy_tokens with projectId', async () => {
    await service.all({ projectId: 5 });

    expect(RequestHelper.get()).toBeCalledWith(service, '5/deploy_tokens', {});
  });
});

describe('ResourceDeployTokens.remove', () => {
  it('should request DEL /5/deploy_tokens/6', async () => {
    await service.remove('5', 6);

    expect(RequestHelper.del()).toBeCalledWith(service, '5/deploy_tokens/6', undefined);
  });
});
