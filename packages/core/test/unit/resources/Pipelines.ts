import { Pipelines } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock(
  '../../../src/infrastructure/RequestHelper',
  async () => {
    const mock = await vi.importActual('../../__mocks__/RequestHelper');
    return (mock as any).default;
  },
);

let service: Pipelines;

beforeEach(() => {
  service = new Pipelines({
    requesterFn: vi.fn(),
    token: 'abcdefg',
  });
});

describe('Pipelines', () => {
  describe('all', () => {
    it('should request GET /projects/:id/pipelines', async () => {
      const projectId = 1;
      const options = { scope: 'running' as const };

      await service.all(projectId, options);

      expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/pipelines', {
        maxPages: undefined,
        searchParams: { scope: 'running' },
        showExpanded: undefined,
        sudo: undefined,
      });
    });
  });

  describe('allVariables', () => {
    it('should request GET /projects/:id/pipelines/:pipelineId/variables', async () => {
      const projectId = 1;
      const pipelineId = 2;

      await service.allVariables(projectId, pipelineId);

      expect(RequestHelper.get()).toHaveBeenLastCalledWith(
        service,
        'projects/1/pipelines/2/variables',
        { showExpanded: undefined, sudo: undefined },
      );
    });
  });

  describe('cancel', () => {
    it('should request POST /projects/:id/pipelines/:pipelineId/cancel', async () => {
      const projectId = 1;
      const pipelineId = 2;

      await service.cancel(projectId, pipelineId);

      expect(RequestHelper.post()).toHaveBeenLastCalledWith(
        service,
        'projects/1/pipelines/2/cancel',
        { showExpanded: undefined, sudo: undefined },
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

      expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'projects/1/pipeline', {
        body: {
          ref,
          ...options,
        },
        showExpanded: undefined,
        sudo: undefined,
      });
    });
  });

  describe('remove', () => {
    it('should request DELETE /projects/:id/pipelines/:pipelineId', async () => {
      const projectId = 1;
      const pipelineId = 2;

      await service.remove(projectId, pipelineId);

      expect(RequestHelper.del()).toHaveBeenLastCalledWith(service, 'projects/1/pipelines/2', {
        showExpanded: undefined,
        sudo: undefined,
      });
    });
  });

  describe('retry', () => {
    it('should request POST /projects/:id/pipelines/:pipelineId/retry', async () => {
      const projectId = 1;
      const pipelineId = 2;

      await service.retry(projectId, pipelineId);

      expect(RequestHelper.post()).toHaveBeenLastCalledWith(
        service,
        'projects/1/pipelines/2/retry',
        { showExpanded: undefined, sudo: undefined },
      );
    });
  });

  describe('show', () => {
    it('should request GET /projects/:id/pipelines/:pipelineId', async () => {
      const projectId = 1;
      const pipelineId = 2;

      await service.show(projectId, pipelineId);

      expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/1/pipelines/2', {
        searchParams: {},
        showExpanded: undefined,
        sudo: undefined,
      });
    });

    it('should request GET /projects/:id/pipelines/latest when pipelineId is "latest"', async () => {
      const projectId = 1;

      await service.show(projectId, 'latest');

      expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/1/pipelines/latest', {
        searchParams: {},
        showExpanded: undefined,
        sudo: undefined,
      });
    });
  });

  describe('showLatest', () => {
    it('should request GET /projects/:id/pipelines/latest', async () => {
      const projectId = 1;

      await service.showLatest(projectId);

      expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/1/pipelines/latest', {
        searchParams: {},
        showExpanded: undefined,
        sudo: undefined,
      });
    });

    it('should request with ref option if provided', async () => {
      const projectId = 1;
      const options = { ref: 'main' };

      await service.showLatest(projectId, options);

      expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/1/pipelines/latest', {
        maxPages: undefined,
        searchParams: { ref: 'main' },
        showExpanded: undefined,
        sudo: undefined,
      });
    });
  });

  describe('showTestReport', () => {
    it('should request GET /projects/:id/pipelines/:pipelineId/test_report', async () => {
      const projectId = 1;
      const pipelineId = 2;

      await service.showTestReport(projectId, pipelineId);

      expect(RequestHelper.get()).toHaveBeenLastCalledWith(
        service,
        'projects/1/pipelines/2/test_report',
        { showExpanded: undefined, sudo: undefined },
      );
    });

    it('should request with options if provided', async () => {
      const projectId = 1;
      const pipelineId = 2;
      const options = { sudo: 'test' };

      await service.showTestReport(projectId, pipelineId, options);

      expect(RequestHelper.get()).toHaveBeenLastCalledWith(
        service,
        'projects/1/pipelines/2/test_report',
        {
          showExpanded: undefined,
          sudo: 'test',
        },
      );
    });
  });

  describe('showTestReportSummary', () => {
    it('should request GET /projects/:id/pipelines/:pipelineId/test_report_summary', async () => {
      const projectId = 1;
      const pipelineId = 2;

      await service.showTestReportSummary(projectId, pipelineId);

      expect(RequestHelper.get()).toHaveBeenLastCalledWith(
        service,
        'projects/1/pipelines/2/test_report_summary',
        { showExpanded: undefined, sudo: undefined },
      );
    });

    it('should request with options if provided', async () => {
      const projectId = 1;
      const pipelineId = 2;
      const options = { sudo: 'test' };

      await service.showTestReportSummary(projectId, pipelineId, options);

      expect(RequestHelper.get()).toHaveBeenLastCalledWith(
        service,
        'projects/1/pipelines/2/test_report_summary',
        {
          showExpanded: undefined,
          sudo: 'test',
        },
      );
    });
  });
});
