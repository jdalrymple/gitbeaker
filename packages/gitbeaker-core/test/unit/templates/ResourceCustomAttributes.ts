import { ResourceCustomAttributes } from '../../../src/templates';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock('../../../src/infrastructure/RequestHelper');

let service: ResourceCustomAttributes;

beforeEach(() => {
  service = new ResourceCustomAttributes('resource', {
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Instantiating ResourceCustomAttributes service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(ResourceCustomAttributes);
    expect(service.url).toBeDefined();
    expect(service.url).toContain('resource');
  });
});

describe('ResourceCustomAttributes.all', () => {
  it('should call the correct url with a resource id', async () => {
    await service.all('5');

    expect(RequestHelper.get).toBeCalledWith(service, '5/custom_attributes', undefined);
  });
});

describe('ResourceCustomAttributes.set', () => {
  it('should call the correct url with a resource id', async () => {
    await service.set('5', 6, 'on');

    expect(RequestHelper.put).toBeCalledWith(service, '5/custom_attributes/6', {
      value: 'on',
    });
  });
});

describe('ResourceCustomAttributes.remove', () => {
  it('should call the correct url with a resource id and custom attribute id', async () => {
    await service.remove('5', 6);

    expect(RequestHelper.del).toBeCalledWith(service, '5/custom_attributes/6', undefined);
  });
});

describe('ResourceCustomAttributes.show', () => {
  it('should call the correct url with a resource id and custom attribute id', async () => {
    await service.show('5', 6);

    expect(RequestHelper.get).toBeCalledWith(service, '5/custom_attributes/6', undefined);
  });
});
