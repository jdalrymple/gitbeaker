import { RequestHelper } from '../../../src/infrastructure';
import { RepositorySubmodules } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: RepositorySubmodules;

beforeEach(() => {
  service = new RepositorySubmodules({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating Releases service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(RepositorySubmodules);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('Releases.edit', () => {
  it('should request PUT /projects/:id/repository/submodules/:submodule', async () => {
    await service.edit(1, 'submod', 'branch', 'sha');

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/submodules/submod',
      {
        branch: 'branch',
        commit_sha: 'sha',
      },
    );
  });
});
