import { ResourceMembers } from '../../../src/templates';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: ResourceMembers;

beforeEach(() => {
  service = new ResourceMembers('resource', {
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Instantiating ResourceMembers service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(ResourceMembers);
    expect(service.url).toBeDefined();
    expect(service.url).toContain('resource');
  });
});

describe('ResourceMembers.add', () => {
  it('should call the correct url for adding a member with a resource id, user id and access level', async () => {
    await service.add('5', 5, 10);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '5/members', {
      accessLevel: 10,
      userId: '5',
    });
  });
});

describe('ResourceMembers.all', () => {
  it('should call the correct url for getting all members for a resource', async () => {
    await service.all('5');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/members', {});
  });

  it('should call the correct url for getting all members for a resource including inherited ones', async () => {
    await service.all('5', { includeInherited: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/members/all', {});
  });
});

describe('ResourceMembers.edit', () => {
  it('should call the correct url for editing a member with a resource id, user id and access level', async () => {
    await service.edit('5', 5, 10);

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, '5/members/5', {
      accessLevel: 10,
    });
  });
});

describe('ResourceMembers.show', () => {
  it('should call the correct url for showing a member with a resource id, and user id', async () => {
    await service.show('5', 5);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/members/5', {});
  });

  it('should call the correct url for showing a member with a resource id, and user id, including inherited ones', async () => {
    await service.show('5', 5, { includeInherited: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/members/all/5', {});
  });
});

describe('ResourceMembers.remove', () => {
  it('should call the correct url for removing a member with a resource id, and user id', async () => {
    await service.remove('5', 5);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, '5/members/5', undefined);
  });
});
