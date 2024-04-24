import { JobTokenScopes } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: JobTokenScopes;

beforeEach(() => {
  service = new JobTokenScopes({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('JobTokenScopes.show', () => {
  it('should request GET /projects/:id/job_token_scope', async () => {
    await service.show(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/job_token_scope',
      undefined,
    );
  });
});

describe('JobTokenScopes.edit', () => {
  it('should request PATCH /projects/:id/job_token_scope', async () => {
    await service.edit(1, false);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/job_token_scope', {
      enabled: false,
    });
  });
});

describe('JobTokenScopes.showInboundAllowList', () => {
  it('should request GET /projects/:id/job_token_scope/allowlist', async () => {
    await service.showInboundAllowList(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/job_token_scope/allowlist',
      undefined,
    );
  });
});

describe('JobTokenScopes.addToInboundAllowList', () => {
  it('should request POST /projects/:id/job_token_scope/allowlist/:targetId', async () => {
    await service.addToInboundAllowList(1, 2);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/job_token_scope/allowlist/2',
      undefined,
    );
  });
});

describe('JobTokenScopes.removeFromInboundAllowList', () => {
  it('should request DEL /projects/:id/job_token_scope/allowlist/:targetId', async () => {
    await service.removeFromInboundAllowList(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/job_token_scope/allowlist/2',
      undefined,
    );
  });
});
