import { ProjectJobTokenScopes } from '../../../src/resources/ProjectJobTokenScopes';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: ProjectJobTokenScopes;

beforeEach(() => {
  service = new ProjectJobTokenScopes({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Instantiating ProjectJobTokenScopes service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(ProjectJobTokenScopes);
    expect(service.url).toBeDefined();
  });
});

describe('ProjectJobTokenScopes.show', () => {
  it('should call the correct url with a resource id', async () => {
    await service.show(5);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/job_token_scope', undefined);
  });
});

describe('ProjectJobTokenScopes.edit', () => {
  it('should call the correct url with a resource id and resource id', async () => {
    await service.edit('5', true);

    expect(RequestHelper.patch()).toHaveBeenCalledWith(service, '5/job_token_scope', {
      enabled: true,
    });
  });
});

describe('ProjectJobTokenScopes.showInboundAllowList', () => {
  it('should call the correct url with a resource id', async () => {
    await service.showInboundAllowList('5');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      '5/job_token_scope/allowlist',
      undefined,
    );
  });
});

describe('ProjectJobTokenScopes.addToInboundAllowList', () => {
  it('should call the correct resource and targetResource id', async () => {
    await service.addToInboundAllowList('5', 6);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '5/job_token_scope/allowlist', {
      targetProjectId: 6,
    });
  });
});

describe('ProjectJobTokenScopes.removeFromInboundAllowList', () => {
  it('should call the correct resource and targetResource id', async () => {
    await service.removeFromInboundAllowList('5', 6);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      '5/job_token_scope/allowlist/6',
      undefined,
    );
  });
});

describe('ProjectJobTokenScopes.showGroupsAllowList', () => {
  it('should call the correct url with a resource id', async () => {
    await service.showGroupsAllowList('5');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      '5/job_token_scope/groups_allowlist',
      undefined,
    );
  });
});

describe('ProjectJobTokenScopes.addToGroupsAllowList', () => {
  it('should call the correct resource and targetResource id', async () => {
    await service.addToGroupsAllowList('5', 6);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      '5/job_token_scope/groups_allowlist',
      { targetGroupId: 6 },
    );
  });
});

describe('ProjectJobTokenScopes.removeFromGroupsAllowList', () => {
  it('should call the correct resource and targetResource id', async () => {
    await service.removeFromGroupsAllowList('5', 6);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      '5/job_token_scope/groups_allowlist/6',
      undefined,
    );
  });
});
