import { GroupsBundle } from '../../../src';
import * as Services from '../../../src/services';

test('All the correct service keys are included in the groups bundle', async () => {
  const bundle = new GroupsBundle({ token: 'test' });
  const services = [
    'Groups',
    'GroupAccessRequests',
    'GroupBadges',
    'GroupCustomAttributes',
    'GroupIssueBoards',
    'GroupMembers',
    'GroupMilestones',
    'GroupProjects',
    'GroupVariables',
    'Epics',
    'EpicIssues',
    'EpicNotes',
    'EpicDiscussions',
  ];

  expect(Object.keys(bundle)).toEqual(expect.arrayContaining(services));
});

test('All the correct service instances are included in the groups bundle', async () => {
  const bundle = new GroupsBundle({ token: 'test' });

  (Object.keys(bundle) as (keyof typeof bundle)[]).forEach((key) => {
    expect(bundle[key]).toBeInstanceOf(Services[key]);
  });
});
