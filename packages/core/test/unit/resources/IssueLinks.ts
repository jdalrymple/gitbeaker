import { RequestHelper } from '../../../src/infrastructure';
import { IssueLinks } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: IssueLinks;

beforeEach(() => {
  service = new IssueLinks({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('IssueLinks.all', () => {
  it('should request GET projects/:id/issues/:id/links', async () => {
    await service.all(8, 3);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/8/issues/3/links',
      undefined,
    );
  });
});
