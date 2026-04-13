import { EpicIssues } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: EpicIssues;

beforeEach(() => {
  service = new EpicIssues({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('EpicIssues.all', () => {
  it('should request GET /groups/:id/epics/:id/issues', async () => {
    await service.all(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/epics/2/issues', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('EpicIssues.edit', () => {
  it('should request PUT /groups/:id/epics/:id/issues/:id', async () => {
    await service.edit(1, 2, 3, { moveBeforeId: 3 });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'groups/1/epics/2/issues/3', {
      body: {
        moveBeforeId: 3,
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('EpicIssues.assign', () => {
  it('should request POST /groups/:id/epics/:id/issues/:id', async () => {
    await service.assign(1, 2, 3);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'groups/1/epics/2/issues/3', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('EpicIssues.remove', () => {
  it('should request DEL /groups/:id/epics/:id/issues/:id', async () => {
    await service.remove(1, 2, 3);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'groups/1/epics/2/issues/3', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
