import { InstanceLevelCICDVariables } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock(
  '../../../src/infrastructure/RequestHelper',
  async () => {
    const mock = await vi.importActual('../../__mocks__/RequestHelper');
    return (mock as any).default;
  },
);

let service: InstanceLevelCICDVariables;

beforeEach(() => {
  service = new InstanceLevelCICDVariables({
    requesterFn: vi.fn(),
    token: 'abcdefg',
  });
});

describe('InstanceLevelCICDVariables.all', () => {
  it('should request GET admin/ci/variables', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'admin/ci/variables', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('InstanceLevelCICDVariables.create', () => {
  it('should request POST admin/ci/variables', async () => {
    await service.create('key', 'value', { raw: false });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'admin/ci/variables', {
      body: {
        key: 'key',
        value: 'value',
        raw: false,
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('InstanceLevelCICDVariables.edit', () => {
  it('should request PUT admin/ci/variables/:key', async () => {
    await service.edit('key', 'value', { raw: false });

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(service, 'admin/ci/variables/key', {
      body: {
        value: 'value',
        raw: false,
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('InstanceLevelCICDVariables.remove', () => {
  it('should request DEL admin/ci/variables/:key', async () => {
    await service.remove('key');

    expect(RequestHelper.del()).toHaveBeenLastCalledWith(service, 'admin/ci/variables/key', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('InstanceLevelCICDVariables.show', () => {
  it('should request GET admin/ci/variables/:name', async () => {
    await service.show('key');

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'admin/ci/variables/key', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
