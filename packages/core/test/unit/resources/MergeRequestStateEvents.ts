import { RequestHelper } from '../../../src/infrastructure';
import { MergeRequestStateEvents } from '../../../src/resources/MergeRequestStateEvents';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: MergeRequestStateEvents;

beforeEach(() => {
  service = new MergeRequestStateEvents({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('MergeRequestStateEvents.all', () => {
  it('should request GET projects/:id/merge_requests/:merge_request_iid/resource_state_events', async () => {
    await service.all(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      '1/merge_requests/2/resource_state_events',
      undefined,
    );
  });

  it('should request GET projects/:id/merge_requests/:merge_request_iid/resource_state_events with options', async () => {
    await service.all(1, 2, { sudo: 'admin' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      '1/merge_requests/2/resource_state_events',
      { sudo: 'admin' },
    );
  });
});

describe('MergeRequestStateEvents.show', () => {
  it('should request GET projects/:id/merge_requests/:merge_request_iid/resource_state_events/:resource_state_event_id', async () => {
    await service.show(1, 2, 3);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      '1/merge_requests/2/resource_state_events/3',
      undefined,
    );
  });

  it('should request GET projects/:id/merge_requests/:merge_request_iid/resource_state_events/:resource_state_event_id with options', async () => {
    await service.show(1, 2, 3, { sudo: 'admin' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      '1/merge_requests/2/resource_state_events/3',
      { sudo: 'admin' },
    );
  });
}); 