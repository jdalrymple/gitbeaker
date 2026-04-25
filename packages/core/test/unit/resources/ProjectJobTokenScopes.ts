import { RequestHelper } from '../../../src/infrastructure';
import { ProjectJobTokenScopes } from '../../../src/resources/ProjectJobTokenScopes';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ProjectJobTokenScopes;

beforeEach(() => {
  service = new ProjectJobTokenScopes({
    requesterFn: vi.fn(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  vi.clearAllMocks();
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

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/5/job_token_scope', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectJobTokenScopes.edit', () => {
  it('should call the correct url with a resource id and resource id', async () => {
    await service.edit('5', true);

    expect(RequestHelper.patch()).toHaveBeenCalledWith(service, 'projects/5/job_token_scope', {
      body: { enabled: true },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectJobTokenScopes.showInboundAllowList', () => {
  it('should call the correct url with a resource id', async () => {
    await service.showInboundAllowList('5');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/5/job_token_scope/allowlist',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ProjectJobTokenScopes.addToInboundAllowList', () => {
  it('should call the correct resource and targetResource id', async () => {
    await service.addToInboundAllowList('5', 6);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/5/job_token_scope/allowlist',
      {
        body: { targetProjectId: 6 },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('ProjectJobTokenScopes.removeFromInboundAllowList', () => {
  it('should call the correct resource and targetResource id', async () => {
    await service.removeFromInboundAllowList('5', 6);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/5/job_token_scope/allowlist/6',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ProjectJobTokenScopes.showGroupsAllowList', () => {
  it('should call the correct url with a resource id', async () => {
    await service.showGroupsAllowList('5');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/5/job_token_scope/groups_allowlist',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ProjectJobTokenScopes.addToGroupsAllowList', () => {
  it('should call the correct resource and targetResource id', async () => {
    await service.addToGroupsAllowList('5', 6);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/5/job_token_scope/groups_allowlist',
      {
        body: { targetGroupId: 6 },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('ProjectJobTokenScopes.removeFromGroupsAllowList', () => {
  it('should call the correct resource and targetResource id', async () => {
    await service.removeFromGroupsAllowList('5', 6);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/5/job_token_scope/groups_allowlist/6',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});
