import { RequesterFn } from '@gitbeaker/requester-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { RequestHelper } from '../../../src/infrastructure';
import { ResourceMarkdownUploads } from '../../../src/templates';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ResourceMarkdownUploads<false>;

beforeEach(() => {
  service = new ResourceMarkdownUploads('resource', {
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  vi.clearAllMocks();
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

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/uploads/6', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
  it('should call the correct url with a resource id and a secret and a filename', async () => {
    await service.download(5, '6', '7.txt');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/uploads/6/7.txt', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceMarkdownUploads.all', () => {
  it('should call the correct url with a resource id', async () => {
    await service.all('5');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/uploads', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceMarkdownUploads.remove', () => {
  it('should call the correct url with a resource id and upload id', async () => {
    await service.remove('5', '6');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, '5/uploads/6', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
  it('should call the correct url with a resource id and a secret and a filename', async () => {
    await service.remove('5', '6', '7.txt');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, '5/uploads/6/7.txt', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
