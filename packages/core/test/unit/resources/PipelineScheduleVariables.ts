import { RequestHelper } from '../../../src/infrastructure';
import { PipelineScheduleVariables } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: PipelineScheduleVariables;

beforeEach(() => {
  service = new PipelineScheduleVariables({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('PipelineScheduleVariables.all', () => {
  it('should request GET /projects/:id/pipeline_schedules/:id/variables', async () => {
    await service.all(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/pipeline_schedules/2/variables',
      undefined,
    );
  });
});

describe('PipelineScheduleVariables.create', () => {
  it('should request POST /projects/:id/pipeline_schedules/:id/variables', async () => {
    await service.create(1, 2, 'key', 'value');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/pipeline_schedules/2/variables',
      {
        key: 'key',
        value: 'value',
      },
    );
  });
});

describe('PipelineScheduleVariables.edit', () => {
  it('should request PUT /projects/:id/pipeline_schedules/:id/variables/:key', async () => {
    await service.edit(1, 2, 'key', 'value');

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'projects/1/pipeline_schedules/2/variables/key',
      {
        value: 'value',
      },
    );
  });
});

describe('PipelineScheduleVariables.remove', () => {
  it('should request DEL /projects/:id/pipeline_schedules/:id/variables/:key', async () => {
    await service.remove(1, 2, 'key');

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/pipeline_schedules/2/variables/key',
      undefined,
    );
  });
});
