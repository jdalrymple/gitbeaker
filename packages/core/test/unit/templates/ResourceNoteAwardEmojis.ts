import { ResourceNoteAwardEmojis } from '../../../src/templates';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: ResourceNoteAwardEmojis;

beforeEach(() => {
  service = new ResourceNoteAwardEmojis('resource', {
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Instantiating ResourceNoteAwardEmojis service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(ResourceNoteAwardEmojis);
    expect(service.url).toBeDefined();
    expect(service.url).toContain('projects');
  });
});

describe('ResourceNoteAwardEmojis.all', () => {
  it('should call the correct url with a project id, resource id, and note id', async () => {
    await service.all('5', 6, 7);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      '5/resource/6/notes/7/award_emoji',
      undefined,
    );
  });
});

describe('ResourceAccessRequests.award', () => {
  it('should call the correct url with a project id, name, resource id, and note id', async () => {
    await service.award('5', 6, 7, 'frank');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '5/resource/6/notes/7/award_emoji', {
      name: 'frank',
    });
  });

  it('should allow for sudo calls', async () => {
    await service.award('5', 6, 7, 'frank', { sudo: 'test' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '5/resource/6/notes/7/award_emoji', {
      name: 'frank',
      sudo: 'test',
    });
  });
});

describe('ResourceAccessRequests.remove', () => {
  it('should call the correct url with a project id, resource id, award_id, and note id', async () => {
    await service.remove('5', 6, 7, 9);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      '5/resource/6/notes/7/award_emoji/9',
      undefined,
    );
  });

  it('should allow for sudo calls', async () => {
    await service.remove('5', 6, 7, 9, { sudo: 'test' });

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      '5/resource/6/notes/7/award_emoji/9',
      {
        sudo: 'test',
      },
    );
  });
});

describe('ResourceAccessRequests.show', () => {
  it('should call the correct url with a project id, resource id, award_id, and note id', async () => {
    await service.show('5', 6, 7, 9);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      '5/resource/6/notes/7/award_emoji/9',
      undefined,
    );
  });

  it('should allow for sudo calls', async () => {
    await service.show('5', 6, 7, 9, { sudo: 'test' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      '5/resource/6/notes/7/award_emoji/9',
      {
        sudo: 'test',
      },
    );
  });
});
