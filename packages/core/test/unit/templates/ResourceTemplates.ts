import { ResourceTemplates } from '../../../src/templates';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: ResourceTemplates;

beforeEach(() => {
  service = new ResourceTemplates('resource', {
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Instantiating ResourceTemplates service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(ResourceTemplates);
    expect(service.url).toBeDefined();
    expect(service.url).toContain('resource');
  });
});

describe('ResourceTemplates.all', () => {
  it('should call the correct url', async () => {
    await service.all();

    expect(RequestHelper.get()).toBeCalledWith(service, '', undefined);
  });
});

describe('ResourceTemplates.show', () => {
  it('should call the correct url with a resource id', async () => {
    await service.show(6);

    expect(RequestHelper.get()).toBeCalledWith(service, '6', undefined);
  });
});
