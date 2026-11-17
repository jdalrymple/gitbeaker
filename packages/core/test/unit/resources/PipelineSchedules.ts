import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { PipelineSchedules } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

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

describe('PipelineSchedules.allTriggeredPipelines', () => {
  it('should request GET /projects/:id/pipeline_schedules/:id/pipelines', async () => {
    await service.allTriggeredPipelines(1, 2);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(
      service,
      'projects/1/pipeline_schedules/2/pipelines',
      {
        maxPages: undefined,
        searchParams: {},
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });

  it('should pass options as search params', async () => {
    await service.allTriggeredPipelines(1, 2, { scope: 'running', status: 'success', maxPages: 3 });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(
      service,
      'projects/1/pipeline_schedules/2/pipelines',
      {
        maxPages: 3,
        searchParams: { scope: 'running', status: 'success' },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('PipelineSchedules.create with options', () => {
  it('should include optional body fields', async () => {
    await service.create(1, 'description', 'main', '0 1 * * *', {
      cronTimezone: 'UTC',
      active: false,
      sudo: 4,
    });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(
      service,
      'projects/1/pipeline_schedules',
      {
        body: {
          description: 'description',
          ref: 'main',
          cron: '0 1 * * *',
          cronTimezone: 'UTC',
          active: false,
        },
        showExpanded: undefined,
        sudo: 4,
      },
    );
  });
});

describe('PipelineSchedules.edit with options', () => {
  it('should send options in body', async () => {
    await service.edit(1, 2, { description: 'new', active: true });

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(
      service,
      'projects/1/pipeline_schedules/2',
      { body: { description: 'new', active: true }, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('PipelineSchedules.run', () => {
  it('should request POST /projects/:id/pipeline_schedules/:id/play', async () => {
    await service.run(1, 2);

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(
      service,
      'projects/1/pipeline_schedules/2/play',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('PipelineSchedules.takeOwnership', () => {
  it('should request POST /projects/:id/pipeline_schedules/:id/take_ownership', async () => {
    await service.takeOwnership(1, 2);

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(
      service,
      'projects/1/pipeline_schedules/2/take_ownership',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});
