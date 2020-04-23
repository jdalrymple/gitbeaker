import { Issues, Projects } from '../../../src';

let project;
let service: Issues;

beforeAll(async () => {
  const config = {
    host: process.env.GITLAB_URL,
    token: process.env.PERSONAL_ACCESS_TOKEN,
  };
  // Crease project service
  const projectService = new Projects(config);

  // Create issue service
  service = new Issues(config);

  // Create a template project
  project = await projectService.create({ name: 'Issue Integration test' });
});

describe('Issues.create', () => {
  it('should create a valid issue on a project', async () => {
    const issue = await service.create(project.id, {
      title: 'Issue.create Integration Test',
      description: 'A test issue ensuring a sucessfully create Issue in GitLab',
    });

    expect(issue).toBeInstanceOf(Object);
    expect(issue.title).toBe('Issue.create Integration Test');
  });
});

describe('Issues.all', () => {
  beforeAll(() => {
    const issues: object[] = [];

    for (let i = 0; i < 2; i += 1) {
      issues.push(
        service.create(project.id, {
          title: `Issue all Integration Test ${i}`,
          description: 'Testing issues.all',
        }),
      );
    }

    return Promise.all(issues);
  });

  it('should return a list of issues on a project', async () => {
    const issues = await service.all({ projectId: project.id });
    const filtered = issues.filter((i) => i.description === 'Testing issues.all');

    expect(filtered).toBeInstanceOf(Array);
    expect(filtered).toHaveLength(2);
  });

  it('should return a list of all issues', async () => {
    const issues = await service.all();

    expect(issues).toBeInstanceOf(Array);
  });

  it('should return a list filtered to a specfic page', async () => {
    const issues = await service.all({ projectId: project.id, perPage: 1, page: 1 });
    const filtered = issues.filter((i) => i.description === 'Testing issues.all');

    expect(filtered).toBeInstanceOf(Array);
    expect(filtered).toHaveLength(1);
  });
});
