import { RequestHelper } from '../../../src/infrastructure';
import { ResourceMilestones } from '../../../src/templates';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock(
  '../../../src/infrastructure/RequestHelper',
  async () => {
    const mock = await vi.importActual('../../__mocks__/RequestHelper');
    return (mock as any).default;
  },
);

let service: ResourceMilestones;

beforeEach(() => {
  service = new ResourceMilestones('resource', {
    requesterFn: vi.fn(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Instantiating ResourceMilestones service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(ResourceMilestones);
    expect(service.url).toBeDefined();
    expect(service.url).toContain('resource');
  });
});

describe('ResourceMilestones.all', () => {
  it('should call the correct url with a resource id', async () => {
    await service.all('5');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/milestones', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceMilestones.create', () => {
  it('should call the correct url with a resource id', async () => {
    await service.create('5', 'sprint');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '5/milestones', {
      body: { title: 'sprint' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceMilestones.edit', () => {
  it('should call the correct url with a resource id and milestone id', async () => {
    await service.edit('5', 6);

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, '5/milestones/6', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceMilestones.allAssignedIssues', () => {
  it('should call the correct url with a resource id', async () => {
    await service.allAssignedIssues('5', 6);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/milestones/6/issues', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceMilestones.allAssignedMergeRequests', () => {
  it('should call the correct url with a resource id', async () => {
    await service.allAssignedMergeRequests('5', 6);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/milestones/6/merge_requests', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceMilestones.show', () => {
  it('should call the correct url with a resource id and milestone id', async () => {
    await service.show('5', 6);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/milestones/6', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
