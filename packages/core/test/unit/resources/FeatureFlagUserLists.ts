import { RequestHelper } from '../../../src/infrastructure';
import { FeatureFlagUserLists } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: FeatureFlagUserLists;

beforeEach(() => {
  service = new FeatureFlagUserLists({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('FeatureFlagUserLists.all', () => {
  it('should request GET projects/1/feature_flags_user_lists without options', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/feature_flags_user_lists',
      undefined,
    );
  });

  it('should request GET projects/1/feature_flags_user_lists with options', async () => {
    await service.all(1, { search: 'string' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/feature_flags_user_lists',
      {
        search: 'string',
      },
    );
  });
});

describe('FeatureFlagUserLists.create', () => {
  it('should request POST /projects/:id/feature_flags_user_lists', async () => {
    await service.create(1, 'name', 'xids');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/feature_flags_user_lists',
      {
        name: 'name',
        userXids: 'xids',
      },
    );
  });
});

describe('FeatureFlagUserLists.edit', () => {
  it('should request PUT /projects/:id/feature_flags_user_lists/:idd', async () => {
    await service.edit(1, 2, { name: 'test' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'projects/1/feature_flags_user_lists/2',
      {
        name: 'test',
      },
    );
  });
});

describe('FeatureFlagUserLists.remove', () => {
  it('should request DEL /projects/:id/feature_flags_user_lists/:idd', async () => {
    await service.remove(1, 2, { sudo: 1 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/feature_flags_user_lists/2',
      {
        sudo: 1,
      },
    );
  });
});

describe('FeatureFlags.show', () => {
  it('should request GET /projects/:id/feature_flags_user_lists/:idd', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/feature_flags_user_lists/2',
      undefined,
    );
  });
});
