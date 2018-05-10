import { GroupsBundle } from '../../src';
import Services from '../../src/services';

test('All the correct service keys are included in the groups bundle', async () => {
  const bundle = new GroupsBundle();
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

  expect(bundle).toHaveProperty(services);
});

test('All the correct service instances are included in the groups bundle', async () => {
  const bundle = new GroupsBundle();

  Object.keys(bundle).forEach(key => {
    expect(bundle[key]).instanceOf(Services[key]);
  });
});
