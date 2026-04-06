import { RequestHelper } from '../../../src/infrastructure';
import { Applications } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
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

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'applications', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Applications.create', () => {
  it('should request POST /applications', async () => {
    await service.create('application', 'url', 'scope1');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'applications', {
      body: {
        name: 'application',
        redirectUri: 'url',
        scopes: 'scope1',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Applications.remove', () => {
  it('should request DEL /applications/:id', async () => {
    await service.remove(12);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'applications/12', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
