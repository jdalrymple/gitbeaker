import path from 'path';
import { expect, test as it } from '@playwright/test';

const { describe } = it;

const { GITLAB_PERSONAL_ACCESS_TOKEN = '', GITLAB_URL = '', TEST_ID = Date.now() } = process.env;
const htmlFilePath = path.resolve(__dirname, '..', 'assets', 'test-import.html');

describe('Projects API', () => {
  it('should create a project', async ({ page }) => {
    await page.goto(`file://${htmlFilePath}`);

    const project = await page.evaluate(
      ([host, token, testId]) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { Projects } = window.gitbeaker;
        const resource = new Projects({
          host,
          token,
        });

        const project = await resource.create({
          name: `Project File Upload E2E Test - Browser ${testId}`,
        });

        const blob = new Blob(['TESTING FILE UPLOAD'], {
          type: 'text/plain',
        });

        const results = await resource.upload(project.id, {
          content: blob,
          filename: 'testfile.txt',
        });

        return results;
      },
      [GITLAB_URL, GITLAB_PERSONAL_ACCESS_TOKEN, TEST_ID],
    );

    expect(Object.keys(response)).toMatchObject(['alt', 'url', 'full_path', 'markdown']);
  });
});
