import { Pipelines } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: Pipelines;

beforeEach(() => {
  service = new Pipelines({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Projects.create', () => {
  it('should request POST /projects/user/:id when userId defined', async () => {
    await service.create(1, 'ci/cd', {
      variables: [
        {
          key: 'PULL_REQUEST_NAME',
          value: 'TEST',
        },
      ],
    });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/pipeline', {
      ref: 'ci/cd',
      variables: [
        {
          key: 'PULL_REQUEST_NAME',
          value: 'TEST',
        },
      ],
    });
  });
});
