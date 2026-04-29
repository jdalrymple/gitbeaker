import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Topics } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Topics;

beforeEach(() => {
  service = new Topics({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Topics.all', () => {
  it('should request GET /topics without properties', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'topics', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /topics with properties', async () => {
    await service.all({ search: 'test' });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'topics', {
      maxPages: undefined,
      searchParams: { search: 'test' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Topics.create', () => {
  it('should request POST /topics without properties', async () => {
    await service.create('topicname');

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'topics', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request POST /topics with form properties', async () => {
    const content = new Blob(['image'], { type: 'image/jpeg' });

    await service.create('topicname', { avatar: { content, filename: 'name.jpeg' } });

    const expectedFormData = new FormData();
    expectedFormData.append('name', 'topicname');
    expectedFormData.append('avatar', content, 'name.jpeg');
    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'topics', {
      body: expectedFormData,
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Topics.edit', () => {
  it('should request PUT /topics/:id with basic properties', async () => {
    await service.edit(3, { name: 'topicname' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'topics/3', {
      body: { name: 'topicname' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request PUT /topics with form properties', async () => {
    const content = new Blob(['image'], { type: 'image/jpeg' });

    await service.edit(3, { avatar: { content, filename: 'name.jpeg' } });

    const expectedFormData = new FormData();
    expectedFormData.append('avatar', content, 'name.jpeg');
    expect(RequestHelper.put()).toHaveBeenLastCalledWith(service, 'topics/3', {
      body: expectedFormData,
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Topics.merge', () => {
  it('should request POST /topics/merge', async () => {
    await service.merge(2, 2);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'topics/merge', {
      body: {
        sourceTopicId: 2,
        targetTopicId: 2,
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Topics.remove', () => {
  it('should request DEL /topics', async () => {
    await service.remove(2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'topics/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Topics.show', () => {
  it('should request GET /topics', async () => {
    await service.show(2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'topics/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
