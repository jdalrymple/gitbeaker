import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AICatalog } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: AICatalog;

beforeEach(() => {
  service = new AICatalog({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('AICatalog.seedExternalAgents', () => {
  it('should request POST /admin/ai_catalog/seed_external_agents', async () => {
    await service.seedExternalAgents({ sudo: 'u', showExpanded: true });

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'admin/ai_catalog/seed_external_agents',
      { sudo: 'u', showExpanded: true },
    );
  });

  it('should work without options', async () => {
    await service.seedExternalAgents();

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'admin/ai_catalog/seed_external_agents',
      { sudo: undefined, showExpanded: undefined },
    );
  });
});
