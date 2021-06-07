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

describe('Instantiating PipelineScheduleVariables service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(PipelineScheduleVariables);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
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
    await service.create(1, 2, { prop: 1 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/pipeline_schedules/2/variables',
      {
        prop: 1,
      },
    );
  });
});

describe('PipelineScheduleVariables.edit', () => {
  it('should request PUT /projects/:id/pipeline_schedules/:id/variables/:key', async () => {
    await service.edit(1, 2, 'key');

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'projects/1/pipeline_schedules/2/variables/key',
      undefined,
    );
  });
});

describe('PipelineScheduleVariables.show', () => {
  it('should request GET /projects/:id/pipeline_schedules/:id/variables', async () => {
    await service.show(1, 2, 'key');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/pipeline_schedules/2/variables/key',
      undefined,
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
