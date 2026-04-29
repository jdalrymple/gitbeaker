import { RequestHelper } from '../../../src/infrastructure';
import { RequesterFn } from '@gitbeaker/requester-utils';
import { ResourceLabels } from '../../../src/templates';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ResourceLabels;

beforeEach(() => {
  service = new ResourceLabels('resource', {
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Instantiating ResourceLabels service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(ResourceLabels);
    expect(service.url).toBeDefined();
    expect(service.url).toContain('resource');
  });
});

describe('ResourceLabels.all', () => {
  it('should call the correct url with a resource id', async () => {
    await service.all('5');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/labels', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceLabels.create', () => {
  it('should call the correct url with a resource id', async () => {
    await service.create('5', 'review', '#888888');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '5/labels', {
      body: { name: 'review', color: '#888888' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceLabels.edit', () => {
  it('should call the correct url with a resource id and label name', async () => {
    await service.edit(5, 2, { newName: 'review' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, '5/labels/2', {
      body: { newName: 'review' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceLabels.remove', () => {
  it('should call the correct url with a resource id and label name', async () => {
    await service.remove('5', 'review');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, '5/labels/review', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceLabels.subscribe', () => {
  it('should call the correct url with a resource id and label id', async () => {
    await service.subscribe('5', 6);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '5/issues/6/subscribe', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceLabels.unsubscribe', () => {
  it('should call the correct url with a resource id and label id', async () => {
    await service.unsubscribe('5', 6);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, '5/issues/6/unsubscribe', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
