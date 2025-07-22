import { ResourceMarkdownUploads } from '../../../src/templates';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: ResourceMarkdownUploads<false>;

beforeEach(() => {
  service = new ResourceMarkdownUploads('resource', {
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Instantiating ResourceMarkdownUploads service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(ResourceMarkdownUploads);
    expect(service.url).toBeDefined();
    expect(service.url).toContain('resource');
  });
});

describe('ResourceMarkdownUploads.download', () => {
  it('should call the correct url with a resource id and upload id', async () => {
    await service.download(5, 6);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/uploads/6', undefined);
  });
  it('should call the correct url with a resource id and a secret and a filename', async () => {
    await service.download(5, '6', '7.txt');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/uploads/6/7.txt', undefined);
  });
});

describe('ResourceMarkdownUploads.all', () => {
  it('should call the correct url with a resource id', async () => {
    await service.all('5');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/uploads', undefined);
  });
});

describe('ResourceMarkdownUploads.remove', () => {
  it('should call the correct url with a resource id and upload id', async () => {
    await service.remove('5', '6');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, '5/uploads/6', undefined);
  });
  it('should call the correct url with a resource id and a secret and a filename', async () => {
    await service.remove('5', '6', '7.txt');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, '5/uploads/6/7.txt', undefined);
  });
});
