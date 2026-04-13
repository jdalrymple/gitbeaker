import { GitlabPages } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: GitlabPages;

beforeEach(() => {
  service = new GitlabPages({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('GitlabPages.remove', () => {
  it('should request DEL /projects/1/pages', async () => {
    await service.remove(1);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/pages', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
