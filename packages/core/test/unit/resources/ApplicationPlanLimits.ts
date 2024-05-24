import { RequestHelper } from '../../../src/infrastructure';
import { ApplicationPlanLimits } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: ApplicationPlanLimits;

beforeEach(() => {
  service = new ApplicationPlanLimits({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('ApplicationPlanLimits.show', () => {
  it('should request GET /application/plan_limits', async () => {
    await service.show();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'application/plan_limits', undefined);
  });
});

describe('ApplicationPlanLimits.edit', () => {
  it('should request PUT /application/plan_limits with a terms property', async () => {
    await service.edit('Plan name');

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'application/plan_limits', {
      searchParams: {
        planName: 'Plan name',
      },
    });
  });
});
