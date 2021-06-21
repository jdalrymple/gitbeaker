import 'jest-extended';
import FormData from 'form-data';
import { BaseService, RequesterType } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../../../src/infrastructure/RequestHelper';

/* eslint no-empty-pattern: 0 */
/* eslint prefer-destructuring: 0 */
function mockLink(url:string, page: number, perPage: number, maxPages: number) {
  const type = {
    'prev': page - 1 > 0 ? page - 1 : undefined,
    'current': page,
    'next': page+1 <= maxPages ? page+1 : undefined,
    'first': 1,
    'last': maxPages
  }

  const links = Object.entries(type)
    .reduce((acc, [k,v]) => {
      if (v) acc.push(`<${url}?page=${v}&per_page=${perPage}>; rel="${k}"`)
      return acc;
    }, [] as string[])

  return { link: links.join(','), pagination: type }
}

function mockedGetMany(url: string, { query }, maxPages = 10) {
  const {
    page = 1,
    perPage = 2,
  }: {
    perPage: number,
    page: number,
  } = query

  // Only load pages needed for the test
  const { link, pagination } = mockLink(url, page, perPage, maxPages);

  return {
    body: new Array(perPage).fill(null).map((_, i) => ({
      prop1: (page-1)*perPage + i + 1, // Index from 1, not 0
      prop2: `test property ${(page-1)*perPage + i + 1}`,
    })),
    headers: {
      link,
      'x-next-page': pagination.next,
      'x-page': page,
      'x-per-page': perPage,
      'x-prev-page': pagination.prev,
      'x-total': maxPages * perPage,
      'x-total-pages': maxPages,
    },
  };
}

function mockedGetOne() {
  return {
    body: {
      prop1: 5,
      prop2: 'test property',
    },
    headers: {
      'X-Page': 1,
      'X-Total-Pages': 1,
    },
  };
}

let service;

beforeEach(() => {
  service = new BaseService({
    requesterFn: () => ({} as RequesterType),
    host: 'https://testing.com',
    token: 'token',
  });
});

describe('RequestHelper.get()', () => {
  it('should respond with the proper get url without pagination', async () => {
    service.requester.get = jest.fn(() => Promise.resolve(mockedGetOne()));

    await RequestHelper.get()(service, 'test');

    expect(service.requester.get).toHaveBeenCalledWith('test', {
      query: {},
      sudo: undefined,
    });
  });

  it('should respond with an object', async () => {
    service.requester.get = jest.fn(() => Promise.resolve(mockedGetOne()));

    const response = await RequestHelper.get()(service, 'test');

    expect(response.prop1).toBe(5);
    expect(response.prop2).toBe('test property');
  });

  it('should be paginated when links are present', async () => {
    service.requester.get = jest.fn((endpoint, options) =>
      Promise.resolve(mockedGetMany(`${service.url}${endpoint}`, options)),
    );

    const response = await RequestHelper.get<Record<string, unknown>[]>()(service, 'test');

    response.forEach((l, index) => {
      expect(l.prop1).toBe(1 + index);
      expect(l.prop2).toBe(`test property ${1 + index}`);
    });

    expect(response).toHaveLength(20);
  });

  it('should handle large paginated (50 pages) results when links are present', async () => {
    service.requester.get = jest.fn((endpoint, options) =>
      Promise.resolve(mockedGetMany(`${service.url}${endpoint}`, options, 50)),
    );

    const response = await RequestHelper.get<Record<string, unknown>[]>()(service, 'test', { maxPages: 50});

    response.forEach((l, index) => {
      expect(l.prop1).toBe(1 + index);
      expect(l.prop2).toBe(`test property ${1 + index}`);
    });

    expect(response).toHaveLength(100);
  });

  it('should be paginated but limited by the maxPages option', async () => {
    service.requester.get = jest.fn((endpoint, options) =>
      Promise.resolve(mockedGetMany(`${service.url}${endpoint}`, options, 3)),
    );

    const response = await RequestHelper.get<Record<string, unknown>[]>()(service, 'test', {
      maxPages: 3,
    });

    expect(response).toHaveLength(6);

    response.forEach((l, index) => {
      expect(l.prop1).toBe(1 + index);
      expect(l.prop2).toBe(`test property ${1 + index}`);
    });
  });

  it('should be paginated but limited by the page option', async () => {
    service.requester.get = jest.fn((endpoint, options) =>
      Promise.resolve(mockedGetMany(`${service.url}${endpoint}`, options)),
    );

    const response = await RequestHelper.get<Record<string, unknown>[]>()(service, 'test', {
      page: 2,
    });

    expect(response).toHaveLength(2);

    response.forEach((l, index) => {
      expect(l.prop1).toBe(3 + index);
      expect(l.prop2).toBe(`test property ${3 + index}`);
    });
  });

  it('should show the pagination information when the showExpanded option is given', async () => {
    service.requester.get = jest.fn((endpoint, options) =>
      Promise.resolve(mockedGetMany(`${service.url}${endpoint}`, options)),
    );

    const response = await RequestHelper.get<Record<string, unknown>[]>()(service, 'test', {
      page: 2,
      showExpanded: true,
    });

    expect(response.data).toHaveLength(2);

    response.data.forEach((l, index) => {
      expect(l.prop1).toBe(3 + index);
      expect(l.prop2).toBe(`test property ${3 + index}`);
    });

    expect(response.paginationInfo).toMatchObject({
      total: 20,
      previous: 1,
      current: 2,
      next: 3,
      perPage: 2,
      totalPages: 10,
    });
  });

  it('should not show the pagination information when the showExpanded option is undefined or false', async () => {
    service.requester.get = jest.fn((endpoint, options) =>
      Promise.resolve(mockedGetMany(`${service.url}${endpoint}`, options)),
    );

    const response = await RequestHelper.get<Record<string, unknown>[]>()(service, 'test', {
      page: 2,
      showExpanded: false,
    });

    expect(response).toHaveLength(2);

    response.forEach((l, index) => {
      expect(l.prop1).toBe(3 + index);
      expect(l.prop2).toBe(`test property ${3 + index}`);
    });
  });

  it('should not show the pagination information when using keyset pagination', async () => {
    service.requester.get = jest.fn((endpoint, options) =>
      Promise.resolve(mockedGetMany(`${service.url}${endpoint}`, options)),
    );

    const response = await RequestHelper.get<Record<string, unknown>[]>()(service, 'test', {
      pagination: 'keyset',
    });

    expect(response).toHaveLength(20);

    response.forEach((l, index) => {
      expect(l.prop1).toBe(1 + index);
      expect(l.prop2).toBe(`test property ${1 + index}`);
    });
  });

  it('should support maxPages when using keyset pagination', async () => {
    service.requester.get = jest.fn((endpoint, options) =>
      Promise.resolve(mockedGetMany(`${service.url}${endpoint}`, options, 2)),
    );

    const response = await RequestHelper.get<Record<string, unknown>[]>()(service, 'test', {
      pagination: 'keyset',
      maxPages: 2,
    });

    expect(response).toHaveLength(4);

    response.forEach((l, index) => {
      expect(l.prop1).toBe(1 + index);
      expect(l.prop2).toBe(`test property ${1 + index}`);
    });
  });

  it('should not show the pagination information when using keyset pagination and showExpanded is given', async () => {
    service.requester.get = jest.fn((endpoint, options) =>
      Promise.resolve(mockedGetMany(`${service.url}${endpoint}`, options)),
    );

    const response = await RequestHelper.get<Record<string, unknown>[]>()(service, 'test', {
      pagination: 'keyset',
      showExpanded: true,
    });

    expect(response).toHaveLength(20);

    response.forEach((l, index) => {
      expect(l.prop1).toBe(1 + index);
      expect(l.prop2).toBe(`test property ${1 + index}`);
    });
  });

  it('should return simple response with camelized keys when using the camelize option', async () => {
    const s = new BaseService({
      requesterFn: () => ({} as RequesterType),
      host: 'https://testing.com',
      token: 'token',
      camelize: true,
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    s.show = jest.fn(() => RequestHelper.get()(s, 'test'));
    s.requester.get = jest.fn(() =>
      Promise.resolve({
        body: [
          { id: 3, gravatar_enable: true }, // eslint-disable-line
          { id: 4, gravatar_enable: false }, // eslint-disable-line
        ],
        headers: {},
      }),
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const results = await s.show();

    expect(results).toIncludeSameMembers([
      { id: 3, gravatarEnable: true },
      { id: 4, gravatarEnable: false },
    ]);
  });

  it('should return simple response with default keys without camelize option', async () => {
    service.show = jest.fn(() => RequestHelper.get()(service, 'test'));
    service.requester.get = jest.fn(() =>
      Promise.resolve({
        body: { id: 3, gravatar_enable: true },
        headers: {},
      }),
    );

    const results = await service.show();

    expect(results).toMatchObject({ id: 3, gravatar_enable: true }); // eslint-disable-line
  });
});

describe('RequestHelper.stream()', () => {
  it('should throw an error when the stream function isnt available', () => {
    service.requester.stream = undefined;

    expect(() => RequestHelper.stream(service, 'test')).toThrow(
      'Stream method is not implementated in requester!',
    );
  });

  it('should not throw an error when the stream function is available', () => {
    service.requester.stream = jest.fn();

    RequestHelper.stream(service, 'test');

    expect(service.requester.stream).toBeCalled();
  });
});

describe('RequestHelper.post()', () => {
  it('should pass the correct arguments to the Requester', async () => {
    service.requester.post = jest.fn(() => Promise.resolve({ body: '' }));

    await RequestHelper.post()(service, 'test', { sudo: 'yes' });

    expect(service.requester.post).toBeCalledWith('test', { body: {}, sudo: 'yes' });
  });

  it('should pass arguments as form arguments if the isForm flag is passed', async () => {
    service.requester.post = jest.fn(() => Promise.resolve({ body: '' }));

    await RequestHelper.post()(service, 'test', { isForm: true, test: 3 });

    expect(service.requester.post).toBeCalledWith('test', {
      body: expect.any(FormData),
      sudo: undefined,
    });
  });
});

describe('RequestHelper.put()', () => {
  it('should pass the correct arguments to the Requester', async () => {
    service.requester.put = jest.fn(() => Promise.resolve({ body: '' }));

    await RequestHelper.put()(service, 'test', { sudo: 'yes' });

    expect(service.requester.put).toBeCalledWith('test', { body: {}, sudo: 'yes' });
  });
});

describe('RequestHelper.del()', () => {
  it('should pass the correct arguments to the Requester', async () => {
    service.requester.delete = jest.fn(() => Promise.resolve({ body: '' }));

    await RequestHelper.del()(service, 'test', { sudo: 'yes' });

    expect(service.requester.delete).toBeCalledWith('test', { query: {}, sudo: 'yes' });
  });
});
