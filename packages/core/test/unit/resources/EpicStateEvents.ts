import { RequestHelper } from '../../../src/infrastructure';
import { EpicStateEvents } from '../../../src/resources/EpicStateEvents';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: EpicStateEvents;

beforeEach(() => {
  service = new EpicStateEvents({
    requesterFn: vi.fn(),
    token: 'abcdefg',
  });
});

describe('EpicStateEvents.all', () => {
  it('should request GET groups/:id/epics/:epic_id/resource_state_events', async () => {
    await service.all(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '1/epics/2/resource_state_events', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET groups/:id/epics/:epic_id/resource_state_events with options', async () => {
    await service.all(1, 2, { sudo: 'admin' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '1/epics/2/resource_state_events', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: 'admin',
    });
  });
});

describe('EpicStateEvents.show', () => {
  it('should request GET groups/:id/epics/:epic_id/resource_state_events/:resource_state_event_id', async () => {
    await service.show(1, 2, 3);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '1/epics/2/resource_state_events/3', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET groups/:id/epics/:epic_id/resource_state_events/:resource_state_event_id with options', async () => {
    await service.show(1, 2, 3, { sudo: 'admin' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '1/epics/2/resource_state_events/3', {
      sudo: 'admin',
    });
  });
});
