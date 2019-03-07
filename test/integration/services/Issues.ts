import { Issues, Projects } from '../../../src';

const config = {
  host: process.env.GITLAB_URL,
  token: process.env.PERSONAL_ACCESS_TOKEN,
};
let project
let service: Issues;

beforeAll(async () => {
  const projectService = new Projects(config);

  project = await projectService.create({ name: 'Issue Integration test' });
});

beforeEach(() => {
  service = new Issues(config);
});

describe('Issues.create', () => {
  it('should create a valid issue on a project', async () => {
    const issue = await service.create(project.id, {
      title: 'Issue Integration test',
      description: 'A test issue ensuring a sucessfully create Issue in GitLab',
    });

    expect(issue).toBeInstanceOf(Object);
    expect(issue.title).toBe('Issue Integration test');
  });
});
