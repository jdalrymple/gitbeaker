import { Issues, Projects } from '../../../src';

const config = {
  host: process.env.GITLAB_URL,
  token: process.env.PERSONAL_ACCESS_TOKEN,
};
let project;
let service: Issues;

beforeAll(async () => {
  // Crease project service
  const projectService = new Projects(config);

  // Create issue service
  service = new Issues(config);

  // Create a template project
  project = await projectService.create({ name: 'Issue Integration test' });
});

describe('Issues.create', () => {
  it('should create a valid issue on a project', async () => {
    const issue1 = await service.create(project.id, {
      title: 'Issue Integration test1',
      description: 'A test issue ensuring a sucessfully create Issue in GitLab',
    });

    const issue2 = await service.create(project.id, {
      title: 'Issue Integration test2',
      description: 'A test issue ensuring a sucessfully create Issue in GitLab',
    });

    expect(issue1).toBeInstanceOf(Object);
    expect(issue1.title).toBe('Issue Integration test1');
    expect(issue2).toBeInstanceOf(Object);
    expect(issue2.title).toBe('Issue Integration test2');
  });
});

describe('Issues.all', () => {
  it('should return a list of issues on a project', async () => {
    const issues = await service.all({ projectId: project.id });

    expect(issues).toBeInstanceOf(Array);
    expect(issues.length).toEqual(2);
  });

  it('should return a list of all issues', async () => {
    const issues = await service.all();

    expect(issues).toBeInstanceOf(Array);
    expect(issues.length).toEqual(2);
  });

  it('should return a list filtered to a specfic page', async () => {
    const issues1 = await service.all({projectId: project.id, perPage: 1, page: 1 });

    expect(issues1).toBeInstanceOf(Array);
    expect(issues1.length).toEqual(1);
    expect(issues1[0].title).toBe('Issue Integration test2');

    const issues2 = await service.all({ projectId: project.id, perPage: 1, page: 2 });

    expect(issues2).toBeInstanceOf(Array);
    expect(issues2.length).toEqual(1);
    expect(issues2[0].title).toBe('Issue Integration test1');
  });
});
