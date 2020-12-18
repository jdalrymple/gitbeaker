import { RequestHelper } from '../../../src/infrastructure';
import { Groups } from '../../../src';
import { mockRequesterFn } from '../../mocks/requesterFn';

jest.mock('../../../src/infrastructure/RequestHelper');

let service: Groups;

beforeEach(() => {
  service = new Groups({
    requesterFn: mockRequesterFn,
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating Groups service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(Groups);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('Groups.all', () => {
  it('should request GET /groups', async () => {
    await service.all();

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'groups', undefined);
  });
});

describe('Groups.create', () => {
  it('should request POST /groups', async () => {
    await service.create('test group', 'test-group');

    expect(RequestHelper.post).toHaveBeenCalledWith(service, 'groups', {
      name: 'test group',
      path: 'test-group',
    });
  });
});

describe('Groups.edit', () => {
  it('should request PUT /groups', async () => {
    await service.edit(12, { name: 'test group 2' });

    expect(RequestHelper.put).toHaveBeenCalledWith(service, 'groups/12', {
      name: 'test group 2',
    });
  });
});

describe('Groups.projects', () => {
  it('should request GET /groups/:id/projects', async () => {
    await service.projects(12);

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'groups/12/projects', undefined);
  });
});

describe('Groups.show', () => {
  it('should request GET /groups/:id', async () => {
    await service.show(12);

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'groups/12', undefined);
  });
});

describe('Groups.remove', () => {
  it('should request DEL /groups/:id', async () => {
    await service.remove(12);

    expect(RequestHelper.del).toHaveBeenCalledWith(service, 'groups/12', undefined);
  });
});

describe('Groups.removeLDAPLink', () => {
  it('should request DEL /groups/:id/ldap_group_links/:id without provider', async () => {
    await service.removeLDAPLink(1, 2);

    expect(RequestHelper.del).toHaveBeenCalledWith(service, 'groups/1/ldap_group_links/2', {});
  });

  it('should request DEL /groups/:id/ldap_group_links/:provider/:id with provider', async () => {
    await service.removeLDAPLink(1, 2, { provider: 'test' });

    expect(RequestHelper.del).toHaveBeenCalledWith(service, 'groups/1/ldap_group_links/test/2', {});
  });
});

describe('Groups.search', () => {
  it('should request GET /groups', async () => {
    await service.search('keywords');

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'groups', {
      search: 'keywords',
    });
  });
});
