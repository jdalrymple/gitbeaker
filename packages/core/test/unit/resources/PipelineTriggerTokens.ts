import { RequestHelper } from '../../../src/infrastructure';
import { PipelineTriggerTokens } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
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

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/triggers', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('PipelineTriggerTokens.create', () => {
  it('should request POST /projects/:id/triggers', async () => {
    await service.create(1, 'description');

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'projects/1/triggers', {
      body: {
        description: 'description',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('PipelineTriggerTokens.edit', () => {
  it('should request PUT /projects/:id/triggers/:id with options', async () => {
    await service.edit(1, 2, { description: 'test' });

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(service, 'projects/1/triggers/2', {
      body: {
        description: 'test',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request PUT /projects/:id/triggers/:id without options', async () => {
    await service.edit(1, 2);

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(service, 'projects/1/triggers/2', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('PipelineTriggerTokens.remove', () => {
  it('should request DEL /projects/:id/triggers/:id', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenLastCalledWith(service, 'projects/1/triggers/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('PipelineTriggerTokens.show', () => {
  it('should request GET /projects/:id/triggers/:id', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/1/triggers/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('PipelineTriggerTokens.trigger', () => {
  it('should request POST /projects/:id/trigger/pipeline', async () => {
    await service.trigger(1, 'main', 'token', { variables: { PAYLOAD: 'test' } });

    const expectedFormData = new FormData();
    expectedFormData.append('variables[PAYLOAD]', 'test');

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/1/trigger/pipeline', {
      body: expectedFormData,
      searchParams: {
        token: 'token',
        ref: 'main',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
