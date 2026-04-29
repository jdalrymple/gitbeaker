import { AuditEvents } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: AuditEvents;

beforeEach(() => {
  service = new AuditEvents({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('AuditEvents.all', () => {
  it('should request GET /audit_events without query params', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'audit_events', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /audit_events with query params', async () => {
    await service.all({ entityId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'audit_events', {
      maxPages: undefined,
      searchParams: { entityId: 2 },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /projects/:id/audit_events without query params', async () => {
    await service.all({ projectId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/2/audit_events', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /projects/:id/audit_events with query params', async () => {
    await service.all({ projectId: 2, entityId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/2/audit_events', {
      maxPages: undefined,
      searchParams: {
        entityId: 2,
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /groups/:id/audit_events without query params', async () => {
    await service.all({ groupId: 3 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/3/audit_events', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /groups/:id/audit_events with query params', async () => {
    await service.all({ groupId: 3, entityId: 4 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/3/audit_events', {
      maxPages: undefined,
      searchParams: {
        entityId: 4,
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('AuditEvents.show', () => {
  it('should request GET /projects/:id/audit_events/:idd without options', async () => {
    await service.show(3, { projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/audit_events/3', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /groups/:id/audit_events/:idd without options', async () => {
    await service.show(3, { groupId: 4 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/4/audit_events/3', {
      sudo: undefined,
      showExpanded: undefined,
    });
  });

  it('should request GET /groups/:id/audit_events/:idd with options', async () => {
    await service.show(3, { groupId: 4, sudo: 'sudo' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/4/audit_events/3', {
      sudo: 'sudo',
      showExpanded: undefined,
    });
  });

  it('should request GET /projects/:id/audit_events/:idd with options', async () => {
    await service.show(3, { projectId: 2, sudo: 'sudo' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/2/audit_events/3', {
      sudo: 'sudo',
      showExpanded: undefined,
    });
  });
});
