import { RequestHelper } from '../../../src/infrastructure';
import { RequesterFn } from '@gitbeaker/requester-utils';
import { ResourceBadges } from '../../../src/templates';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ResourceBadges;

beforeEach(() => {
  service = new ResourceBadges('resource', {
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Instantiating ResourceBadges service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(ResourceBadges);
    expect(service.url).toBeDefined();
    expect(service.url).toContain('resource');
  });
});

describe('ResourceBadges.add', () => {
  it('should call the correct url with a resource id', async () => {
    await service.add(5, 'link', 'image');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '5/badges', {
      body: {
        linkUrl: 'link',
        imageUrl: 'image',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceBadges.all', () => {
  it('should call the correct url with a resource id', async () => {
    await service.all('5');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/badges', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceBadges.edit', () => {
  it('should call the correct url with a resource id and badge id', async () => {
    await service.edit('5', 6);

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, '5/badges/6', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceBadges.preview', () => {
  it('should call the correct url with a resource id, linkUrl and imageUrl', async () => {
    await service.preview('5', 'https://url.com', 'https://image.com');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/badges/render', {
      searchParams: {
        linkUrl: 'https://url.com',
        imageUrl: 'https://image.com',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceBadges.remove', () => {
  it('should call the correct url with a resource id and badge id', async () => {
    await service.remove('5', 6);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, '5/badges/6', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceBadges.show', () => {
  it('should call the correct url with a resource id and badge id', async () => {
    await service.show('5', 6);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/badges/6', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
