import { RequestHelper } from '../../../src/infrastructure';
import { Tags } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: Tags;

beforeEach(() => {
  service = new Tags({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('Tags.all', () => {
  it('should request GET /projects/:id/repository/tags', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/tags',
      undefined,
    );
  });
});

describe('Tags.create', () => {
  it('should request POST /projects/:id/repository/tags', async () => {
    await service.create(1, 'test', 'main', { message: 'test' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/repository/tags', {
      message: 'test',
      searchParams: {
        ref: 'main',
        tagName: 'test',
      },
    });
  });
});

describe('Tags.show', () => {
  it('should request GET /projects/:id/repository/tags/:tag_id', async () => {
    await service.show(1, 'name');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/tags/name',
      undefined,
    );
  });
});

describe('Tags.remove', () => {
  it('should request DEL /projects/:id/repository/tags/:tag_id', async () => {
    await service.remove(1, 'name');

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/tags/name',
      undefined,
    );
  });
});
