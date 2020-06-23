import { RequesterType } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../../../src/infrastructure';
import { NotificationSettings } from '../../../src';

jest.mock('../../../src/infrastructure/RequestHelper');

let service: NotificationSettings;

beforeEach(() => {
  const requester = {
    get: jest.fn(() => Promise.resolve([])),
    post: jest.fn(() => Promise.resolve({})),
    put: jest.fn(() => Promise.resolve({})),
    delete: jest.fn(() => Promise.resolve({})),
  } as RequesterType;

  service = new NotificationSettings({
    requester,
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating NotificationSettings service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(NotificationSettings);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('NotificationSettings.all', () => {
  it('should request GET /notification_settings', async () => {
    await service.all();

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'notification_settings', {
      sudo: undefined,
    });
  });

  it('should request GET /projects/:id/notification_settings when project Id is passed', async () => {
    await service.all({ projectId: 1 });

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'projects/1/notification_settings', {
      sudo: undefined,
    });
  });

  it('should request GET /group/:id/notification_settings when group Id is passed', async () => {
    await service.all({ groupId: 2 });

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'groups/2/notification_settings', {
      sudo: undefined,
    });
  });
});

describe('NotificationSettings.edit', () => {
  it('should request PUT /notification_settings', async () => {
    await service.edit({ level: 'watch' });

    expect(RequestHelper.put).toHaveBeenCalledWith(service, 'notification_settings', {
      sudo: undefined,
      level: 'watch',
    });
  });

  it('should request PUT /projects/:id/notification_settings when project Id is passed', async () => {
    await service.edit({ projectId: 1, level: 'watch' });

    expect(RequestHelper.put).toHaveBeenCalledWith(service, 'projects/1/notification_settings', {
      sudo: undefined,
      level: 'watch',
    });
  });

  it('should request PUT /group/:id/notification_settings when group Id is passed', async () => {
    await service.edit({ groupId: 2, level: 'watch' });

    expect(RequestHelper.put).toHaveBeenCalledWith(service, 'groups/2/notification_settings', {
      sudo: undefined,
      level: 'watch',
    });
  });
});
