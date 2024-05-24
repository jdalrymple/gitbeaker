import { RequestHelper } from '../../../src/infrastructure';
import { PipelineTriggerTokens } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: PipelineTriggerTokens;

beforeEach(() => {
  service = new PipelineTriggerTokens({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('PipelineTriggerTokens.all', () => {
  it('should request GET /projects/:id/triggers', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/triggers', undefined);
  });
});

describe('PipelineTriggerTokens.create', () => {
  it('should request POST /projects/:id/triggers', async () => {
    await service.create(1, 'description');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/triggers', {
      description: 'description',
    });
  });
});

describe('PipelineTriggerTokens.edit', () => {
  it('should request PUT /projects/:id/triggers/:id with options', async () => {
    await service.edit(1, 2, { description: 'test' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/triggers/2', {
      description: 'test',
    });
  });

  it('should request PUT /projects/:id/triggers/:id without options', async () => {
    await service.edit(1, 2);

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/triggers/2', undefined);
  });
});

describe('PipelineTriggerTokens.remove', () => {
  it('should request DEL /projects/:id/triggers/:id', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/triggers/2', undefined);
  });
});

describe('PipelineTriggerTokens.show', () => {
  it('should request GET /projects/:id/triggers/:id', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/triggers/2', undefined);
  });
});

describe('PipelineTriggerTokens.trigger', () => {
  it('should request GET /projects/:id/trigger/pipeline', async () => {
    await service.trigger(1, 'main', 'token', { variables: { PAYLOAD: 'test' } });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/trigger/pipeline', {
      isForm: true,
      searchParams: {
        token: 'token',
        ref: 'main',
      },
      'variables[PAYLOAD]': 'test',
    });
  });
});
