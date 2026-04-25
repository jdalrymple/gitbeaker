import { RequestHelper } from '../../../src/infrastructure';
import { ResourceNoteAwardEmojis } from '../../../src/templates';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ResourceNoteAwardEmojis;

beforeEach(() => {
  service = new ResourceNoteAwardEmojis('resource', {
    requesterFn: vi.fn(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  vi.clearAllMocks();
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

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/resource/6/notes/7/award_emoji', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceAccessRequests.award', () => {
  it('should call the correct url with a project id, name, resource id, and note id', async () => {
    await service.award('5', 6, 7, 'frank');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '5/resource/6/notes/7/award_emoji', {
      body: { name: 'frank' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should allow for sudo calls', async () => {
    await service.award('5', 6, 7, 'frank', { sudo: 'test' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '5/resource/6/notes/7/award_emoji', {
      body: { name: 'frank' },
      showExpanded: undefined,
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
      { showExpanded: undefined, sudo: undefined },
    );
  });

  it('should allow for sudo calls', async () => {
    await service.remove('5', 6, 7, 9, { sudo: 'test' });

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      '5/resource/6/notes/7/award_emoji/9',
      {
        showExpanded: undefined,
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
      { showExpanded: undefined, sudo: undefined },
    );
  });

  it('should allow for sudo calls', async () => {
    await service.show('5', 6, 7, 9, { sudo: 'test' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      '5/resource/6/notes/7/award_emoji/9',
      {
        showExpanded: undefined,
        sudo: 'test',
      },
    );
  });
});
