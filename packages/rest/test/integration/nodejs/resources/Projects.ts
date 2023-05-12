import { Projects } from '../../../../src';

const { GITLAB_PERSONAL_ACCESS_TOKEN = '', GITLAB_URL = '', TEST_ID = Date.now() } = process.env;

let service: InstanceType<typeof Projects<false>>;

beforeEach(() => {
  service = new Projects({
    host: GITLAB_URL,
    token: GITLAB_PERSONAL_ACCESS_TOKEN,
  });
});

describe('Projects.create', () => {
  it('should create a valid project', async () => {
    const name = `Project Creation Integration Test - NODEJS ${TEST_ID}`;
    const p = await service.create({ name });

    expect(p).toBeObject();
    expect(p.name).toEqual(name);
  });
});

describe('Projects.all', () => {
  beforeAll(async () => {
    const newProjects: any[] = [];

    for (let i = 0; i < 10; i += 1) {
      newProjects.push(
        service.create({ name: `Project All Integration Test - NODEJS ${TEST_ID} ${i}` }),
      );
    }

    await Promise.all(newProjects);
  }, 20000);

  it('should get 10 projects using offset pagination', async () => {
    const projects = await service.all({
      pagination: 'offset',
      maxPages: 2,
      perPage: 5,
      simple: true,
    });

    expect(projects).toBeArray();
    expect(projects).toHaveLength(10);
  });
});

describe('Projects.uploadForReference', () => {
  it('should upload a text file', async () => {
    const project = await service.create({
      name: `Project Upload Integration Test Text File - NodeJS ${TEST_ID}`,
    });

    const blob = new Blob(['TESTING FILE UPLOAD'], {
      type: 'text/plain',
    });

    const results = await service.uploadForReference(project.id, {
      content: blob,
      filename: 'testfile.txt',
    });

    expect(results).toContainKeys(['alt', 'url', 'full_path', 'markdown']);
  });
});
