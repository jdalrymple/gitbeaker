import { RequestHelper } from '../../../src/infrastructure';
import { Applications } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: Applications;

beforeEach(() => {
  service = new Applications({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('Applications.all', () => {
  it('should request GET /applications without options', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'applications', undefined);
  });
});

describe('Applications.show', () => {
  it('should request GET /applications', async () => {
    await service.create('application', 'url', 'scope1');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'applications', {
      name: 'application',
      redirectUri: 'url',
      scopes: 'scope1',
    });
  });
});

describe('Applications.remove', () => {
  it('should request GET /applications/:id', async () => {
    await service.remove(12);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'applications/12', undefined);
  });
});
