import { ProjectTerraformState } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: ProjectTerraformState;

beforeEach(() => {
  service = new ProjectTerraformState({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('ProjectTerraformState.show', () => {
  it('should request GET /projects/:id/terraform/state/:name', async () => {
    await service.show(1, 'state-name');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/terraform/state/state-name',
      undefined,
    );
  });
});

describe('ProjectTerraformState.showVersion', () => {
  it('should request GET /projects/:id/terraform/state/:name/versions/:serial', async () => {
    await service.showVersion(1, 'state-name', 42);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/terraform/state/state-name/versions/42',
      undefined,
    );
  });
});

describe('ProjectTerraformState.removeVersion', () => {
  it('should request DELETE /projects/:id/terraform/state/:name/versions/:serial', async () => {
    await service.removeVersion(1, 'state-name', 42);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/terraform/state/state-name/versions/42',
      undefined,
    );
  });
});

describe('ProjectTerraformState.remove', () => {
  it('should request DELETE /projects/:id/terraform/state/:name', async () => {
    await service.remove(1, 'state-name');

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/terraform/state/state-name',
      undefined,
    );
  });
});

describe('ProjectTerraformState.removeTerraformStateLock', () => {
  it('should request DELETE /projects/:id/terraform/state/:name/lock', async () => {
    await service.removeTerraformStateLock(1, 'state-name');

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/terraform/state/state-name/lock',
      undefined,
    );
  });
});

describe('ProjectTerraformState.createVersion', () => {
  it('should request POST /projects/:id/terraform/state/:name', async () => {
    await service.createVersion(1, 'state-name');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/terraform/state/state-name',
      undefined,
    );
  });
});
