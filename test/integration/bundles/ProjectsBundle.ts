import { ProjectsBundle } from '../../../src';

const config = {
  host: process.env.GITLAB_URL,
  token: process.env.PERSONAL_ACCESS_TOKEN,
  rejectUnauthorized: false, // Testing with localhost
};
let project;
let api;

beforeAll(async () => {
  api = new ProjectsBundle(config);
  project = await api.Projects.create({ name: 'ProjectsBundle Integration test' });
});

describe('ProjectsBundle.Issues.create', () => {
  it('should create a valid issue on a project', async () => {
    const issue = await api.Issues.create(project.id, {
      title: 'ProjectsBundle Integration test',
      description: 'A test issue ensuring a sucessfully create Issue in GitLab',
    });

    expect(issue).toBeInstanceOf(Object);
    expect(issue.title).toBe('ProjectsBundle Integration test');
  });

  it('should create a valid issue on a project', async () => {
    const issue = await api.Issues.all(project.id);

    expect(issue).toBeInstanceOf(Array);
  });
});
