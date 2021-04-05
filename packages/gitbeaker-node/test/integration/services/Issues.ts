import { Issues, Projects } from '../../../src';

const { TEST_ID } = process.env;
let issueAPI: InstanceType<typeof Issues>;
let projectAPI: InstanceType<typeof Projects>;

beforeAll(async () => {
  issueAPI = new Issues({
    host: process.env.GITLAB_URL,
    token: process.env.GITLAB_PERSONAL_ACCESS_TOKEN,
  });
  projectAPI = new Projects({
    host: process.env.GITLAB_URL,
    token: process.env.GITLAB_PERSONAL_ACCESS_TOKEN,
  });
});

describe('Issues.all', () => {
  beforeAll(async () => {
    const project = await projectAPI.create({ name: `Issues All Integration Test ${TEST_ID}` });
    const newIssues: any[] = [];

    for (let i = 0; i < 10; i += 1) {
      newIssues.push(
        issueAPI.create(project.id as number, {
          title: `Issue.all Test ${i}`,
          description: 'A test issue',
        }),
      );
    }

    await Promise.all(newIssues);
  });

  it('should get 10 issues using keyset pagination', async () => {
    const projects = await issueAPI.all({ maxPages: 2, perPage: 5, simple: true, pagination: 'keyset' });

    expect(projects).toBeInstanceOf(Array);
    expect(projects).toHaveLength(10);
  });
});
