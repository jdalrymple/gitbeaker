import { ResourceLabels } from '../../../src/templates';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: ResourceLabels;

beforeEach(() => {
  service = new ResourceLabels('resource', {
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Instantiating ResourceLabels service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(ResourceLabels);
    expect(service.url).toBeDefined();
    expect(service.url).toContain('resource');
  });
});

describe('ResourceLabels.all', () => {
  it('should call the correct url with a resource id', async () => {
    await service.all('5');

    expect(RequestHelper.get()).toBeCalledWith(service, '5/labels', undefined);
  });
});

describe('ResourceLabels.create', () => {
  it('should call the correct url with a resource id', async () => {
    await service.create('5', 'review', '#888888');

    expect(RequestHelper.post()).toBeCalledWith(service, '5/labels', {
      name: 'review',
      color: '#888888',
    });
  });
});

describe('ResourceLabels.edit', () => {
  it('should call the correct url with a resource id and label name', async () => {
    await service.edit('5', 'review');

    expect(RequestHelper.put()).toBeCalledWith(service, '5/labels/review', undefined);
  });
});

describe('ResourceLabels.remove', () => {
  it('should call the correct url with a resource id and label name', async () => {
    await service.remove('5', 'review');

    expect(RequestHelper.del()).toBeCalledWith(service, '5/labels/review', undefined);
  });
});

describe('ResourceLabels.subscribe', () => {
  it('should call the correct url with a resource id and label id', async () => {
    await service.subscribe('5', 6);

    expect(RequestHelper.post()).toBeCalledWith(service, '5/issues/6/subscribe', undefined);
  });
});

describe('ResourceLabels.unsubscribe', () => {
  it('should call the correct url with a resource id and label id', async () => {
    await service.unsubscribe('5', 6);

    expect(RequestHelper.del()).toBeCalledWith(service, '5/issues/6/unsubscribe', undefined);
  });
});
