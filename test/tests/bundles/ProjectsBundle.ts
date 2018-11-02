import { ProjectsBundle } from '../../../src';
import * as Services from '../../../src/services';

test('All the correct service keys are included in the projects bundle', async () => {
  const bundle = new ProjectsBundle({ token: 'test' });
  const services = [
    'Branches',
    'Commits',
    'CommitDiscussions',
    'DeployKeys',
    'Deployments',
    'Environments',
    'Issues',
    'IssueAwardEmojis',
    'IssueNotes',
    'IssueDiscussions',
    'Jobs',
    'Labels',
    'MergeRequests',
    'MergeRequestAwardEmojis',
    'MergeRequestDiscussions',
    'MergeRequestNotes',
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
    'ProjectVariables',
    'Repositories',
    'RepositoryFiles',
    'Runners',
    'Services',
    'Tags',
    'Triggers',
  ];

  expect(Object.keys(bundle)).toEqual(expect.arrayContaining(services));
});

test('All the correct service instances are included in the projects bundle', async () => {
  const bundle = new ProjectsBundle({ token: 'test' });

  (Object.keys(bundle) as (keyof typeof bundle)[]).forEach((key) => {
    expect(bundle[key]).toBeInstanceOf(Services[key]);
  });
});
