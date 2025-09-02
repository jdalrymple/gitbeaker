import { RequestHelper } from '../../../src/infrastructure';
import { RepositorySubmodules } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: RepositorySubmodules;

beforeEach(() => {
  service = new RepositorySubmodules({
    requesterFn: jest.fn(),
    token: 'abcdefg',
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
        commitSha: 'sha',
      },
    );
  });
});
