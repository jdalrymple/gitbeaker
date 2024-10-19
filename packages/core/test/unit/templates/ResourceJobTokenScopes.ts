import { ResourceJobTokenScopes } from '../../../src/templates';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: ResourceJobTokenScopes;

beforeEach(() => {
  service = new ResourceJobTokenScopes('resource', {
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Instantiating ResourceJobTokenScopes service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(ResourceJobTokenScopes);
    expect(service.url).toBeDefined();
    expect(service.url).toContain('resource');
  });
});

describe('ResourceJobTokenScopes.show', () => {
  it('should call the correct url with a resource id', async () => {
    await service.show(5);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/job_token_scope', undefined);
  });
});

describe('ResourceJobTokenScopes.edit', () => {
  it('should call the correct url with a resource id and resource id', async () => {
    await service.edit('5', true);

    expect(RequestHelper.patch()).toHaveBeenCalledWith(service, '5/job_token_scope', {
      enabled: true,
    });
  });
});

describe('ResourceJobTokenScopes.showInboundAllowList', () => {
  it('should call the correct url with a resource id', async () => {
    await service.showInboundAllowList('5');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      '5/job_token_scope/allowlist',
      undefined,
    );
  });
});

describe('ResourceJobTokenScopes.addToInboundAllowList', () => {
  it('should call the correct resource and targetResource id', async () => {
    await service.addToInboundAllowList('5', 6);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      '5/job_token_scope/allowlist/6',
      undefined,
    );
  });
});

describe('ResourceJobTokenScopes.removeFromInboundAllowList', () => {
  it('should call the correct resource and targetResource id', async () => {
    await service.removeFromInboundAllowList('5', 6);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      '5/job_token_scope/allowlist/6',
      undefined,
    );
  });
});
