import { Projects } from '../../../src';

let service;

beforeEach(() => {
  service = new Projects({
    host: process.env.GITLAB_URL,
    token: process.env.PERSONAL_ACCESS_TOKEN,
  });
});

describe('Projects.all', () => {
  it('should get 40 projects using offset pagination', async () => {
    const projects = await service.all({ maxPages: 2 });

    expect(projects).toBeInstanceOf(Array);
    expect(projects).toHaveLength(40);
  });

  it('should get 40 projects using keyset pagination', async () => {
    const projects = await service.all({ maxPages: 2, pagination: 'keyset' });

    expect(projects).toBeInstanceOf(Array);
    expect(projects).toHaveLength(40);
  });
});

describe('Projects.create', () => {
  it('should create a valid project', async () => {
    const p = await service.create({ name: 'Project Creation Integration Test' });

    expect(p).toBeInstanceOf(Object);
    expect(p.name).toEqual('Project Creation Integration Test');
  });
});

describe('Projects.upload', () => {
  let project;

  beforeAll(async () => {
    project = await service.create({ name: 'Project Upload Integration Test' });
  });

  it('should upload a text file', async () => {
    const content = 'TESTING FILE UPLOAD :D';
    const results = await service.upload(project.id, content, {
      metadata: {
        filename: 'testfile.txt',
        contentType: 'text/plain',
      },
    });

    expect(results).toContainKeys(['alt', 'url', 'markdown']);
  });
});
