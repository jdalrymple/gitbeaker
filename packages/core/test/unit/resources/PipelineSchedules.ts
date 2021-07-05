import { RequestHelper } from '../../../src/infrastructure';
import { PipelineSchedules } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: PipelineSchedules;

beforeEach(() => {
  service = new PipelineSchedules({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating PipelineSchedules service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(PipelineSchedules);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('PipelineSchedules.all', () => {
  it('should request GET /projects/:id/pipeline_schedules/:id', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/pipeline_schedules',
      undefined,
    );
  });
});

describe('PipelineSchedules.create', () => {
  it('should request POST /projects/:id/pipeline_schedules/:id', async () => {
    await service.create(1, 'description', '5a', 'today');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/pipeline_schedules', {
      description: 'description',
      ref: '5a',
      cron: 'today',
    });
  });
});

describe('PipelineSchedules.edit', () => {
  it('should request PUT /projects/:id/pipeline_schedules/:id', async () => {
    await service.edit(1, 2);

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'projects/1/pipeline_schedules/2',
      undefined,
    );
  });
});

describe('PipelineSchedules.show', () => {
  it('should request GET /projects/:id/pipeline_schedules/:id', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/pipeline_schedules/2',
      undefined,
    );
  });
});

describe('PipelineSchedules.remove', () => {
  it('should request DEL /projects/:id/pipeline_schedules/:id', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/pipeline_schedules/2',
      undefined,
    );
  });
});
