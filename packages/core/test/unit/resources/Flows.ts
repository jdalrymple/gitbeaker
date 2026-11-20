import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Flows } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Flows;

beforeEach(() => {
  service = new Flows({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Flows.create', () => {
  it('should request POST /ai/duo_workflows/workflows', async () => {
    await service.create({});

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'ai/duo_workflows/workflows', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request POST /ai/duo_workflows/workflows with options', async () => {
    await service.create({ goal: 'g', projectId: 1, workflowDefinition: 'w', sudo: 'u' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'ai/duo_workflows/workflows', {
      body: { goal: 'g', projectId: 1, workflowDefinition: 'w' },
      showExpanded: undefined,
      sudo: 'u',
    });
  });
});

describe('Flows.allAgentPrivileges', () => {
  it('should request GET /ai/duo_workflows/workflows/agent_privileges', async () => {
    await service.allAgentPrivileges();

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'ai/duo_workflows/workflows/agent_privileges',
      { maxPages: undefined, searchParams: {}, showExpanded: undefined, sudo: undefined },
    );
  });

  it('should request GET /ai/duo_workflows/workflows/agent_privileges with options', async () => {
    await service.allAgentPrivileges({ perPage: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'ai/duo_workflows/workflows/agent_privileges',
      {
        maxPages: undefined,
        searchParams: { perPage: 2 },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});
