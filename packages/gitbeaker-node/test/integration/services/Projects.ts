import { Projects } from '../../../src';

let service: Projects;

beforeEach(() => {
  service = new Projects({
    host: process.env.GITLAB_URL,
    token: process.env.PERSONAL_ACCESS_TOKEN,
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
  let project: object;

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
