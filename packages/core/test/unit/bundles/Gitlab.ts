import 'jest-extended';
import { Gitlab } from '../../../src';

describe('Instantiating All services', () => {
  it('should create a valid gitlab service object using import', () => {
    const bundle = new Gitlab({
      requesterFn: jest.fn(),
      token: 'abcdefg',
    });

    expect(Object.keys(bundle)).toIncludeAllMembers([
      'Groups',
      'GroupAccessRequests',
      'GroupBadges',
      'GroupCustomAttributes',
      'GroupIssueBoards',
      'GroupMembers',
      'GroupMilestones',
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
      'UserSSHKeys',
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
      'IssueNoteAwardEmojis',
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
      'LicenseTemplates',
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
