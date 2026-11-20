import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DependencyListExport } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: DependencyListExport;

beforeEach(() => {
  service = new DependencyListExport({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('DependencyListExport.create', () => {
  it('should request POST /projects/1/dependency_list_exports', async () => {
    await service.create(1, 'sbom');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/dependency_list_exports',
      {
        sudo: undefined,
        showExpanded: undefined,
        body: { exportType: 'sbom' },
      },
    );
  });
});

describe('DependencyListExport.show', () => {
  it('should request GET /dependency_list_exports/3', async () => {
    await service.show(3);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'dependency_list_exports/3', {
      sudo: undefined,
      showExpanded: undefined,
    });
  });
});

describe('DependencyListExport.download', () => {
  it('should request GET /dependency_list_exports/3/download', async () => {
    await service.download(3);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'dependency_list_exports/3/download',
      {
        sudo: undefined,
        showExpanded: undefined,
      },
    );
  });
});

describe('DependencyListExport.create with entity and options', () => {
  it('should request POST /pipelines/:id/dependency_list_exports', async () => {
    await service.create(1, 'sbom', { entity: 'pipelines', sendEmail: true });

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'pipelines/1/dependency_list_exports',
      {
        showExpanded: undefined,
        sudo: undefined,
        body: { sendEmail: true, exportType: 'sbom' },
      },
    );
  });
});
