import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { TerraformModules } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: TerraformModules;

beforeEach(() => {
  service = new TerraformModules({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

const OPTS = { showExpanded: undefined };

describe('TerraformModules.allVersions', () => {
  it('should request GET /packages/terraform/modules/v1/ns/mod/aws/versions', async () => {
    await service.allVersions('ns', 'mod', 'aws');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'packages/terraform/modules/v1/ns/mod/aws/versions',
      OPTS,
    );
  });
});

describe('TerraformModules.showLatest', () => {
  it('should request GET /packages/terraform/modules/v1/ns/mod/aws', async () => {
    await service.showLatest('ns', 'mod', 'aws');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'packages/terraform/modules/v1/ns/mod/aws',
      OPTS,
    );
  });
});

describe('TerraformModules.showVersion', () => {
  it('should request GET /packages/terraform/modules/v1/ns/mod/aws/1.0.0', async () => {
    await service.showVersion('ns', 'mod', 'aws', '1.0.0');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'packages/terraform/modules/v1/ns/mod/aws/1.0.0',
      OPTS,
    );
  });
});

describe('TerraformModules.showLatestDownloadUrl', () => {
  it('should request GET /packages/terraform/modules/v1/ns/mod/aws/download', async () => {
    await service.showLatestDownloadUrl('ns', 'mod', 'aws');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'packages/terraform/modules/v1/ns/mod/aws/download',
      OPTS,
    );
  });
});

describe('TerraformModules.showVersionDownloadUrl', () => {
  it('should request GET /packages/terraform/modules/v1/ns/mod/aws/1.0.0/download', async () => {
    await service.showVersionDownloadUrl('ns', 'mod', 'aws', '1.0.0');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'packages/terraform/modules/v1/ns/mod/aws/1.0.0/download',
      OPTS,
    );
  });
});

describe('TerraformModules.downloadFromNamespace', () => {
  it('should request GET /packages/terraform/modules/v1/ns/mod/aws/1.0.0/file', async () => {
    await service.downloadFromNamespace('ns', 'mod', 'aws', '1.0.0');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'packages/terraform/modules/v1/ns/mod/aws/1.0.0/file',
      OPTS,
    );
  });
});

describe('TerraformModules.downloadFromProject', () => {
  it('should request GET with a version', async () => {
    await service.downloadFromProject(1, 'mod', 'aws', '1.0.0');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/terraform/modules/mod/aws/1.0.0',
      OPTS,
    );
  });

  it('should request GET without a trailing slash when no version is given', async () => {
    await service.downloadFromProject(1, 'mod', 'aws');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/terraform/modules/mod/aws',
      OPTS,
    );
  });
});

describe('TerraformModules.uploadModule', () => {
  it('should request PUT with form data', async () => {
    const content = new Blob(['text'], { type: 'text/plain' });

    await service.uploadModule(1, 'mod', 'aws', '1.0.0', { content, filename: 'm.tgz' });

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(
      service,
      'projects/1/packages/terraform/modules/mod/aws/1.0.0/file',
      expect.objectContaining({ body: expect.any(FormData), showExpanded: undefined }),
    );

    const call = (RequestHelper.put() as any).mock.calls.slice(-1)[0];
    const formDataObj = Object.fromEntries((call[2].body as FormData).entries());
    expect(formDataObj).toEqual({
      file: expect.objectContaining({ type: content.type, size: content.size }),
    });
  });
});
