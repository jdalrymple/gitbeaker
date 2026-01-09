import { JobArtifacts } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: JobArtifacts;

beforeEach(() => {
  service = new JobArtifacts({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('JobArtifacts.downloadArchive', () => {
  it('should throw an error if require parameters are not present', () => {
    expect(() => service.downloadArchive(1)).toThrow(
      'Missing one of the required parameters. See typing',
    );
  });

  it('should request GET /projects/:id/jobs/:job_id/artifacts, getting the job’s artifacts zipped archive of a project via private token', async () => {
    await service.downloadArchive(1, { jobId: 43 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, `projects/1/jobs/43/artifacts`, {});
  });

  it('should request GET /projects/:id/jobs/:job_id/artifacts, getting the job’s artifacts zipped archive of a project via jobToken parameter', async () => {
    await service.downloadArchive(1, { jobId: 43, jobToken: 'token' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, `projects/1/jobs/43/artifacts`, {
      jobToken: 'token',
    });
  });

  it('should request GET /projects/:id/jobs/artifacts/:ref/download?job=:name getting the job’s artifacts zipped archive from the latest successful pipeline via private token', async () => {
    await service.downloadArchive(1, { job: 'job1', ref: 'ref1' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      `projects/1/jobs/artifacts/ref1/download`,
      {
        job: 'job1',
      },
    );
  });

  it('should request GET /projects/:id/jobs/artifacts/:ref/download?job=:name getting the job’s artifacts zipped archive from the latest successful pipeline via jobToken parameter', async () => {
    await service.downloadArchive(1, { job: 'job1', ref: 'ref1', jobToken: 'token' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      `projects/1/jobs/artifacts/ref1/download`,
      {
        job: 'job1',
        jobToken: 'token',
      },
    );
  });

  it('should request GET /projects/:id/jobs/:job_id/artifacts/:artifact_path, getting a single artifact file from a job with a specified ID from inside the job’s artifacts zipped archive via private token', async () => {
    await service.downloadArchive(1, { jobId: 43, artifactPath: 'path' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      `projects/1/jobs/43/artifacts/path`,
      {},
    );
  });

  it('should request GET /projects/:id/jobs/:job_id/artifacts, getting a single artifact file from a job with a specified ID from inside the job’s artifacts zipped archive via jobToken parameter', async () => {
    await service.downloadArchive(1, { jobId: 43, jobToken: 'token', artifactPath: 'path' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, `projects/1/jobs/43/artifacts/path`, {
      jobToken: 'token',
    });
  });

  it('should request GET /projects/:id/jobs/artifacts/:id/:ref/raw/path?job=:job  getting a single artifact file for a specific job of the latest successful pipeline via private token', async () => {
    await service.downloadArchive(1, { job: 'job1', ref: 'ref1', artifactPath: 'path' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      `projects/1/jobs/artifacts/ref1/raw/path`,
      {
        job: 'job1',
      },
    );
  });

  it('should request GET /projects/:id/jobs/artifacts/:id/ref/:ref/raw/path?job=:name  getting a single artifact file for a specific job of the latest successful pipeline via job token', async () => {
    await service.downloadArchive(1, {
      job: 'job1',
      ref: 'ref1',
      artifactPath: 'path',
      jobToken: 'token',
    });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      `projects/1/jobs/artifacts/ref1/raw/path`,
      {
        job: 'job1',
        jobToken: 'token',
      },
    );
  });

  it('should request GET /projects/:id/jobs/artifacts/:ref/download?job=:name&search_recent_successful_pipelines=true when searchRecentSuccessfulPipelines is true', async () => {
    await service.downloadArchive(1, {
      job: 'job1',
      ref: 'ref1',
      searchRecentSuccessfulPipelines: true,
    });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      `projects/1/jobs/artifacts/ref1/download`,
      {
        job: 'job1',
        searchRecentSuccessfulPipelines: true,
      },
    );
  });
});

describe('JobArtifacts.keep', () => {
  it('should request POST /projects/:id/jobs/:id/artifacts/keep', async () => {
    await service.keep(1, 2);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/jobs/2/artifacts/keep',
      undefined,
    );
  });
});

describe('JobArtifacts.remove', () => {
  it('should request DELETE /projects/:id/artifacts', async () => {
    await service.remove(1);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/artifacts', {});
  });

  it('should request DELETE /projects/:id/jobs/:id/artifacts', async () => {
    await service.remove(1, { jobId: 2 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/jobs/2/artifacts', {});
  });
});
