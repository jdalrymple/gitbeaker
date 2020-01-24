import { ResourceAwardEmojis } from '../../../src/templates';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock('../../../src/infrastructure/RequestHelper');

let service: ResourceAwardEmojis;

beforeEach(() => {
  const requester = {
    get: jest.fn(() => []),
    post: jest.fn(() => ({})),
    put: jest.fn(() => ({})),
  };

  service = new ResourceAwardEmojis('resource', {
    requester,
    token: 'abcdefg',
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Instantiating ResourceAwardEmojis service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(ResourceAwardEmojis);
    expect(service.url).toBeDefined();
    expect(service.url).toContain('projects');
  });
});

describe('ResourceAwardEmojis.all', () => {
  it('should call correct url with a project id, resource id, and note id', async () => {
    await service.all('5', 6, 7);

    expect(RequestHelper.get).toBeCalledWith(
      service,
      '5/resource/6/notes/7/award_emoji',
      undefined,
    );
  });
});

describe('ResourceAccessRequests.award', () => {
  it('should call correct url with a project id, name, resource id, and note id', async () => {
    await service.award('5', 6, 7, 'frank');

    expect(RequestHelper.post).toBeCalledWith(service, '5/resource/6/notes/7/award_emoji', {
      name: 'frank',
    });
  });

  it('should allow for sudo calls', async () => {
    await service.award('5', 6, 7, 'frank', { sudo: 'test' });

    expect(RequestHelper.post).toBeCalledWith(service, '5/resource/6/notes/7/award_emoji', {
      name: 'frank',
      sudo: 'test',
    });
  });
});

describe('ResourceAccessRequests.remove', () => {
  it('should call correct url with a project id, resource id, award_id, and note id', async () => {
    await service.remove('5', 6, 7, 9);

    expect(RequestHelper.del).toBeCalledWith(
      service,
      '5/resource/6/notes/7/award_emoji/9',
      undefined,
    );
  });

  it('should allow for sudo calls', async () => {
    await service.remove('5', 6, 7, 9, { sudo: 'test' });

    expect(RequestHelper.del).toBeCalledWith(service, '5/resource/6/notes/7/award_emoji/9', {
      sudo: 'test',
    });
  });
});

describe('ResourceAccessRequests.show', () => {
  it('should call correct url with a project id, resource id, award_id, and note id', async () => {
    await service.show('5', 6, 7, 9);

    expect(RequestHelper.get).toBeCalledWith(
      service,
      '5/resource/6/notes/7/award_emoji/9',
      undefined,
    );
  });

  it('should allow for sudo calls', async () => {
    await service.show('5', 6, 7, 9, { sudo: 'test' });

    expect(RequestHelper.get).toBeCalledWith(service, '5/resource/6/notes/7/award_emoji/9', {
      sudo: 'test',
    });
  });
});
