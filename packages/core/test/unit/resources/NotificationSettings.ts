import { RequestHelper } from '../../../src/infrastructure';
import { NotificationSettings } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: NotificationSettings;

beforeEach(() => {
  service = new NotificationSettings({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('NotificationSettings.show', () => {
  it('should request GET /notification_settings', async () => {
    await service.show();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'notification_settings', {});
  });

  it('should request GET /projects/:id/notification_settings when project Id is passed', async () => {
    await service.show({ projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/notification_settings',
      {},
    );
  });

  it('should request GET /group/:id/notification_settings when group Id is passed', async () => {
    await service.show({ groupId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/2/notification_settings', {});
  });
});

describe('NotificationSettings.edit', () => {
  it('should request PUT /notification_settings', async () => {
    await service.edit({ level: 'watch' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'notification_settings', {
      level: 'watch',
    });
  });

  it('should request PUT /projects/:id/notification_settings when project Id is passed', async () => {
    await service.edit({ projectId: 1, level: 'watch' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/notification_settings', {
      level: 'watch',
    });
  });

  it('should request PUT /group/:id/notification_settings when group Id is passed', async () => {
    await service.edit({ groupId: 2, level: 'watch' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'groups/2/notification_settings', {
      level: 'watch',
    });
  });
});
