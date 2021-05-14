import { GroupRunners } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: GroupRunners;

beforeEach(() => {
  service = new GroupRunners({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating GroupRunners service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(GroupRunners);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('GroupRunners.all', () => {
  it('should request GET /groups/:id/runners', async () => {
    await service.all(1, { test: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/runners', { test: 1 });
  });

  it('should request GET /groups/:id/runners without options', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/runners', undefined);
  });
});
