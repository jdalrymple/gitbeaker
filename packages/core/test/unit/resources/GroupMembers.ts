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
    requestTimeout: 3000,
  });
});

describe('GroupMembers General', () => {
  it('should call /groups prefix', () => {
    expect(service.url.includes('groups')).toBeTruthy();
  });
});

describe('GroupMembers.all', () => {
  it('should call /groups/1/members', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '1/members', {});
  });

  it('should call /groups/1/members/all', async () => {
    await service.all(1, { includeInherited: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '1/members/all', {});
  });
});
