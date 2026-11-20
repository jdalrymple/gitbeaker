import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GoProxy } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: GoProxy;

beforeEach(() => {
  service = new GoProxy({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('GoProxy.all', () => {
  it('should request GET .../@v/list', async () => {
    await service.all(1, 'example.com/mod', { sudo: 'u', showExpanded: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/go/example.com%2Fmod/@v/list',
      { sudo: 'u', showExpanded: true },
    );
  });
});

describe('GoProxy.showVersionMetadata', () => {
  it('should request GET .../@v/:version.info', async () => {
    await service.showVersionMetadata(1, 'mod', 'v1.0.0', { sudo: 'u', showExpanded: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/go/mod/@v/v1.0.0.info',
      { sudo: 'u', showExpanded: true },
    );
  });
});

describe('GoProxy.downloadModuleFile', () => {
  it('should request GET .../@v/:version.mod', async () => {
    await service.downloadModuleFile(1, 'mod', 'v1.0.0', { sudo: 'u', showExpanded: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/go/mod/@v/v1.0.0.mod',
      { sudo: 'u', showExpanded: true },
    );
  });
});

describe('GoProxy.downloadModuleSource', () => {
  it('should request GET .../@v/:version.zip', async () => {
    await service.downloadModuleSource(1, 'mod', 'v1.0.0');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/go/mod/@v/v1.0.0.zip',
      { sudo: undefined, showExpanded: undefined },
    );
  });
});
