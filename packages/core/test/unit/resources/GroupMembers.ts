import { GroupMembers } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: GroupMembers;

beforeEach(() => {
  service = new GroupMembers({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('GroupMembers General', () => {
  it('should include a /groups prefix in the reousrce url', () => {
    expect(service.url.includes('groups')).toBeTruthy();
  });
});

describe('GroupMembers.add', () => {
  it('should request POST /groups/1/members', async () => {
    await service.add(1, 10, { userId: 2 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '1/members', {
      userId: 2,
      accessLevel: 10,
    });
  });

  it('should request POST /groups/user.name/members', async () => {
    await service.add(1, 10, { username: 'user.name' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '1/members', {
      username: 'user.name',
      accessLevel: 10,
    });
  });
});

describe('GroupMembers.all', () => {
  it('should request GET /groups/1/members', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '1/members', {});
  });

  it('should request GET /groups/1/members/all', async () => {
    await service.all(1, { includeInherited: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '1/members/all', {});
  });
});

describe('GroupMembers.edit', () => {
  it('should request PUT /groups/1/members', async () => {
    await service.edit(1, 2, 10);

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, '1/members/2', {
      accessLevel: 10,
    });
  });
});

describe('GroupMembers.show', () => {
  it('should request GET /groups/1/members/2', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '1/members/2', {});
  });

  it('should request GET /groups/1/members/all/2', async () => {
    await service.show(1, 2, { includeInherited: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '1/members/all/2', {});
  });
});

describe('GroupMembers.remove', () => {
  it('should request DEL /groups/1/members/2', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, '1/members/2', undefined);
  });
});

describe('GroupMembers.allBillable', () => {
  it('should request GET /groups/1/billable_members', async () => {
    await service.allBillable(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '1/billable_members', undefined);
  });
});

describe('GroupMembers.allPending', () => {
  it('should request GET /groups/1/pending_members', async () => {
    await service.allPending(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '1/pending_members', undefined);
  });
});

describe('GroupMembers.allBillableMemberships', () => {
  it('should request GET /groups/1/billable_members/2/memberships', async () => {
    await service.allBillableMemberships(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      '1/billable_members/2/memberships',
      undefined,
    );
  });
});

describe('GroupMembers.approve', () => {
  it('should request PUT /groups/1/members/2/approve', async () => {
    await service.approve(1, 2);

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, '1/members/2/approve', undefined);
  });
});

describe('GroupMembers.approveAll', () => {
  it('should request PUT /groups/1/members/approve_all', async () => {
    await service.approveAll(1);

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, '1/members/approve_all', undefined);
  });
});

describe('GroupMembers.removeBillable', () => {
  it('should request DEL /groups/1/billable_members/2', async () => {
    await service.removeBillable(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, '1/billable_members/2', undefined);
  });
});

describe('GroupMembers.removeOverrideFlag', () => {
  it('should request DEL /groups/1/members/2/override', async () => {
    await service.removeOverrideFlag(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, '1/members/2/override', undefined);
  });
});

describe('GroupMembers.setOverrideFlag', () => {
  it('should request DEL /groups/1/members/2/override', async () => {
    await service.setOverrideFlag(1, 2);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '1/members/2/override', undefined);
  });
});
