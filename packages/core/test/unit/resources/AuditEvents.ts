import { RequestHelper } from '../../../src/infrastructure';
import { AuditEvents } from '../../../src';

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
  it('should request GET /audit_events without options', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'audit_events', {});
  });

  it('should request GET /audit_events with property', async () => {
    await service.all({ entityId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'audit_events', { entityId: 2 });
  });

  it('should request GET /projects/:id/audit_events', async () => {
    await service.all({ projectId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/2/audit_events', {});
  });

  it('should request GET /projects/:id/audit_events with options', async () => {
    await service.all({ projectId: 2, entityId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/2/audit_events', {
      entityId: 2,
    });
  });

  it('should request GET /groups/:id/audit_events', async () => {
    await service.all({ groupId: 3 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/3/audit_events', {});
  });

  it('should request GET /groups/:id/audit_events with options', async () => {
    await service.all({ groupId: 3, entityId: 4 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/3/audit_events', {
      entityId: 4,
    });
  });
});

describe('AuditEvents.show', () => {
  it('should request GET /audit_events', async () => {
    await service.show(3);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'audit_events/3', {});
  });

  it('should request GET /audit_events with options', async () => {
    await service.show(3, { sudo: 'sudo' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'audit_events/3', { sudo: 'sudo' });
  });

  it('should request GET /projects/:id/audit_events', async () => {
    await service.show(3, { projectId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/2/audit_events/3', {});
  });

  it('should request GET /projects/:id/audit_events with options', async () => {
    await service.show(3, { projectId: 2, sudo: 'sudo' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/2/audit_events/3', {
      sudo: 'sudo',
    });
  });

  it('should request GET /groups/:id/audit_events', async () => {
    await service.show(3, { groupId: 4 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/4/audit_events/3', {});
  });

  it('should request GET /groups/:id/audit_events with options', async () => {
    await service.show(3, { groupId: 4, sudo: 'sudo' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/4/audit_events/3', {
      sudo: 'sudo',
    });
  });
});
