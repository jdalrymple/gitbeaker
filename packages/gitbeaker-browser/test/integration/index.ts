import * as path from 'path';
import { chromium, Browser, Page } from 'playwright';

const { TEST_ID } = process.env;
let browser: Browser;
let page: Page;

beforeAll(async () => {
  browser = await chromium.launch();
});

afterAll(async () => {
  await browser.close();
});

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(async () => {
  await page.close();
});

describe('Browser Import', () => {
  it('should import the Gitbeaker library though the global gitbeaker', async () => {
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
    expect(Object.keys(importObject)).toIncludeAllMembers([
      'Groups',
      'GroupAccessRequests',
      'GroupBadges',
      'GroupCustomAttributes',
      'GroupIssueBoards',
      'GroupMembers',
      'GroupMilestones',
      'GroupProjects',
      'GroupRunners',
      'GroupVariables',
      'GroupLabels',
      'GroupDeployTokens',
      'Epics',
      'EpicIssues',
      'EpicNotes',
      'EpicDiscussions',
      'Users',
      'UserCustomAttributes',
      'UserEmails',
      'UserImpersonationTokens',
      'UserKeys',
      'UserGPGKeys',
      'Branches',
      'Commits',
      'CommitDiscussions',
      'ContainerRegistry',
      'Deployments',
      'DeployKeys',
      'Environments',
      'FreezePeriods',
      'Issues',
      'IssuesStatistics',
      'IssueNotes',
      'IssueDiscussions',
      'IssueAwardEmojis',
      'Jobs',
      'Labels',
      'MergeRequests',
      'MergeRequestApprovals',
      'MergeRequestAwardEmojis',
      'MergeRequestDiscussions',
      'MergeRequestNotes',
      'Packages',
      'Pipelines',
      'PipelineSchedules',
      'PipelineScheduleVariables',
      'Projects',
      'ProjectAccessRequests',
      'ProjectBadges',
      'ProjectCustomAttributes',
      'ProjectImportExport',
      'ProjectIssueBoards',
      'ProjectHooks',
      'ProjectMembers',
      'ProjectMilestones',
      'ProjectSnippets',
      'ProjectSnippetNotes',
      'ProjectSnippetDiscussions',
      'ProjectSnippetAwardEmojis',
      'ProtectedBranches',
      'ProtectedTags',
      'ProjectVariables',
      'ProjectDeployTokens',
      'PushRules',
      'Releases',
      'ReleaseLinks',
      'Repositories',
      'RepositoryFiles',
      'Runners',
      'Services',
      'Tags',
      'Todos',
      'Triggers',
      'VulnerabilityFindings',
      'ApplicationSettings',
      'BroadcastMessages',
      'Events',
      'FeatureFlags',
      'GeoNodes',
      'GitignoreTemplates',
      'GitLabCIYMLTemplates',
      'Keys',
      'License',
      'LicenceTemplates',
      'Lint',
      'Namespaces',
      'NotificationSettings',
      'Markdown',
      'PagesDomains',
      'Search',
      'SidekiqMetrics',
      'Snippets',
      'SystemHooks',
      'Version',
      'Wikis',
    ]);
  });
});

describe('Projects API', () => {
  it('should create a project', async () => {
    await page.goto(`file://${path.resolve(__dirname, 'assets', 'test-import.html')}`);

    /* eslint-disable */
    const project = await page.evaluate(
      ([host, token, id]) => {
        // @ts-ignore
        const { Projects } = gitbeaker;
        const service = new Projects({
          host,
          token,
        });

        return service.create({ name: `Project Creation Integration Test ${id}` });
      },
      [process.env.GITLAB_URL, process.env.GITLAB_PERSONAL_ACCESS_TOKEN, TEST_ID],
    );

    expect(project).toBeInstanceOf(Object);
    expect(project.name).toEqual(`Project Creation Integration Test ${TEST_ID}`);
  });
});
