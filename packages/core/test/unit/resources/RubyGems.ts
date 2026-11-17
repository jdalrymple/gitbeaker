import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { RubyGems } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: RubyGems;

beforeEach(() => {
  service = new RubyGems({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('RubyGems.allDependencies', () => {
  it('should request GET projects/1/packages/rubygems/api/v1/dependencies without options', async () => {
    await service.allDependencies('1');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/rubygems/api/v1/dependencies',
      {
        searchParams: {},
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });

  it('should request GET projects/1/packages/rubygems/api/v1/dependencies with gems', async () => {
    await service.allDependencies('1', { gems: 'a,b' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/rubygems/api/v1/dependencies',
      {
        searchParams: { gems: 'a,b' },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('RubyGems.downloadGemFile', () => {
  it('should request GET projects/1/packages/rubygems/gems/a.gem', async () => {
    await service.downloadGemFile('1', 'a.gem');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/rubygems/gems/a.gem',
      {
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('RubyGems.downloadGemspecFile', () => {
  it('should request GET projects/1/packages/rubygems/quick/Marshal.4.8/a.gemspec.rz', async () => {
    await service.downloadGemspecFile('1', 'a.gemspec.rz');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/rubygems/quick/Marshal.4.8/a.gemspec.rz',
      {
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('RubyGems.uploadGemFile', () => {
  it('should request POST projects/1/packages/rubygems/api/v1/gems', async () => {
    await service.uploadGemFile(1, { content: new Blob(['x']), filename: 'a.gem' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/rubygems/api/v1/gems',
      {
        body: expect.any(FormData),
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});
