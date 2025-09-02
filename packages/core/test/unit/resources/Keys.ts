import { RequestHelper } from '../../../src/infrastructure';
import { Keys } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: Keys;

beforeEach(() => {
  service = new Keys({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('Keys.show', () => {
  it('should request GET /keys/1', async () => {
    await service.show({ keyId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'keys/1', {});
  });

  it('should request GET /keys?fingerprint=1', async () => {
    await service.show({ fingerprint: '1' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'keys?fingerprint=1', {});
  });

  it('should throw an error if keyId or fingerprint is not passed', () => {
    /* eslint-disable-next-line */
    expect(() => service.show({} as any)).toThrow();
  });
});
