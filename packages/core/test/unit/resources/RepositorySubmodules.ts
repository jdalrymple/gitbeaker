import { RepositorySubmodules } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

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
        body: {
          branch: 'branch',
          commitSha: 'sha',
        },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});
