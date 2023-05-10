import { Issues, Projects } from '../../../../src';

const {
  GITLAB_PERSONAL_ACCESS_TOKEN = '',
  GITLAB_URL = '',
  TEST_ID = Date.now().toString(),
} = process.env;

let issueAPI: InstanceType<typeof Issues<false>>;
let projectAPI: InstanceType<typeof Projects<false>>;

beforeAll(() => {
  issueAPI = new Issues({
    host: GITLAB_URL,
    token: GITLAB_PERSONAL_ACCESS_TOKEN,
  });
  projectAPI = new Projects({
    host: GITLAB_URL,
    token: GITLAB_PERSONAL_ACCESS_TOKEN,
  });
});

describe('Issues.all', () => {
  beforeAll(async () => {
    const project = await projectAPI.create({
      name: `Issues All Integration Test - NodeJS ${TEST_ID}`,
    });
    const newIssues: ReturnType<typeof issueAPI.create<false>>[] = [];

    for (let i = 0; i < 10; i += 1) {
      newIssues.push(
        issueAPI.create(project.id, `Issue.all Test - NoteJS ${TEST_ID} ${i}`, {
          description: 'A test issue',
        }),
      );
    }

    await Promise.all(newIssues);
  }, 20000);

  it('should get 10 issues using keyset pagination', async () => {
    const projects = await issueAPI.all({
      orderBy: 'created_at',
      search: TEST_ID,
      sort: 'asc',
      simple: true,
      pagination: 'keyset',
    });

    expect(projects).toBeArray();
    expect(projects).toHaveLength(10);
  });
});
