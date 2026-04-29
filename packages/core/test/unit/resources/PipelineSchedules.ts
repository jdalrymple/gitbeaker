import { PipelineSchedules } from '../../../src';
import { RequesterFn } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: PipelineSchedules;

beforeEach(() => {
  service = new PipelineSchedules({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('PipelineSchedules.all', () => {
  it('should request GET /projects/:id/pipeline_schedules/:id', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/pipeline_schedules', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('PipelineSchedules.create', () => {
  it('should request POST /projects/:id/pipeline_schedules/:id', async () => {
    await service.create(1, 'description', '5a', 'today');

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(
      service,
      'projects/1/pipeline_schedules',
      {
        body: {
          description: 'description',
          ref: '5a',
          cron: 'today',
        },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('PipelineSchedules.edit', () => {
  it('should request PUT /projects/:id/pipeline_schedules/:id', async () => {
    await service.edit(1, 2);

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(
      service,
      'projects/1/pipeline_schedules/2',
      { body: {}, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('PipelineSchedules.show', () => {
  it('should request GET /projects/:id/pipeline_schedules/:id', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/pipeline_schedules/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('PipelineSchedules.remove', () => {
  it('should request DEL /projects/:id/pipeline_schedules/:id', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/pipeline_schedules/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
