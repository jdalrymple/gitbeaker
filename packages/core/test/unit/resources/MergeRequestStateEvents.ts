import { RequestHelper } from '../../../src/infrastructure';
import { MergeRequestStateEvents } from '../../../src/resources/MergeRequestStateEvents';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: MergeRequestStateEvents;

beforeEach(() => {
  service = new MergeRequestStateEvents({
    requesterFn: vi.fn(),
    token: 'abcdefg',
  });
});

describe('MergeRequestStateEvents.all', () => {
  it('should request GET projects/:id/merge_requests/:merge_request_iid/resource_state_events', async () => {
    await service.all(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      '1/merge_requests/2/resource_state_events',
      {
        maxPages: undefined,
        searchParams: {},
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });

  it('should request GET projects/:id/merge_requests/:merge_request_iid/resource_state_events with options', async () => {
    await service.all(1, 2, { sudo: 'admin' });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(
      service,
      '1/merge_requests/2/resource_state_events',
      {
        maxPages: undefined,
        searchParams: {},
        showExpanded: undefined,
        sudo: 'admin',
      },
    );
  });
});

describe('MergeRequestStateEvents.show', () => {
  it('should request GET projects/:id/merge_requests/:merge_request_iid/resource_state_events/:resource_state_event_id', async () => {
    await service.show(1, 2, 3);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(
      service,
      '1/merge_requests/2/resource_state_events/3',
      {
        showExpanded: undefined,
        sudo: undefined,
      },
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
