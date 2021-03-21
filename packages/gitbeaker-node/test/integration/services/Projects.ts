import { Projects } from '../../../src';

const { TEST_ID } = process.env;
let service: InstanceType<typeof Projects>;

beforeEach(() => {
  service = new Projects({
    host: process.env.GITLAB_URL,
    token: process.env.PERSONAL_ACCESS_TOKEN,
  });
});

describe('Projects.create', () => {
  it('should create a valid project', async () => {
    const p = await service.create({ name: `Project Creation Integration Test ${TEST_ID}` });

    expect(p).toBeInstanceOf(Object);
    expect(p.name).toEqual(`Project Creation Integration Test ${TEST_ID}`);
  });
});

describe.skip('Projects.all', () => {
  beforeAll(async () => {
    const newProjects: any[] = [];

    for (let i = 0; i < 100; i += 1) {
      newProjects.push(service.create({ name: `Project All Integration Test ${TEST_ID} ${i}` }));
    }

    await Promise.all(newProjects);
  });

  it('should get 40 projects using offset pagination', async () => {
    const projects = await service.all({ maxPages: 2 });

    expect(projects).toBeInstanceOf(Array);
    expect(projects).toHaveLength(40);
  });
});

// describe('Projects.upload', () => {
//   it('should upload a text file', async () => {
// const project = await service.create({
//   name: `Project Upload Integration Test Text File ${TEST_ID}`,
// });
// const results = await service.upload(project.id as number, 'TESTING FILE UPLOAD :D', {
//   metadata: {
//     filename: 'testfile.txt',
//     contentType: 'text/plain',
//   },
// });
//
// expect(results).toContainKeys(['alt', 'url', 'markdown']);
//   });
// });
