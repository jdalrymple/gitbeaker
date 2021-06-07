import { Events } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: Events;

beforeEach(() => {
  service = new Events({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Events.all', () => {
  it('should request GET /projects/:id/events', async () => {
    await service.all({ projectId: 12 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/12/events', {});
  });

  it('should request GET /projects/:id/events without options', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'events', {});
  });
});
