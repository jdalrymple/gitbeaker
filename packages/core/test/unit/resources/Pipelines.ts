import { Pipelines } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: Pipelines;

beforeEach(() => {
  service = new Pipelines({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('Pipelines', () => {
  describe('all', () => {
    it('should request GET /projects/:id/pipelines', async () => {
      const projectId = 1;
      const options = { scope: 'running' as const };

      await service.all(projectId, options);

      expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/pipelines', options);
    });
  });

  describe('allVariables', () => {
    it('should request GET /projects/:id/pipelines/:pipelineId/variables', async () => {
      const projectId = 1;
      const pipelineId = 2;

      await service.allVariables(projectId, pipelineId);

      expect(RequestHelper.get()).toHaveBeenCalledWith(
        service,
        'projects/1/pipelines/2/variables',
        undefined,
      );
    });
  });

  describe('cancel', () => {
    it('should request POST /projects/:id/pipelines/:pipelineId/cancel', async () => {
      const projectId = 1;
      const pipelineId = 2;

      await service.cancel(projectId, pipelineId);

      expect(RequestHelper.post()).toHaveBeenCalledWith(
        service,
        'projects/1/pipelines/2/cancel',
        undefined,
      );
    });
  });

  describe('create', () => {
    it('should request POST /projects/:id/pipeline', async () => {
      const projectId = 1;
      const ref = 'ci/cd';
      const options = {
        variables: [
          {
            key: 'PULL_REQUEST_NAME',
            value: 'TEST',
          },
        ],
        inputs: {
          INPUT_1: 'value1',
          INPUT_2: 'value2',
        },
      };

      await service.create(projectId, ref, options);

      expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/pipeline', {
        ref,
        ...options,
      });
    });
  });

  describe('remove', () => {
    it('should request DELETE /projects/:id/pipelines/:pipelineId', async () => {
      const projectId = 1;
      const pipelineId = 2;

      await service.remove(projectId, pipelineId);

      expect(RequestHelper.del()).toHaveBeenCalledWith(
        service,
        'projects/1/pipelines/2',
        undefined,
      );
    });
  });

  describe('retry', () => {
    it('should request POST /projects/:id/pipelines/:pipelineId/retry', async () => {
      const projectId = 1;
      const pipelineId = 2;

      await service.retry(projectId, pipelineId);

      expect(RequestHelper.post()).toHaveBeenCalledWith(
        service,
        'projects/1/pipelines/2/retry',
        undefined,
      );
    });
  });

  describe('show', () => {
    it('should request GET /projects/:id/pipelines/:pipelineId', async () => {
      const projectId = 1;
      const pipelineId = 2;

      await service.show(projectId, pipelineId);

      expect(RequestHelper.get()).toHaveBeenCalledWith(
        service,
        'projects/1/pipelines/2',
        undefined,
      );
    });

    it('should request GET /projects/:id/pipelines/latest when pipelineId is "latest"', async () => {
      const projectId = 1;

      await service.show(projectId, 'latest');

      expect(RequestHelper.get()).toHaveBeenCalledWith(
        service,
        'projects/1/pipelines/latest',
        undefined,
      );
    });
  });

  describe('showLatest', () => {
    it('should request GET /projects/:id/pipelines/latest', async () => {
      const projectId = 1;

      await service.showLatest(projectId);

      expect(RequestHelper.get()).toHaveBeenCalledWith(
        service,
        'projects/1/pipelines/latest',
        undefined,
      );
    });

    it('should request with ref option if provided', async () => {
      const projectId = 1;
      const options = { ref: 'main' };

      await service.showLatest(projectId, options);

      expect(RequestHelper.get()).toHaveBeenCalledWith(
        service,
        'projects/1/pipelines/latest',
        options,
      );
    });
  });

  describe('showTestReport', () => {
    it('should request GET /projects/:id/pipelines/:pipelineId/test_report', async () => {
      const projectId = 1;
      const pipelineId = 2;

      await service.showTestReport(projectId, pipelineId);

      expect(RequestHelper.get()).toHaveBeenCalledWith(
        service,
        'projects/1/pipelines/2/test_report',
        undefined,
      );
    });

    it('should request with options if provided', async () => {
      const projectId = 1;
      const pipelineId = 2;
      const options = { sudo: 'test' };

      await service.showTestReport(projectId, pipelineId, options);

      expect(RequestHelper.get()).toHaveBeenCalledWith(
        service,
        'projects/1/pipelines/2/test_report',
        options,
      );
    });
  });

  describe('showTestReportSummary', () => {
    it('should request GET /projects/:id/pipelines/:pipelineId/test_report_summary', async () => {
      const projectId = 1;
      const pipelineId = 2;

      await service.showTestReportSummary(projectId, pipelineId);

      expect(RequestHelper.get()).toHaveBeenCalledWith(
        service,
        'projects/1/pipelines/2/test_report_summary',
        undefined,
      );
    });

    it('should request with options if provided', async () => {
      const projectId = 1;
      const pipelineId = 2;
      const options = { sudo: 'test' };

      await service.showTestReportSummary(projectId, pipelineId, options);

      expect(RequestHelper.get()).toHaveBeenCalledWith(
        service,
        'projects/1/pipelines/2/test_report_summary',
        options,
      );
    });
  });
});
