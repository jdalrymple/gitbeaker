import Humps from 'humps';
import LinkParser from 'parse-link-header';
import URLJoin from 'url-join';
import Request from 'got';

interface DefaultRequestOptions {
  body?: object;
  query?: object;
  sudo?: string | number;
}

interface PaginatedRequestOptions extends DefaultRequestOptions {
  showPagination?: boolean;
  maxPages?: number;
  page?: number;
}

function defaultRequest(service, endpoint, { body, query, sudo }: DefaultRequestOptions = {}) {
  return [
    URLJoin(service.url, endpoint),
    {
      headers: { ...service.headers, sudo },
      query: query && Humps.decamelizeKeys(query),
      body: body && Humps.decamelizeKeys(body),
      rejectUnauthorized: service.rejectUnauthorized,
      json: true,
    },
  ];
}

async function getPaginated(service, endpoint, options: PaginatedRequestOptions = {}) {
  const { showPagination, maxPages, sudo, ...query } = options;
  const requestOptions = defaultRequest(service, endpoint, {
    query,
    sudo,
  });

  const response = await Request.get(...requestOptions);
  const links = LinkParser(response.headers.link) || {};
  const page = response.headers['x-page'];
  const underMaxPageLimit = maxPages ? page < maxPages : true;
  let more = [];
  let data;

  // If not looking for a singular page and still under the max pages limit
  // AND their is a next page, paginate
  if (!query.page && underMaxPageLimit && links.next) {
    more = await getPaginated(service, links.next.url.replace(service.url, ''), options);
    data = [...response.body, ...more];
  } else {
    data = response.body;
  }

  if (query.page && showPagination) {
    return {
      data,
      pagination: {
        total: response.headers['x-total'],
        next: response.headers['x-next-page'] || null,
        current: response.headers['x-page'] || null,
        previous: response.headers['x-prev-page'] || null,
        perPage: response.headers['x-per-page'],
        totalPages: response.headers['x-total-pages'],
      },
    };
  }

  return data;
}

class RequestHelper {
  static async get(
    service,
    endpoint,
    options: DefaultRequestOptions = {},
    { stream = false } = {},
  ) {
    const { sudo, ...query } = options;

    if (stream) {
      return Request.stream(
        ...defaultRequest(service, endpoint, {
          query,
          sudo,
        }),
      );
    }

    const response = await getPaginated(service, endpoint, options);

    return response.body;
  }

  static async post(service, endpoint, options: DefaultRequestOptions = {}) {
    const { sudo, ...body } = options;

    const response = await Request.post(
      ...defaultRequest(service, endpoint, {
        body,
        sudo,
      }),
    );

    return response.body;
  }

  static async put(service, endpoint, options: DefaultRequestOptions = {}) {
    const { sudo, ...body } = options;

    const response = await Request.put(
      ...defaultRequest(service, endpoint, {
        body,
        sudo,
      }),
    );

    return response.body;
  }

  static async delete(service, endpoint, options: DefaultRequestOptions = {}) {
    const { sudo, ...query } = options;

    const response = await Request.delete(
      ...defaultRequest(service, endpoint, {
        query,
        sudo,
      }),
    );

    return response.body;
  }
}

export default RequestHelper;
