import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { PipelineTriggers } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: PipelineTriggers;

beforeEach(() => {
  service = new PipelineTriggers({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('PipelineTriggers.all', () => {
  it('should request GET projects/1/triggers', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/triggers', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('PipelineTriggers.show', () => {
  it('should request GET projects/1/triggers/2', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/triggers/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('PipelineTriggers.create', () => {
  it('should request POST projects/1/triggers', async () => {
    await service.create(1, 'desc');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/triggers', {
      body: { description: 'desc' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('PipelineTriggers.edit', () => {
  it('should request PUT projects/1/triggers/2', async () => {
    await service.edit(1, 2, { description: 'd' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/triggers/2', {
      body: { description: 'd' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('PipelineTriggers.remove', () => {
  it('should request DEL projects/1/triggers/2', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/triggers/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('PipelineTriggers.trigger', () => {
  it('should request POST projects/1/trigger/pipeline without options', async () => {
    await service.trigger(1, 'main', 'tok');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/trigger/pipeline', {
      searchParams: { ref: 'main', token: 'tok' },
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request POST projects/1/trigger/pipeline with variables', async () => {
    await service.trigger(1, 'main', 'tok', { variables: { A: 'b' } });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/trigger/pipeline', {
      searchParams: { ref: 'main', token: 'tok' },
      body: { variables: { A: 'b' } },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
