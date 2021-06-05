import 'jest-extended';
import FormData from 'form-data';
import { BaseService, RequesterType } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../../../src/infrastructure/RequestHelper';

/* eslint no-empty-pattern: 0 */
/* eslint prefer-destructuring: 0 */
function mockedGetBasic() {
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

function mockedGetExtended(url: string, { query }) {
  const q = /page=([0-9]+)/.exec(url);
  const perPage: number = query.perPage || 2;
  const maxPages: number = query.maxPages || 10;

  let page = 1;

  if (q != null) page = Number(q[1]);
  else if (query.page) page = query.page;

  // Only load pages needed for the test
  const nextPage = page < maxPages ? page + 1 : undefined;
  const next =
    page < maxPages
      ? `<https://www.test.com/api/v4/test?page=${nextPage || ''}&per_page=${perPage}>; rel="next",`
      : '';
  const prevPage = page > 1 ? page - 1 : undefined;
  const prev =
    page > 1
      ? `<https://www.test.com/api/v4/test?page=${prevPage || ''}&per_page=${perPage}>; rel="prev",`
      : '';

  return {
    body: new Array(perPage).fill(null).map((_, i) => ({
      prop1: i + 1 + (prevPage || 0) * perPage,
      prop2: `test property ${i + 1 + (prevPage || 0) * perPage}`,
    })),
    headers: {
      link: `${next}${prev}<https://www.test.com/api/v4/test?page=1&per_page=${perPage}>; rel="first",<https://www.test.com/api/v4/test?page=${maxPages}&per_page=${perPage}>; rel="last"`,
      'x-next-page': nextPage,
      'x-page': page,
      'x-per-page': perPage,
      'x-prev-page': prevPage,
      'x-total': maxPages * perPage,
      'x-total-pages': maxPages,
    },
  };
}

let service: BaseService;

beforeEach(() => {
  service = new BaseService({
    requesterFn: () => ({} as RequesterType),
    host: 'https://testing.com',
    token: 'token',
  });
});

describe('RequestHelper.get()', () => {
  it('should respond with the proper get url without pagination', async () => {
    service.requester.get = jest.fn(() => mockedGetBasic());

    await RequestHelper.get()(service, 'test');

    expect(service.requester.get).toHaveBeenCalledWith('test', {
      query: {},
      sudo: undefined,
    });
  });

  it('should respond with an object', async () => {
    service.requester.get = jest.fn(() => mockedGetBasic());

    const response = await RequestHelper.get()(service, 'test');

    expect(response.prop1).toBe(5);
    expect(response.prop2).toBe('test property');
  });

  it('should be paginated when links are present', async () => {
    service.requester.get = jest.fn((url, options) => mockedGetExtended(url, options));

    const response = await RequestHelper.get<Record<string, unknown>[]>()(service, 'test');

    response.forEach((l, index) => {
      expect(l.prop1).toBe(1 + index);
      expect(l.prop2).toBe(`test property ${1 + index}`);
    });

    expect(response).toHaveLength(20);
  });

  it('should handle large paginated (50 pages) results when links are present', async () => {
    service.requester.get = jest.fn((url, options) =>
      mockedGetExtended(url, { query: { ...options.query, maxPages: 70 } }),
    );

    const response = await RequestHelper.get<Record<string, unknown>[]>()(service, 'test');

    response.forEach((l, index) => {
      expect(l.prop1).toBe(1 + index);
      expect(l.prop2).toBe(`test property ${1 + index}`);
    });

    expect(response).toHaveLength(140);
  });

  it('should be paginated but limited by the maxPages option', async () => {
    service.requester.get = jest.fn((url, options) =>
      mockedGetExtended(url, { query: { ...options.query, maxPages: 3 } }),
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
    service.requester.get = jest.fn((url, options) => mockedGetExtended(url, options));

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
    service.requester.get = jest.fn((url, options) => mockedGetExtended(url, options));

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
    service.requester.get = jest.fn((url, options) => mockedGetExtended(url, options));

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
    service.requester.get = jest.fn((url, options) => mockedGetExtended(url, options));

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
    service.requester.get = jest.fn((url, options) =>
      mockedGetExtended(url, { query: { ...options.query, maxPages: 2 } }),
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
    service.requester.get = jest.fn((url, options) => mockedGetExtended(url, options));

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
    service.camelize = true;
    service.show = jest.fn(() => RequestHelper.get()(service, 'test'));
    service.requester.get = jest.fn(() => ({
      body: [
        { id: 3, gravatar_enable: true }, // eslint-disable-line
        { id: 4, gravatar_enable: false }, // eslint-disable-line
      ],
      headers: {},
    }));

    const results = await service.show();

    expect(results).toIncludeSameMembers([
      { id: 3, gravatarEnable: true },
      { id: 4, gravatarEnable: false },
    ]);
  });

  it('should return simple response with default keys without camelize option', async () => {
    service.show = jest.fn(() => RequestHelper.get()(service, 'test'));
    service.requester.get = jest.fn(() => ({
      body: { id: 3, gravatar_enable: true },
      headers: {},
    }));

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
    service.requester.post = jest.fn(() => ({ body: '' }));

    await RequestHelper.post()(service, 'test', { sudo: 'yes' });

    expect(service.requester.post).toBeCalledWith('test', { body: {}, sudo: 'yes' });
  });

  it('should pass arguments as form arguments if the isForm flag is passed', async () => {
    service.requester.post = jest.fn(() => ({ body: '' }));

    await RequestHelper.post()(service, 'test', { isForm: true, test: 3 });

    expect(service.requester.post).toBeCalledWith('test', {
      body: expect.any(FormData),
      sudo: undefined,
    });
  });
});

describe('RequestHelper.put()', () => {
  it('should pass the correct arguments to the Requester', async () => {
    service.requester.put = jest.fn(() => ({ body: '' }));

    await RequestHelper.put()(service, 'test', { sudo: 'yes' });

    expect(service.requester.put).toBeCalledWith('test', { body: {}, sudo: 'yes' });
  });
});

describe('RequestHelper.del()', () => {
  it('should pass the correct arguments to the Requester', async () => {
    service.requester.delete = jest.fn(() => ({ body: '' }));

    await RequestHelper.del()(service, 'test', { sudo: 'yes' });

    expect(service.requester.delete).toBeCalledWith('test', { query: {}, sudo: 'yes' });
  });
});
