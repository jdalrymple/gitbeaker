import { NotificationSettings, Projects, Groups } from '../../../src';

let service;
let group;
let project;

beforeAll(async () => {
  const config = {
    host: process.env.GITLAB_URL,
    token: process.env.PERSONAL_ACCESS_TOKEN,
  };
  const projectService = new Projects(config);
  const groupService = new Groups(config);

  service = new NotificationSettings(config);

  group = await groupService.create(
    'Notification Settings Integration Test',
    'notification-settings-integration-test',
  );
  project = await projectService.create({ name: 'Notification Settings Integration Test' });
});

describe('NotificationSettings.all', () => {
  it('should return all the global notification settings', async () => {
    const settings = await service.all();

    expect(settings).toBeObject();
  });

  it('should return all the group notification settings', async () => {
    const settings = await service.all({ groupId: group.id });

    expect(settings).toBeObject();
  });

  it('should return all the project notification settings', async () => {
    const settings = await service.all({ projectId: project.id });

    expect(settings).toBeObject();
  });
});

describe('NotificationSettings.edit', () => {
  it('should return edit the global notification settings', async () => {
    const settings = await service.edit({ level: 'watch' });

    expect(settings).toBeObject();
    expect(settings).toContainEntry(['level', 'watch']);
  });

  it('should return edit the group notification settings', async () => {
    const settings = await service.edit({ groupId: group.id, level: 'watch' });

    expect(settings).toBeObject();
    expect(settings).toContainEntry(['level', 'watch']);
  });

  it('should return edit the project notification settings', async () => {
    const settings = await service.edit({ projectId: project.id, level: 'watch' });

    expect(settings).toBeObject();
    expect(settings).toContainEntry(['level', 'watch']);
  });
});
