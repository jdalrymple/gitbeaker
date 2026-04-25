import { PipelineScheduleVariables } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: PipelineScheduleVariables;

beforeEach(() => {
  service = new PipelineScheduleVariables({
    requesterFn: vi.fn(),
    token: 'abcdefg',
  });
});

describe('PipelineScheduleVariables.all', () => {
  it('should request GET /projects/:id/pipeline_schedules/:id/variables', async () => {
    await service.all(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/pipeline_schedules/2/variables',
      { maxPages: undefined, searchParams: {}, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('PipelineScheduleVariables.create', () => {
  it('should request POST /projects/:id/pipeline_schedules/:id/variables', async () => {
    await service.create(1, 2, 'key', 'value');

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(
      service,
      'projects/1/pipeline_schedules/2/variables',
      {
        body: {
          key: 'key',
          value: 'value',
        },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('PipelineScheduleVariables.edit', () => {
  it('should request PUT /projects/:id/pipeline_schedules/:id/variables/:key', async () => {
    await service.edit(1, 2, 'key', 'value');

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(
      service,
      'projects/1/pipeline_schedules/2/variables/key',
      {
        body: {
          value: 'value',
        },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('PipelineScheduleVariables.remove', () => {
  it('should request DEL /projects/:id/pipeline_schedules/:id/variables/:key', async () => {
    await service.remove(1, 2, 'key');

    expect(RequestHelper.del()).toHaveBeenLastCalledWith(
      service,
      'projects/1/pipeline_schedules/2/variables/key',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});
