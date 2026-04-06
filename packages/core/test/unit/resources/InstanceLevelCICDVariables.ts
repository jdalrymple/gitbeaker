import { RequestHelper } from '../../../src/infrastructure';
import { InstanceLevelCICDVariables } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: InstanceLevelCICDVariables;

beforeEach(() => {
  service = new InstanceLevelCICDVariables({
    requesterFn: jest.fn(),
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
