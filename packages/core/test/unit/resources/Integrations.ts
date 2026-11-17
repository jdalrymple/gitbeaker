import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Integrations } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Integrations;

beforeEach(() => {
  service = new Integrations({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Integrations.all', () => {
  it('should request GET /projects/:id/integrations', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/integrations', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Integrations.edit', () => {
  it('should request PUT /projects/:id/integrations/:name', async () => {
    await service.edit(1, 'slack' as any, { webhook: 'http://x' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/integrations/slack', {
      body: { webhook: 'http://x' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should send an empty body without options', async () => {
    await service.edit(1, 'slack' as any);

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/integrations/slack', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Integrations.disable', () => {
  it('should request DELETE /projects/:id/integrations/:name', async () => {
    await service.disable(1, 'slack' as any);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/integrations/slack', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Integrations.show', () => {
  it('should request GET /projects/:id/integrations/:name', async () => {
    await service.show(1, 'slack' as any);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/integrations/slack', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
