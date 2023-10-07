import { RequestHelper } from '../../../src/infrastructure';
import { InstanceLevelCICDVariables } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
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

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'admin/ci/variables', undefined);
  });
});

describe('InstanceLevelCICDVariables.create', () => {
  it('should request POST admin/ci/variables', async () => {
    await service.create('key', 'value', { raw: false });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'admin/ci/variables', {
      key: 'key',
      value: 'value',
      raw: false,
    });
  });
});

describe('InstanceLevelCICDVariables.edit', () => {
  it('should request PUT admin/ci/variables/:key', async () => {
    await service.edit('key', 'value', { raw: false });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'admin/ci/variables/key', {
      value: 'value',
      raw: false,
    });
  });
});

describe('InstanceLevelCICDVariables.remove', () => {
  it('should request DEL admin/ci/variables/:key', async () => {
    await service.remove('key');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'admin/ci/variables/key', undefined);
  });
});

describe('InstanceLevelCICDVariables.show', () => {
  it('should request GET admin/ci/variables/:name', async () => {
    await service.show('key');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'admin/ci/variables/key', undefined);
  });
});
