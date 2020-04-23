import { Commits, Projects } from '../../../src';

let project;
let service: Commits;

beforeAll(async () => {
  const config = {
    host: process.env.GITLAB_URL,
    token: process.env.PERSONAL_ACCESS_TOKEN,
  };

  // Crease project service
  const projectService = new Projects(config);

  // Create issue service
  service = new Commits(config);

  // Create a template project
  project = await projectService.create({ name: 'Commit Integration Test' });
});

describe('Commits.create', () => {
  it('should create a valid commit on the master branch', async () => {
    const commit = await service.create(project.id, 'master', 'Test API commit creation', [
      {
        action: 'create',
        filePath: 'foo/bar',
        content: 'some content',
      },
    ]);

    expect(commit).toBeInstanceOf(Object);
    expect(commit.message).toEqual('Test API commit creation');
  });
});

describe('Commits.cherryPick', () => {
  it("should handle error messages when attempting to cherry pick a commit that can't be cherrypicked", async () => {
    const commit = await service.create(project.id, 'master', 'Test API commit creation', [
      {
        action: 'create',
        filePath: 'foo/bar/boo.txt',
        content: 'some other content',
      },
    ]);

    await expect(service.cherryPick(project.id, commit.sha, 'master')).rejects.toHaveProperty(
      'description',
    );
  });
});
