import { ResourceVariables } from '../../../src/templates';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
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

    expect(RequestHelper.get()).toBeCalledWith(service, '5/variables', undefined);
  });
});

describe('ResourceVariables.create', () => {
  it('should call the correct url with a resource id', async () => {
    await service.create('5');

    expect(RequestHelper.post()).toBeCalledWith(service, '5/variables', undefined);
  });
});

describe('ResourceVariables.edit', () => {
  it('should call the correct url with a resource id and key id', async () => {
    await service.edit('5', '6');

    expect(RequestHelper.put()).toBeCalledWith(service, '5/variables/6', undefined);
  });
});

describe('ResourceVariables.remove', () => {
  it('should call the correct url with a resource id and key id', async () => {
    await service.remove('5', '6');

    expect(RequestHelper.del()).toBeCalledWith(service, '5/variables/6', undefined);
  });
});

describe('ResourceVariables.show', () => {
  it('should call the correct url with a resource id and key id', async () => {
    await service.show('5', '6');

    expect(RequestHelper.get()).toBeCalledWith(service, '5/variables/6', undefined);
  });
});
