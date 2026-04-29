import { expect, test as it } from '@playwright/test';
import path from 'path';

const { describe } = it;

const { GITLAB_PERSONAL_ACCESS_TOKEN = '', GITLAB_URL = '', TEST_ID = Date.now() } = process.env;
const htmlFilePath = path.resolve(__dirname, '..', '..', '..', 'assets', 'test-import.html');

describe('Projects API', () => {
  it('should create a project', async ({ page }) => {
    await page.goto(`file://${htmlFilePath}`);

    const project = await page.evaluate(
      ([host, token, testId]) => {
        // @ts-ignore
        const { Projects } = window.gitbeaker;
        const resource = new Projects({
          host,
          token,
        });

        return resource.create({ name: `Project Creation E2E - Browser ${testId}` });
      },
      [GITLAB_URL, GITLAB_PERSONAL_ACCESS_TOKEN, TEST_ID],
    );

    expect(project).toBeInstanceOf(Object);
    expect(project.name).toEqual(`Project Creation E2E - Browser ${TEST_ID}`);
  });

  it('should upload a file to a project', async ({ page }) => {
    await page.goto(`file://${htmlFilePath}`);

    const response: Record<string, unknown> = await page.evaluate(
      async ([host, token, testId]) => {
        // @ts-ignore
        const { Gitlab } = window.gitbeaker;
        const resource = new Gitlab({
          host,
          token,
        });

        const project = await resource.Projects.create({
          name: `Project File Upload E2E Test - Browser ${testId}`,
        });

        const results = await resource.RepositoryFiles.create(
          project.id,
          'testfile.txt',
          'main',
          'TESTING FILE UPLOAD',
          'init commit',
        );

        return results;
      },
      [GITLAB_URL, GITLAB_PERSONAL_ACCESS_TOKEN, TEST_ID],
    );

    expect(Object.keys(response)).toMatchObject(['file_path', 'branch']);
  });
});
