import { RequestHelper } from '../../../src/infrastructure';
import Request from 'got';

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

const mockedGetExtended = (url, { query = '' }) => {
  const page1 = {
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
      link: `<'https://www.test.com/api/v3/projects/8?page=2&per_page=2>; rel='next',
        <'https://www.test.com/api/v3/projects/8?page=1&per_page=2>; rel='first',
        <'https://www.test.com/api/v3/projects/8?page=2&per_page=2>; rel='last'`,
      'x-next-page': 2,
      'x-page': 1,
      'x-per-page': 2,
      'x-prev-page': '',
      'x-total': 4,
      'x-total-pages': 2,
    },
  };

  const page2 = {
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
      link: `<'https://www.test.com/api/v3/projects/8?page=1&per_page=2>; rel='prev',
        <'https://www.test.com/api/v3/projects/8?page=1&per_page=2>; rel='first',
        <'https://www.test.com/api/v3/projects/8?page=2&per_page=2>; rel='last'`,
      'x-next-page': '',
      'x-page': 2,
      'x-per-page': 2,
      'x-prev-page': 1,
      'x-total': 4,
      'x-total-pages': 2,
    },
  };

  return query.includes('page=2') ? page2 : page1;
};

describe('RequestHelper.get()', () => {
  it('Should respond with an object', async () => {
    Request.get = jest.fn(() => mockedGetBasic());

    const response = await RequestHelper.get(
      { host: 'https://testing.com', token: 'token' },
      'test',
    );

    expect(response.prop1).toBe(5);
    expect(response.prop2).toBe('test property');
  });

  it('Should be paginated when links are present', async () => {
    Request.get = jest.fn((url, { query }) => mockedGetExtended(url, { query }));

    const response = await RequestHelper.get(
      { host: 'https://testing.com', token: 'token' },
      'test',
    );

    response.forEach((l, index) => {
      expect(l.prop1).toBe(1 + index);
      expect(l.prop2).toBe(`test property${1 + index}`);
    });
  });

  it('Should be paginated but limited by the maxPages option', async () => {
    Request.get = jest.fn((url, { query }) => mockedGetExtended(url, { query }));

    const response = await RequestHelper.get(
      { host: 'https://testing.com', token: 'token' },
      'test',
      { maxPages: 1 },
    );

    expect(response).toHaveLength(2);
    expect(response[0].prop1).toBe(1);

    response.forEach((l, index) => {
      expect(l.prop1).toBe(1 + index);
      expect(l.prop2).toBe(`test property${1 + index}`);
    });
  });

  it('Should be paginated but limited by the page option', async () => {
    Request.get = jest.fn((url, { query }) => mockedGetExtended(url, { query }));

    const response = await RequestHelper.get(
      { host: 'https://testing.com', token: 'token' },
      'test',
      { page: 2 },
    );

    expect(response).toHaveLength(2);
    expect(response[0].prop1).toBe(3);

    response.forEach((l, index) => {
      expect(l.prop1).toBe(3 + index);
      expect(l.prop2).toBe(`test property${3 + index}`);
    });
  });

  it('Should show the pagination information when the page option is given', async () => {
    Request.get = jest.fn((url, { query }) => mockedGetExtended(url, { query }));

    const response = await RequestHelper.get(
      { host: 'https://testing.com', token: 'token' },
      'test',
      { page: 2, showPagination: true },
    );

    expect(response.data).toBeDefined();
    expect(response.data).toHaveLength(2);
    expect(response.data[0].prop1).toBe(3);

    response.data.forEach((l, index) => {
      expect(l.prop1).toBe(3 + index);
      expect(l.prop2).toBe(`test property${3 + index}`);
    });

    expect(response.pagination).toMatchObject({
      total: 4,
      previous: 1,
      current: 2,
      next: null,
      perPage: 2,
      totalPages: 2,
    });
  });
});
