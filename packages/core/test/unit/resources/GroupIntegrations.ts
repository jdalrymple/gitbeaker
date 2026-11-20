import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GroupIntegrations } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: GroupIntegrations;

beforeEach(() => {
  service = new GroupIntegrations({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('GroupIntegrations.all', () => {
  it('should request GET /groups/1/integrations', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/integrations', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GroupIntegrations.show', () => {
  it('should request GET /groups/1/integrations/slack', async () => {
    await service.show(1, 'slack');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/integrations/slack', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GroupIntegrations.edit', () => {
  it('should request PUT /groups/1/integrations/slack', async () => {
    await service.edit(1, 'slack');

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'groups/1/integrations/slack', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request PUT /groups/1/integrations/slack with options', async () => {
    await service.edit(1, 'slack', { webhook: 'x' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'groups/1/integrations/slack', {
      body: { webhook: 'x' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GroupIntegrations.remove', () => {
  it('should request DEL /groups/1/integrations/slack', async () => {
    await service.remove(1, 'slack');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'groups/1/integrations/slack', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
