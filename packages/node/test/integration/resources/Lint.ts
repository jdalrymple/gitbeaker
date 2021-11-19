import 'jest-extended';
import { Lint, Projects } from '../../../src';

const { TEST_ID = '' } = process.env;
let projectAPI: InstanceType<typeof Projects>;
let lintAPI: InstanceType<typeof Lint>;


beforeEach(() => {
  lintAPI = new Lint({
    host: process.env.GITLAB_URL,
    token: process.env.GITLAB_PERSONAL_ACCESS_TOKEN,
  });
  projectAPI = new Projects({
    host: process.env.GITLAB_URL,
    token: process.env.GITLAB_PERSONAL_ACCESS_TOKEN,
  });
});

describe('Lint.lint', () => {
  it('should return validate a lint without returning the merged_yaml', async () => {
    // Call the lint API, passing in a basic CI yaml, asking for the merged_yaml back.
    const input_ci_yaml = `
    test:
      stage: test
      script:
        - echo 1
    `;
    const result = await lintAPI.lint(input_ci_yaml);

    expect(result).toBeInstanceOf(Object);
    expect(result).toContainKeys(['status']);
  });

  it('should return the merged yaml in a lint request when requested', async () => {
    // Call the lint API, passing in a basic CI yaml, asking for the merged_yaml back.
    const input_ci_yaml = `
    test:
      stage: test
      script:
        - echo 1
    `;
    const result = await lintAPI.lint(input_ci_yaml, { includeMergedYaml: true });

    expect(result).toBeInstanceOf(Object);
    expect(result).toContainKeys(['status', 'merged_yaml']);
  });
});

describe('Lint.lint_with_namespace', () => {
  it('should return the merged yaml in a lint request when requested', async () => {
    // Call the lint API for a project namespace, passing in a basic CI yaml.
    // The specific use case for `lint_with_namespace` vs `lint` is that it works with `local`
    // includes. However, that's gitlab-side functionality so we're not testing that here - 
    // simply aiming to ensure that we can call this API correctly.

    const project = await projectAPI.create({ name: `Lint API Test ${TEST_ID}` });

    const input_ci_yaml = `
    test:
      stage: test
      script:
        - echo 1
    `;
    const result = await lintAPI.lint_with_namespace(project.id, input_ci_yaml);

    expect(result).toBeInstanceOf(Object);
    expect(result).toContainKeys(['valid', 'merged_yaml']);
  });
});
