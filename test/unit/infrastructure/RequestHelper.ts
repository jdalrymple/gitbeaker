import { RequestHelper, KyRequester, BaseService } from '../../../src/infrastructure';

const mockedGetBasic = () => ({
  body: {
    prop1: 5,
    prop2: 'test property',
  },
  headers: {
    'X-Page': 1,
    'X-Total-Pages': 1,
  },
});

const mockedGetExtended = (url, {query}) => {
  const pages = [
    {
      body: [
        {
          prop1: 1,
          prop2: 'test property1',
        },
        {
          prop1: 2,
          prop2: 'test property2',
        },
      ],
      headers: {
        link: `<https://www.test.com/api/v4/test?page=2&per_page=2>; rel="next",
        <https://www.test.com/api/v4/test?page=1&per_page=2>; rel="first",
        <https://www.test.com/api/v4/test?page=4&per_page=2>; rel="last"`,
        'x-next-page': 2,
        'x-page': 1,
        'x-per-page': 2,
        'x-prev-page': '',
        'x-total': 8,
        'x-total-pages': 4,
      },
    },
    {
      body: [
        {
          prop1: 3,
          prop2: 'test property3',
        },
        {
          prop1: 4,
          prop2: 'test property4',
        },
      ],
      headers: {
        link: `<https://www.test.com/api/v4/test?page=1&per_page=2>; rel="prev",
        <https://www.test.com/api/v4/test?page=3&per_page=2>; rel="next",
        <https://www.test.com/api/v4/test?page=1&per_page=2>; rel="first",
        <https://www.test.com/api/v4/test?page=4&per_page=2>; rel="last"`,
        'x-next-page': 3,
        'x-page': 2,
        'x-per-page': 2,
        'x-prev-page': 1,
        'x-total': 8,
        'x-total-pages': 4,
      },
    },
    {
      body: [
        {
          prop1: 5,
          prop2: 'test property5',
        },
        {
          prop1: 6,
          prop2: 'test property6',
        },
      ],
      headers: {
        link: `<https://www.test.com/api/v4/test?page=2&per_page=2>; rel="prev",
        <https://www.test.com/api/v4/test?page=4&per_page=2>; rel="next",
        <https://www.test.com/api/v4/test?page=1&per_page=2>; rel="first",
        <https://www.test.com/api/v4/test?page=4&per_page=2>; rel="last"`,
        'x-next-page': 4,
        'x-page': 3,
        'x-per-page': 2,
        'x-prev-page': 2,
        'x-total': 8,
        'x-total-pages': 4,
      },
    },
    {
      body: [
        {
          prop1: 7,
          prop2: 'test property7',
        },
        {
          prop1: 8,
          prop2: 'test property8',
        },
      ],
      headers: {
        link: `<https://www.test.com/api/v4/test?page=3&per_page=2>; rel="prev",
        <https://www.test.com/api/v4/test?page=1&per_page=2>; rel="first",
        <https://www.test.com/api/v4/test?page=4&per_page=2>; rel="last"`,
        'x-next-page': '',
        'x-page': 4,
        'x-per-page': 2,
        'x-prev-page': 3,
        'x-total': 8,
        'x-total-pages': 4,
      },
    }
  ];

  const q = url.match(/page=([0-9]+)/);
  let page = 1;

  if (q != null) page = q[1];
  else if (query.page) page = query.page;

  return pages[page - 1];
};

const service = new BaseService({
  host: 'https://testing.com',
  token: 'token',
});

describe('RequestHelper.get()', () => {
  it('Should respond with the proper get url without pagination', async () => {
    KyRequester.get = jest.fn(() => mockedGetBasic());

    const response = await RequestHelper.get(service, 'test');

    expect(KyRequester.get).toHaveBeenCalledWith(service, 'test', {
      query: {},
      sudo: undefined
    });
  });

  it('Should respond with an object', async () => {
    KyRequester.get = jest.fn(() => mockedGetBasic());

    const response = await RequestHelper.get(service, 'test');

    expect(response.prop1).toBe(5);
    expect(response.prop2).toBe('test property');
  });

  it('Should be paginated when links are present', async () => {
    KyRequester.get = jest.fn((service, url, options) => mockedGetExtended(url, options));

    const response = await RequestHelper.get(service, 'test');

    response.forEach((l, index) => {
      expect(l.prop1).toBe(1 + index);
      expect(l.prop2).toBe(`test property${1 + index}`);
    });

    expect(response).toHaveLength(8);
  });

  it('Should be paginated but limited by the maxPages option', async () => {
    KyRequester.get = jest.fn((service, url, options) => mockedGetExtended(url, options));

    const response = await RequestHelper.get(service, 'test', { maxPages: 3 });

    expect(response).toHaveLength(6);

    response.forEach((l, index) => {
      expect(l.prop1).toBe(1 + index);
      expect(l.prop2).toBe(`test property${1 + index}`);
    });
  });

  it('Should be paginated but limited by the page option', async () => {
    KyRequester.get = jest.fn((service, url, options) => mockedGetExtended(url, options));

    const response = await RequestHelper.get(service, 'test', { page: 2 });
    
    expect(response).toHaveLength(2);

    response.forEach((l, index) => {
      expect(l.prop1).toBe(3 + index);
      expect(l.prop2).toBe(`test property${3 + index}`);
    });
  });

  it('Should show the pagination information when the page option is given', async () => {
    KyRequester.get = jest.fn((service, url, options) => mockedGetExtended(url, options));

    const response = await RequestHelper.get(service, 'test', { page: 2, showPagination: true });

    expect(response.data).toHaveLength(2);

    response.data.forEach((l, index) => {
      expect(l.prop1).toBe(3 + index);
      expect(l.prop2).toBe(`test property${3 + index}`);
    });

    expect(response.pagination).toMatchObject({
      total: 8,
      previous: 1,
      current: 2,
      next: 3,
      perPage: 2,
      totalPages: 4,
    });
  });

  it('Should show the pagination information when the maxPages option is given', async () => {
    KyRequester.get = jest.fn((service, url, options) => mockedGetExtended(url, options));

    const response = await RequestHelper.get(service, 'test', { maxPages: 3, showPagination: true });

    expect(response.data).toHaveLength(6);

    response.data.forEach((l, index) => {
      expect(l.prop1).toBe(1 + index);
      expect(l.prop2).toBe(`test property${1 + index}`);
    });

    expect(response.pagination).toMatchObject({
      total: 8,
      previous: 2,
      current: 3,
      next: 4,
      perPage: 2,
      totalPages: 4,
    });
  });
});
