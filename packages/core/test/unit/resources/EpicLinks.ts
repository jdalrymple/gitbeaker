import { RequestHelper } from '../../../src/infrastructure';
import { EpicLinks } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: EpicLinks;

beforeEach(() => {
  service = new EpicLinks({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('EpicLinks.all', () => {
  it('should request GET /groups/:id/epics/:id/links', async () => {
    await service.all(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/epics/2/links', undefined);
  });
});

describe('EpicLinks.assign', () => {
  it('should request POST /groups/:id/epics/:id/links/:id', async () => {
    await service.assign(1, 2, 3);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'groups/1/epics/2/links/3',
      undefined,
    );
  });
});

describe('EpicLinks.create', () => {
  it('should request POST /groups/:id/epics/:id/links', async () => {
    await service.create(1, 2, 'Testing epic links', { confidential: false });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'groups/1/epics/2/links', {
      searchParams: {
        title: 'Testing epic links',
      },
      confidential: false,
    });
  });
});

describe('EpicLinks.reorder', () => {
  it('should request PUT /groups/:id/epics/:id/links/:id', async () => {
    await service.reorder(1, 2, 3, { moveBeforeId: 3, moveAfterId: 1 });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'groups/1/epics/2/links/3', {
      moveBeforeId: 3,
      moveAfterId: 1,
    });
  });
});

describe('EpicLinks.unassign', () => {
  it('should request DEL /groups/:id/epics/:id/links/:id', async () => {
    await service.unassign(1, 2, 3);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'groups/1/epics/2/links/3',
      undefined,
    );
  });
});
