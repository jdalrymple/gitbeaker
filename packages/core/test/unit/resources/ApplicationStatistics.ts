import { RequestHelper } from '../../../src/infrastructure';
import { ApplicationStatistics } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: ApplicationStatistics;

beforeEach(() => {
  service = new ApplicationStatistics({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('ApplicationStatistics.show', () => {
  it('should request GET /application/statistics', async () => {
    await service.show();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'application/statistics', undefined);
  });
});
