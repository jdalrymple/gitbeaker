import { ResourceVariables } from '../../../src/templates';
import { RequestHelper } from '../../../src/infrastructure';

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

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/variables', undefined);
  });
});

describe('ResourceVariables.create', () => {
  it('should call the correct url with a resource id', async () => {
    await service.create('5', 'key', 'value');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '5/variables', {
      key: 'key',
      value: 'value',
    });
  });
});

describe('ResourceVariables.edit', () => {
  it('should call the correct url with a resource id and key', async () => {
    await service.edit('5', 'key', 'value');

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, '5/variables/key', {
      value: 'value',
    });
  });
});

describe('ResourceVariables.remove', () => {
  it('should call the correct url with a resource id and key id', async () => {
    await service.remove('5', '6');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, '5/variables/6', undefined);
  });
});

describe('ResourceVariables.show', () => {
  it('should call the correct url with a resource id and key id', async () => {
    await service.show('5', '6');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/variables/6', undefined);
  });
});
