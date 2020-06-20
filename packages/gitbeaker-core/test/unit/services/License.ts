import { RequesterType } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../../../src/infrastructure';
import { License } from '../../../src';

jest.mock('../../../src/infrastructure/RequestHelper');

let service: License;

beforeEach(() => {
  const requester = {
    get: jest.fn(() => Promise.resolve([])),
    post: jest.fn(() => Promise.resolve({})),
    put: jest.fn(() => Promise.resolve({})),
    delete: jest.fn(() => Promise.resolve({})),
  } as RequesterType;

  service = new License({
    requester,
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating License service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(License);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('License.all', () => {
  it('should request GET licenses', async () => {
    await service.all();

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'licenses', undefined);
  });
});

describe('License.add', () => {
  it('should request POST license', async () => {
    await service.add('A cool licence');

    expect(RequestHelper.post).toHaveBeenCalledWith(service, 'license', {
      license: 'A cool licence',
    });
  });
});

describe('License.show', () => {
  it('should request GET license', async () => {
    await service.show();

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'license', undefined);
  });
});

describe('License.remove', () => {
  it('should request DELETE license', async () => {
    await service.remove(1);

    expect(RequestHelper.del).toHaveBeenCalledWith(service, 'license/1', undefined);
  });
});
