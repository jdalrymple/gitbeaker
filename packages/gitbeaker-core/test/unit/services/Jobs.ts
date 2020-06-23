import { RequesterType } from '@gitbeaker/requester-utils';
import { Jobs } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock('../../../src/infrastructure/RequestHelper');

let service: Jobs;

beforeEach(() => {
  const requester = {
    get: jest.fn(() => Promise.resolve([])),
    post: jest.fn(() => Promise.resolve({})),
    put: jest.fn(() => Promise.resolve({})),
    delete: jest.fn(() => Promise.resolve({})),
  } as RequesterType;

  service = new Jobs({
    requester,
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating Jobs service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(Jobs);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('Jobs.all', () => {
  it('should request GET /projects/:id/jobs', async () => {
    await service.all(1);

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'projects/1/jobs', undefined);
  });
});

describe('Jobs.cancel', () => {
  it('should request POST /projects/:id/jobs/:id', async () => {
    await service.cancel(1, 2);

    expect(RequestHelper.post).toHaveBeenCalledWith(service, 'projects/1/jobs/2/cancel', undefined);
  });
});

describe('Jobs.downloadSingleArtifactFile', () => {
  it('should request GET /projects/:id/jobs/:id/artifacts/:path without streaming', async () => {
    await service.downloadSingleArtifactFile(1, 2, 'test/path');

    expect(RequestHelper.get).toHaveBeenCalledWith(
      service,
      'projects/1/jobs/2/artifacts/test/path',
      {},
    );
  });

  it('should request GET /projects/:id/jobs/:id/artifacts/:path with streaming', async () => {
    await service.downloadSingleArtifactFile(1, 2, 'test/path', { stream: true });

    expect(RequestHelper.stream).toHaveBeenCalledWith(
      service,
      'projects/1/jobs/2/artifacts/test/path',
      {},
    );
  });
});

describe('Jobs.downloadSingleArtifactFileFromRef', () => {
  it('should request GET /projects/:id/jobs/artifacts/:id/raw/:path?job=:name without streaming', async () => {
    await service.downloadSingleArtifactFileFromRef(1, 'ref', 'test/path', 'name');

    expect(RequestHelper.get).toHaveBeenCalledWith(
      service,
      `projects/1/jobs/artifacts/ref/raw/test/path?job=name`,
      {},
    );
  });

  it('should request GET /projects/:id/jobs/artifacts/:id/raw/:path?job=:name with streaming', async () => {
    await service.downloadSingleArtifactFileFromRef(1, 'ref', 'test/path', 'name', {
      stream: true,
    });

    expect(RequestHelper.stream).toHaveBeenCalledWith(
      service,
      `projects/1/jobs/artifacts/ref/raw/test/path?job=name`,
      {},
    );
  });
});

describe('Jobs.downloadLatestArtifactFile', () => {
  it('should request GET /projects/:id/jobs/artifacts/:id/download?job=:name without streaming', async () => {
    await service.downloadLatestArtifactFile(1, 'ref', 'name');

    expect(RequestHelper.get).toHaveBeenCalledWith(
      service,
      `projects/1/jobs/artifacts/ref/download?job=name`,
      {},
    );
  });

  it('should request GET /projects/:id/jobs/artifacts/:id/download?job=:name with streaming', async () => {
    await service.downloadLatestArtifactFile(1, 'ref', 'name', { stream: true });

    expect(RequestHelper.stream).toHaveBeenCalledWith(
      service,
      `projects/1/jobs/artifacts/ref/download?job=name`,
      {},
    );
  });
});

describe('Jobs.downloadTraceFile', () => {
  it('should request GET /projects/:id/jobs/:id/trace', async () => {
    await service.downloadTraceFile(1, 2);

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'projects/1/jobs/2/trace', undefined);
  });
});

describe('Jobs.erase', () => {
  it('should request POST /projects/:id/jobs/:id/erase', async () => {
    await service.erase(1, 2);

    expect(RequestHelper.post).toHaveBeenCalledWith(service, 'projects/1/jobs/2/erase', undefined);
  });
});

describe('Jobs.eraseArtifacts', () => {
  it('should request DELETE /projects/:id/jobs/:id/artifacts', async () => {
    await service.eraseArtifacts(1, 2);

    expect(RequestHelper.del).toHaveBeenCalledWith(
      service,
      'projects/1/jobs/2/artifacts',
      undefined,
    );
  });
});

describe('Jobs.keepArtifacts', () => {
  it('should request POST /projects/:id/jobs/:id/artifacts/keep', async () => {
    await service.keepArtifacts(1, 2);

    expect(RequestHelper.post).toHaveBeenCalledWith(
      service,
      'projects/1/jobs/2/artifacts/keep',
      undefined,
    );
  });
});

describe('Jobs.play', () => {
  it('should request POST /projects/:id/jobs/:id/play', async () => {
    await service.play(1, 2);

    expect(RequestHelper.post).toHaveBeenCalledWith(service, 'projects/1/jobs/2/play', undefined);
  });
});

describe('Jobs.retry', () => {
  it('should request POST /projects/:id/jobs/:id/retry', async () => {
    await service.retry(1, 2);

    expect(RequestHelper.post).toHaveBeenCalledWith(service, 'projects/1/jobs/2/retry', undefined);
  });
});

describe('Jobs.show', () => {
  it('should request GET /projects/:id/jobs/:id', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'projects/1/jobs/2', undefined);
  });
});

describe('Jobs.showPipelineJobs', () => {
  it('should request GET /projects/:id/pipelines/:id/jobs', async () => {
    await service.showPipelineJobs(1, 2);

    expect(RequestHelper.get).toHaveBeenCalledWith(
      service,
      'projects/1/pipelines/2/jobs',
      undefined,
    );
  });
});
