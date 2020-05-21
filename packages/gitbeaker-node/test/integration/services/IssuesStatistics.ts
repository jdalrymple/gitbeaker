import { IssuesStatistics, Projects, Groups } from '../../../src';

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

  service = new IssuesStatistics(config);

  group = await groupService.create(
    'IssuesStatistics Integration Test',
    'issues-statistics-integration-test',
  );
  project = await projectService.create({ name: 'IssuesStatistics Integration Test' });
});

describe('IssuesStatistics.all', () => {
  it('should return all the global issue stats', async () => {
    const settings = await service.all();

    expect(settings).toBeObject();
  });

  it('should return all the group issue stats', async () => {
    const settings = await service.all({ groupId: group.id });

    expect(settings).toBeObject();
  });

  it('should return all the project issue stats', async () => {
    const settings = await service.all({ projectId: project.id });

    expect(settings).toBeObject();
  });
});
