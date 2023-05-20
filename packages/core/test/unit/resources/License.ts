import { RequestHelper } from '../../../src/infrastructure';
import { License } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: License;

beforeEach(() => {
  service = new License({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('License.all', () => {
  it('should request GET licenses', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'licenses', undefined);
  });
});

describe('License.add', () => {
  it('should request POST license', async () => {
    await service.add('A cool licence');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'license', {
      searchParams: {
        license: 'A cool licence',
      },
    });
  });
});

describe('License.show', () => {
  it('should request GET license', async () => {
    await service.show();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'license', undefined);
  });
});

describe('License.remove', () => {
  it('should request DELETE license', async () => {
    await service.remove(1);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'license/1', undefined);
  });
});
