import { Lint, Projects } from '../../../../src';

const { GITLAB_PERSONAL_ACCESS_TOKEN = '', GITLAB_URL = '', TEST_ID = Date.now() } = process.env;

let projectAPI: InstanceType<typeof Projects>;
let lintAPI: InstanceType<typeof Lint>;

beforeEach(() => {
  lintAPI = new Lint({
    host: GITLAB_URL,
    token: GITLAB_PERSONAL_ACCESS_TOKEN,
  });
  projectAPI = new Projects({
    host: GITLAB_URL,
    token: GITLAB_PERSONAL_ACCESS_TOKEN,
  });
});

describe('Lint.lint', () => {
  it('should return validate a lint without returning the merged_yaml', async () => {
    // Call the lint API, passing in a basic CI yaml, asking for the merged_yaml back.
    const yaml = `
    test:
      stage: test
      script:
        - echo 1
    `;
    const result = await lintAPI.lint(yaml);

    expect(result).toBeObject();
    expect(result).toContainKeys(['status']);
  });

  it('should return the merged yaml in a lint request when requested', async () => {
    // Call the lint API, passing in a basic CI yaml, asking for the merged_yaml back.
    const yaml = `
    test:
      stage: test
      script:
        - echo 1
    `;
    const result = await lintAPI.lint(yaml, { includeMergedYaml: true });

    expect(result).toBeObject();
    expect(result).toContainKeys(['status', 'merged_yaml']);
  });

  it('should return the merged yaml in a lint request for a specific project when requested', async () => {
    // Call the lint API for a project namespace, passing in a basic CI yaml.
    // The specific use case for `lintWithNamespace` vs `lint` is that it works with `local`
    // includes. However, that's gitlab-side functionality so we're not testing that here -
    // simply aiming to ensure that we can call this API correctly.

    const project = await projectAPI.create({ name: `Lint API Test - NodeJS ${TEST_ID}` });

    const yaml = `
    test:
      stage: test
      script:
        - echo 1
    `;

    const result = await lintAPI.lint(yaml, { projectId: project.id });

    expect(result).toBeObject();
    expect(result).toContainKeys(['valid', 'merged_yaml']);
  });
});
