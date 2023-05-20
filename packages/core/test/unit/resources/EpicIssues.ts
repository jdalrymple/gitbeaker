import { RequestHelper } from '../../../src/infrastructure';
import { EpicIssues } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
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

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/epics/2/issues', undefined);
  });
});

describe('EpicIssues.edit', () => {
  it('should request PUT /groups/:id/epics/:id/issues/:id', async () => {
    await service.edit(1, 2, 3, { moveBeforeId: 3 });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'groups/1/epics/2/issues/3', {
      moveBeforeId: 3,
    });
  });
});

describe('EpicIssues.assign', () => {
  it('should request POST /groups/:id/epics/:id/issues/:id', async () => {
    await service.assign(1, 2, 3);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'groups/1/epics/2/issues/3',
      undefined,
    );
  });
});

describe('EpicIssues.remove', () => {
  it('should request DEL /groups/:id/epics/:id/issues/:id', async () => {
    await service.remove(1, 2, 3);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'groups/1/epics/2/issues/3',
      undefined,
    );
  });
});
