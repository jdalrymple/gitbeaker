import { Lint, Projects } from '../../../../src';

const { GITLAB_PERSONAL_ACCESS_TOKEN = '', GITLAB_URL = '', TEST_ID = Date.now() } = process.env;
const CREDENTIALS = {
  host: GITLAB_URL,
  token: GITLAB_PERSONAL_ACCESS_TOKEN,
};

let projectAPI: InstanceType<typeof Projects<false>>;
let lintAPI: InstanceType<typeof Lint<false>>;

beforeEach(() => {
  lintAPI = new Lint(CREDENTIALS);
  projectAPI = new Projects(CREDENTIALS);
});

describe('Lint.lint', () => {
  it('should return the merged yaml in a lint request for a specific project when requested', async () => {
    const project = await projectAPI.create({ name: `Lint API Test - NodeJS ${TEST_ID}` });

    const yaml = `
    test:
      stage: test
      script:
        - echo 1
    `;

    const result = await lintAPI.lint(project.id, yaml);

    expect(result).toBeObject();
    expect(result).toContainKeys(['valid', 'merged_yaml']);
  });
});
