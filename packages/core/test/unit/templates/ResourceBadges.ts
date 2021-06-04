import { ResourceBadges } from '../../../src/templates';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: ResourceBadges;

beforeEach(() => {
  service = new ResourceBadges('resource', {
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Instantiating ResourceBadges service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(ResourceBadges);
    expect(service.url).toBeDefined();
    expect(service.url).toContain('resource');
  });
});

describe('ResourceBadges.add', () => {
  it('should call the correct url with a resource id', async () => {
    await service.add('5');

    expect(RequestHelper.post()).toBeCalledWith(service, '5/badges', undefined);
  });
});

describe('ResourceBadges.all', () => {
  it('should call the correct url with a resource id', async () => {
    await service.all('5');

    expect(RequestHelper.get()).toBeCalledWith(service, '5/badges', undefined);
  });
});

describe('ResourceBadges.edit', () => {
  it('should call the correct url with a resource id and badge id', async () => {
    await service.edit('5', 6);

    expect(RequestHelper.put()).toBeCalledWith(service, '5/badges/6', undefined);
  });
});

describe('ResourceBadges.preview', () => {
  it('should call the correct url with a resource id, linkUrl and imageUrl', async () => {
    await service.preview('5', 'https://url.com', 'https://image.com');

    expect(RequestHelper.get()).toBeCalledWith(service, '5/badges/render', {
      linkUrl: 'https://url.com',
      imageUrl: 'https://image.com',
    });
  });
});

describe('ResourceBadges.remove', () => {
  it('should call the correct url with a resource id and badge id', async () => {
    await service.remove('5', 6);

    expect(RequestHelper.del()).toBeCalledWith(service, '5/badges/6', undefined);
  });
});

describe('ResourceBadges.show', () => {
  it('should call the correct url with a resource id and badge id', async () => {
    await service.show('5', 6);

    expect(RequestHelper.get()).toBeCalledWith(service, '5/badges/6', undefined);
  });
});
