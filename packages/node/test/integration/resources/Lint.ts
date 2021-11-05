import 'jest-extended';
import { Lint } from '../../../src';

let lintAPI: InstanceType<typeof Lint>;

beforeEach(() => {
  lintAPI = new Lint({
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
