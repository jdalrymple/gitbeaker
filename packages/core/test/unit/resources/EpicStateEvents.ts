import { RequestHelper } from '../../../src/infrastructure';
import { EpicStateEvents } from '../../../src/resources/EpicStateEvents';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: EpicStateEvents;

beforeEach(() => {
  service = new EpicStateEvents({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('EpicStateEvents.all', () => {
  it('should request GET groups/:id/epics/:epic_id/resource_state_events', async () => {
    await service.all(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      '1/epics/2/resource_state_events',
      undefined,
    );
  });

  it('should request GET groups/:id/epics/:epic_id/resource_state_events with options', async () => {
    await service.all(1, 2, { sudo: 'admin' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '1/epics/2/resource_state_events', {
      sudo: 'admin',
    });
  });
});

describe('EpicStateEvents.show', () => {
  it('should request GET groups/:id/epics/:epic_id/resource_state_events/:resource_state_event_id', async () => {
    await service.show(1, 2, 3);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      '1/epics/2/resource_state_events/3',
      undefined,
    );
  });

  it('should request GET groups/:id/epics/:epic_id/resource_state_events/:resource_state_event_id with options', async () => {
    await service.show(1, 2, 3, { sudo: 'admin' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '1/epics/2/resource_state_events/3', {
      sudo: 'admin',
    });
  });
});
