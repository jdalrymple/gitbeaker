import { RequestHelper } from '../../../src/infrastructure';
import { ResourceVariables } from '../../../src/templates';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: ResourceVariables<false>;

beforeEach(() => {
  service = new ResourceVariables('resource', {
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Instantiating ResourceVariables service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(ResourceVariables);
    expect(service.url).toBeDefined();
    expect(service.url).toContain('resource');
  });
});

describe('ResourceVariables.all', () => {
  it('should call the correct url with a resource id', async () => {
    await service.all('5');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/variables', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceVariables.create', () => {
  it('should call the correct url with a resource id', async () => {
    await service.create('5', 'key', 'value');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '5/variables', {
      body: {
        key: 'key',
        value: 'value',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceVariables.edit', () => {
  it('should call the correct url with a resource id and key', async () => {
    await service.edit('5', 'key', 'value');

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, '5/variables/key', {
      body: {
        value: 'value',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceVariables.remove', () => {
  it('should call the correct url with a resource id and key id', async () => {
    await service.remove('5', '6');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, '5/variables/6', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceVariables.show', () => {
  it('should call the correct url with a resource id and key id', async () => {
    await service.show('5', '6');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/variables/6', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
