import { Issues, Projects } from '../../../src';

let issueAPI: InstanceType<typeof Issues>;
let projectAPI: InstanceType<typeof Projects>;

beforeEach(async () => {
  issueAPI = new Issues({
    host: process.env.GITLAB_URL,
    token: process.env.PERSONAL_ACCESS_TOKEN,
  });
  projectAPI = new Projects({
    host: process.env.GITLAB_URL,
    token: process.env.PERSONAL_ACCESS_TOKEN,
  });
});

describe('Issues.all', () => {
  beforeAll(async () => {
    const project = await projectAPI.create({ name: 'Issues All Integration Test' });
    const newIssues: any[] = [];

    for (let i = 0; i < 100; i += 1) {
      newIssues.push(
        issueAPI.create(project.id as number, {
          title: `Issue.all Test ${i}`,
          description: 'A test issue',
        }),
      );
    }

    await Promise.all(newIssues);
  });

  it('should get 60 projects using keyset pagination', async () => {
    const projects = await issueAPI.all({ maxPages: 3, pagination: 'keyset' });

    expect(projects).toBeInstanceOf(Array);
    expect(projects).toHaveLength(60);
  });
});
