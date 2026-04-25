import { RequestHelper } from '../../../src/infrastructure';
import { ResourceCustomAttributes } from '../../../src/templates';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ResourceCustomAttributes;

beforeEach(() => {
  service = new ResourceCustomAttributes('resource', {
    requesterFn: vi.fn(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Instantiating ResourceCustomAttributes service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(ResourceCustomAttributes);
    expect(service.url).toBeDefined();
    expect(service.url).toContain('resource');
  });
});

describe('ResourceCustomAttributes.all', () => {
  it('should call the correct url with a resource id', async () => {
    await service.all('5');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/custom_attributes', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceCustomAttributes.set', () => {
  it('should call the correct url with a resource id', async () => {
    await service.set('5', '6', 'on');

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, '5/custom_attributes/6', {
      body: {
        value: 'on',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceCustomAttributes.remove', () => {
  it('should call the correct url with a resource id and custom attribute id', async () => {
    await service.remove('5', '6');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, '5/custom_attributes/6', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceCustomAttributes.show', () => {
  it('should call the correct url with a resource id and custom attribute id', async () => {
    await service.show('5', '6');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/custom_attributes/6', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
