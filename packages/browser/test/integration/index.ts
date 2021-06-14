import 'jest-extended';
import * as path from 'path';
import * as CoreGB from '@gitbeaker/core';
import { chromium, Browser, Page } from 'playwright';

const { TEST_ID = '', GITLAB_PERSONAL_ACCESS_TOKEN = '', GITLAB_URL = '' } = process.env;
let browser: Browser;
let page: Page;

beforeAll(async () => {
  browser = await chromium.launch({
    timeout: 120000,
  });
});

afterAll(async () => {
  await browser.close();
});

beforeEach(async () => {
  page = await browser.newPage();
  page.setDefaultTimeout(120000);
});

afterEach(async () => {
  await page.close();
});

describe('Browser Import', () => {
  it('should import the Gitbeaker library though the global gitbeaker', async () => {
    const { getAPIMap, Types: coreTypes, Gitlab, ...coreResources } = CoreGB;

    await page.goto(`file://${path.resolve(__dirname, 'assets', 'test-import.html')}`);

    // Run import JS
    /* eslint-disable */
    const importObject = await page.evaluate(() => {
      // @ts-ignore
      const { Gitlab } = gitbeaker;
      const gl = new Gitlab();

      return gl;
    });
    /* eslint-enable */

    expect(Object.keys(importObject)).toIncludeAllMembers(Object.keys(coreResources));
  });
});

describe('Projects API', () => {
  it('should create a project', async () => {
    page.on('console', consoleObj => console.log(consoleObj.text()));

    await page.goto(`file://${path.resolve(__dirname, 'assets', 'test-import.html')}`);

    /* eslint-disable */
    const project = await page.evaluate(
      ([host, token, id]) => {
        console.log(host)
        console.log(token)
        console.log(id)

        // @ts-ignore
        const { Projects } = gitbeaker;
        const resource = new Projects({
          host,
          token,
        });

        return resource.create({ name: `Project Creation Integration Test ${id}` });
      },
      [GITLAB_URL, GITLAB_PERSONAL_ACCESS_TOKEN, TEST_ID],
    );

    expect(project).toBeInstanceOf(Object);
    expect(project.name).toEqual(`Project Creation Integration Test ${TEST_ID}`);
  });
});
