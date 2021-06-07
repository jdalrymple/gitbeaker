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

describe('Instantiating GroupMembers service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(GroupMembers);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
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
