import { type JobScope, Jobs } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: Jobs;

beforeEach(() => {
  service = new Jobs({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('Jobs.all', () => {
  it('should request GET /projects/:id/jobs', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/jobs', {});
  });

  it('should request GET /projects/:id/pipelines/:id/jobs', async () => {
    await service.all(1, { pipelineId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/pipelines/2/jobs', {});
  });

  it('should request GET /projects/:id/jobs with single scope', async () => {
    const options: { scope: JobScope } = { scope: 'pending' };

    await service.all(1, options);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/jobs', options);
  });

  it('should request GET /projects/:id/jobs with array of scopes', async () => {
    const options: { scope: JobScope[] } = { scope: ['pending', 'running'] };

    await service.all(1, options);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/jobs', options);
  });

  it('should request GET /projects/:id/pipelines/:id/jobs with single scope', async () => {
    const options: { pipelineId: number; scope: JobScope } = { pipelineId: 2, scope: 'failed' };

    await service.all(1, options);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/pipelines/2/jobs', {
      scope: 'failed',
    });
  });

  it('should request GET /projects/:id/pipelines/:id/jobs with array of scopes', async () => {
    const options: { pipelineId: number; scope: JobScope[] } = {
      pipelineId: 2,
      scope: ['pending', 'running'],
    };

    await service.all(1, options);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/pipelines/2/jobs', {
      scope: ['pending', 'running'],
    });
  });
});

describe('Jobs.allPipelineBridges', () => {
  it('should request GET /projects/:id/pipelines/:id/bridges', async () => {
    await service.allPipelineBridges(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/pipelines/2/bridges',
      undefined,
    );
  });

  it('should request GET /projects/:id/pipelines/:id/bridges with single scope', async () => {
    const options: { scope: JobScope } = { scope: 'pending' };

    await service.allPipelineBridges(1, 2, options);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/pipelines/2/bridges',
      options,
    );
  });

  it('should request GET /projects/:id/pipelines/:id/bridges with array of scopes', async () => {
    const options: { scope: JobScope[] } = { scope: ['pending', 'running'] };

    await service.allPipelineBridges(1, 2, options);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/pipelines/2/bridges',
      options,
    );
  });
});

describe('Jobs.cancel', () => {
  it('should request POST /projects/:id/jobs/:id/cancel', async () => {
    await service.cancel(1, 2);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/jobs/2/cancel',
      undefined,
    );
  });
});

describe('Jobs.showLog', () => {
  it('should request GET /projects/:id/jobs/:id/trace', async () => {
    await service.showLog(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/jobs/2/trace', undefined);
  });
});

describe('Jobs.erase', () => {
  it('should request POST /projects/:id/jobs/:id/erase', async () => {
    await service.erase(1, 2);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/jobs/2/erase',
      undefined,
    );
  });
});

describe('Jobs.play', () => {
  it('should request POST /projects/:id/jobs/:id/play', async () => {
    await service.play(1, 2);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/jobs/2/play', undefined);
  });
});

describe('Jobs.retry', () => {
  it('should request POST /projects/:id/jobs/:id/retry', async () => {
    await service.retry(1, 2);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/jobs/2/retry',
      undefined,
    );
  });
});

describe('Jobs.show', () => {
  it('should request GET /projects/:id/jobs/:id', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/jobs/2', undefined);
  });
});

describe('Jobs.showConnectedJob', () => {
  it('should request GET /job', async () => {
    service.headers['job-token'] = 'token';

    await service.showConnectedJob();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'job', undefined);
  });

  it('should error if job-token isnt present', () => {
    expect(() => service.showConnectedJob()).toThrow('Missing required header "job-token"');
  });
});

describe('Jobs.showConnectedJobK8Agents', () => {
  it('should request GET /job/allowed_agents', async () => {
    service.headers['job-token'] = 'token';

    await service.showConnectedJobK8Agents();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'job/allowed_agents', undefined);
  });

  it('should error if job-token isnt present', () => {
    expect(() => service.showConnectedJobK8Agents()).toThrow('Missing required header "job-token"');
  });
});
