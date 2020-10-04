import * as FormData from 'form-data';
import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, PaginationResponse } from '../../../src/infrastructure/RequestHelper';

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
  const q = url.match(/page=([0-9]+)/);
  const perPage = query.perPage || 2;
  const maxPages = query.maxPages || 10;

  let page = 1;

  if (q != null) page = Number(q[1]);
  else if (query.page) page = query.page;

  // Only load pages needed for the test
  const nextPage = page < maxPages ? page + 1 : undefined;
  const next =
    page < maxPages
      ? `<https://www.test.com/api/v4/test?page=${nextPage}&per_page=${perPage}>; rel="next",`
      : '';
  const prevPage = page > 1 ? page - 1 : undefined;
  const prev =
    page > 1
      ? `<https://www.test.com/api/v4/test?page=${page - 1}&per_page=${perPage}>; rel="prev",`
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

let requester;
let service;

beforeEach(() => {
  requester = {};
  service = new BaseService({
    requester,
    host: 'https://testing.com',
    token: 'token',
  });
});

describe('RequestHelper.get()', () => {
  it('should respond with the proper get url without pagination', async () => {
    requester.get = jest.fn(() => mockedGetBasic());

    await RequestHelper.get(service, 'test');

    expect(requester.get).toHaveBeenCalledWith(service, 'test', {
      query: {},
      sudo: undefined,
    });
  });

  it('should respond with an object', async () => {
    requester.get = jest.fn(() => mockedGetBasic());

    const response = (await RequestHelper.get(service, 'test')) as Record<string, unknown>;

    expect(response.prop1).toBe(5);
    expect(response.prop2).toBe('test property');
  });

  it('should be paginated when links are present', async () => {
    requester.get = jest.fn(({}, url, options) => mockedGetExtended(url, options));

    const response = (await RequestHelper.get(service, 'test')) as Record<string, unknown>[];

    response.forEach((l, index) => {
      expect(l.prop1).toBe(1 + index);
      expect(l.prop2).toBe(`test property ${1 + index}`);
    });

    expect(response).toHaveLength(20);
  });

  it('should handle large paginated (50 pages) results when links are present', async () => {
    requester.get = jest.fn(({}, url, options) =>
      mockedGetExtended(url, { query: { ...options.query, maxPages: 70 } }),
    );

    const response = (await RequestHelper.get(service, 'test')) as Record<string, unknown>[];

    response.forEach((l, index) => {
      expect(l.prop1).toBe(1 + index);
      expect(l.prop2).toBe(`test property ${1 + index}`);
    });

    expect(response).toHaveLength(140);
  });

  it('should be paginated but limited by the maxPages option', async () => {
    requester.get = jest.fn(({}, url, options) =>
      mockedGetExtended(url, { query: { ...options.query, maxPages: 3 } }),
    );

    const response = (await RequestHelper.get(service, 'test', { maxPages: 3 })) as Record<
      string,
      unknown
    >[];

    expect(response).toHaveLength(6);

    response.forEach((l, index) => {
      expect(l.prop1).toBe(1 + index);
      expect(l.prop2).toBe(`test property ${1 + index}`);
    });
  });

  it('should be paginated but limited by the page option', async () => {
    requester.get = jest.fn(({}, url, options) => mockedGetExtended(url, options));

    const response = (await RequestHelper.get(service, 'test', { page: 2 })) as Record<
      string,
      unknown
    >[];

    expect(response).toHaveLength(2);

    response.forEach((l, index) => {
      expect(l.prop1).toBe(3 + index);
      expect(l.prop2).toBe(`test property ${3 + index}`);
    });
  });

  it('should show the pagination information when the showExtended option is given', async () => {
    requester.get = jest.fn(({}, url, options) => mockedGetExtended(url, options));

    const response = (await RequestHelper.get(service, 'test', {
      page: 2,
      showExpanded: true,
    })) as PaginationResponse;

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

  it('should not show the pagination information when the showExtended option is undefined or false', async () => {
    requester.get = jest.fn(({}, url, options) => mockedGetExtended(url, options));

    const response = (await RequestHelper.get(service, 'test', {
      page: 2,
      showExpanded: false,
    })) as Record<string, unknown>[];

    expect(response).toHaveLength(2);

    response.forEach((l, index) => {
      expect(l.prop1).toBe(3 + index);
      expect(l.prop2).toBe(`test property ${3 + index}`);
    });
  });

  it('should not show the pagination information when using keyset pagination', async () => {
    requester.get = jest.fn(({}, url, options) => mockedGetExtended(url, options));

    const response = (await RequestHelper.get(service, 'test', {
      pagination: 'keyset',
    })) as Record<string, unknown>[];

    expect(response).toHaveLength(20);

    response.forEach((l, index) => {
      expect(l.prop1).toBe(1 + index);
      expect(l.prop2).toBe(`test property ${1 + index}`);
    });
  });

  it('should support maxPages when using keyset pagination', async () => {
    requester.get = jest.fn(({}, url, options) =>
      mockedGetExtended(url, { query: { ...options.query, maxPages: 2 } }),
    );

    const response = (await RequestHelper.get(service, 'test', {
      pagination: 'keyset',
      maxPages: 2,
    })) as Record<string, unknown>[];

    expect(response).toHaveLength(4);

    response.forEach((l, index) => {
      expect(l.prop1).toBe(1 + index);
      expect(l.prop2).toBe(`test property ${1 + index}`);
    });
  });

  it('should not show the pagination information when using keyset pagination and showExpanded is given', async () => {
    requester.get = jest.fn(({}, url, options) => mockedGetExtended(url, options));

    const response = (await RequestHelper.get(service, 'test', {
      pagination: 'keyset',
      showExpanded: true,
    })) as Record<string, unknown>[];

    expect(response).toHaveLength(20);

    response.forEach((l, index) => {
      expect(l.prop1).toBe(1 + index);
      expect(l.prop2).toBe(`test property ${1 + index}`);
    });
  });

  it('should return simple response with camelized keys when using the camelize option', async () => {
    service.camelize = true;
    service.show = jest.fn(() => RequestHelper.get(service, 'test'));
    requester.get = jest.fn(() => ({
      body: [
        { id: 3, gravatar_enable: true },
        { id: 4, gravatar_enable: false },
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
    service.show = jest.fn(() => RequestHelper.get(service, 'test'));
    requester.get = jest.fn(() => ({ body: { id: 3, gravatar_enable: true }, headers: {} }));

    const results = await service.show();

    expect(results).toMatchObject({ id: 3, gravatar_enable: true });
  });
});

describe('RequestHelper.stream()', () => {
  it('should throw an error when the stream function isnt available', async () => {
    requester.stream = undefined;

    expect(() => RequestHelper.stream(service, 'test')).toThrow(
      'Stream method is not implementated in requester!',
    );
  });

  it('should not throw an error when the stream function is available', async () => {
    requester.stream = jest.fn();

    RequestHelper.stream(service, 'test');

    expect(requester.stream).toBeCalled();
  });
});

describe('RequestHelper.post()', () => {
  it('should pass the correct arguments to the Requester', async () => {
    requester.post = jest.fn(() => ({ body: '' }));

    await RequestHelper.post(service, 'test', { sudo: 'yes' });

    expect(requester.post).toBeCalledWith(service, 'test', { body: {}, sudo: 'yes' });
  });

  it('should pass arguments as form arguments if the isForm flag is passed', async () => {
    requester.post = jest.fn(() => ({ body: '' }));

    RequestHelper.post(service, 'test', { isForm: true, test: 3 });

    expect(requester.post).toBeCalledWith(service, 'test', {
      body: expect.any(FormData),
      sudo: undefined,
    });
  });
});

describe('RequestHelper.put()', () => {
  it('should pass the correct arguments to the Requester', async () => {
    requester.put = jest.fn(() => ({ body: '' }));

    await RequestHelper.put(service, 'test', { sudo: 'yes' });

    expect(requester.put).toBeCalledWith(service, 'test', { body: {}, sudo: 'yes' });
  });
});

describe('RequestHelper.del()', () => {
  it('should pass the correct arguments to the Requester', async () => {
    requester.delete = jest.fn(() => ({ body: '' }));

    await RequestHelper.del(service, 'test', { sudo: 'yes' });

    expect(requester.delete).toBeCalledWith(service, 'test', { query: {}, sudo: 'yes' });
  });
});
