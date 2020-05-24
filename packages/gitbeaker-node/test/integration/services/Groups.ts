import { Groups } from '../../../src';

let service: Groups;

beforeEach(() => {
  service = new Groups({
    host: process.env.GITLAB_URL,
    token: process.env.PERSONAL_ACCESS_TOKEN,
  });
});

describe('Groups.create', () => {
  it('should create a valid group', async () => {
    const g = await service.create(
      'Group Creation Integration Test',
      'group-creation-integration-test',
    );
    expect(g).toBeInstanceOf(Object);
    expect(g.name).toEqual('Group Creation Integration Test');
  });
});

describe('Groups.all', () => {
  it('should get a list of all groups', async () => {
    const g = await service.all();
    expect(g).toBeInstanceOf(Array);
  });
});

describe('Groups.edit', () => {
  it('should edit a group', async () => {
    const g = await service.create('Group Edit Integration Test', 'group-edit-integration-test');
    const ge = await service.edit(g.id, { name: 'Group Edit Integration Test Updated' });

    expect(g).toBeInstanceOf(Object);
    expect(ge.name).toBe('Group Edit Integration Test Updated');
  });
});

describe('Groups.projects', () => {
  it('should get all the projects of a group', async () => {
    const g = await service.create(
      'Group Projects Integration Test',
      'group-projects-integration-test',
    );

    const ps = await service.projects(g.id);

    expect(ps).toBeInstanceOf(Array);
  });
});

describe('Groups.show', () => {
  it('should show a group', async () => {
    const g = await service.create('Group Show Integration Test', 'group-show-integration-test');

    const gs = await service.show(g.id);

    expect(gs).toContainKeys(Object.keys(g));
  });
});

describe('Groups.remove', () => {
  it('should remove a group', async () => {
    const g = await service.create(
      'Group Remove Integration Test',
      'group-remove-integration-test',
    );

    const response = await service.remove(g.id, { showExpanded: true });

    expect(response.status).toBe(202);
  });
});

describe('Groups.search', () => {
  it('should search a group', async () => {
    const g = await service.create(
      'Group Search Integration Test',
      'group-search-integration-test',
    );

    const gs = await service.search('group-search-integration-test');

    await expect(gs[0].id).toBe(g.id);
  });
});
