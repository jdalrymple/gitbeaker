import { RequestHelper } from '../../../src/infrastructure';
import { MergeRequestDiscussions } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: MergeRequestDiscussions;

beforeEach(() => {
  service = new MergeRequestDiscussions({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('Instantiating MergeRequestDiscussions service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(MergeRequestDiscussions);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
  });
});

describe('MergeRequestDiscussions.resolve', () => {
  it('should resolve the merge discussion thread', async () => {
    await service.resolve(1, 2, 'id', true);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      '1/merge_requests/2/discussions/id',
      {
        searchParams: { resolved: true },
      },
    );
  });

  it('should unresolve the merge discussion thread', async () => {
    await service.resolve(1, 2, 'id', false);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      '1/merge_requests/2/discussions/id',
      {
        searchParams: { resolved: false },
      },
    );
  });
});
