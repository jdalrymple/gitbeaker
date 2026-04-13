import { RequestHelper } from '../../../src/infrastructure';
import { ResourceTemplates } from '../../../src/templates';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
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

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceTemplates.show', () => {
  it('should call the correct url with a resource id', async () => {
    await service.show(6);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '6', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
