import { DeployTokens } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: DeployTokens;

beforeEach(() => {
  service = new DeployTokens({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('DeployTokens.create', () => {
  it('should request POST groups/5/deploy_tokens with a name and scopes', async () => {
    await service.create('token', ['read_repository'], { groupId: 5 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'groups/5/deploy_tokens', {
      name: 'token',
      scopes: ['read_repository'],
    });
  });

  it('should request POST projects/5/deploy_tokens with a name and scopes', async () => {
    await service.create('token', ['read_repository'], { projectId: 5 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/5/deploy_tokens', {
      name: 'token',
      scopes: ['read_repository'],
    });
  });

  it('should request POST projects/5/deploy_tokens with name, scopes, and username if passed', async () => {
    await service.create('token', ['read_repository'], { projectId: 5, username: 'mr-smith' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/5/deploy_tokens', {
      name: 'token',
      scopes: ['read_repository'],
      username: 'mr-smith',
    });
  });

  it('should request POST projects/5/deploy_tokens with name, scopes, and date if passed', async () => {
    await service.create('token', ['read_repository'], {
      projectId: 5,
      expires_at: '1975-08-19T22:15:30.000Z',
    });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/5/deploy_tokens', {
      name: 'token',
      scopes: ['read_repository'],
      expires_at: '1975-08-19T22:15:30.000Z',
    });
  });
});

describe('DeployTokens.all', () => {
  it('should request GET /deploy_tokens', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'deploy_tokens', {});
  });

  it('should request GET groups/5/deploy_tokens with groupId', async () => {
    await service.all({ groupId: 5 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/5/deploy_tokens', {});
  });

  it('should request GET projects/5/deploy_tokens with projectId', async () => {
    await service.all({ projectId: 5 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/5/deploy_tokens', {});
  });
});

describe('DeployTokens.remove', () => {
  it('should throw an error when attempting to delete a deploy_key without specifying the groupId or projectId', () => {
    expect(() => service.remove(6)).toThrow(
      'Missing required argument. Please supply a projectId or a groupId in the options parameter.',
    );
  });

  it('should request DEL groups/5/deploy_tokens with groupId', async () => {
    await service.remove(6, { groupId: 5 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'groups/5/deploy_tokens/6', {});
  });

  it('should request DEL projects/5/deploy_tokens with projectId', async () => {
    await service.remove(6, { projectId: 5 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/5/deploy_tokens/6', {});
  });
});
