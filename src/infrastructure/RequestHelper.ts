import Li from 'li';
import { camelizeKeys } from 'humps';
import { BaseService } from './BaseService';

export async function get(
  service: BaseService,
  endpoint: string,
  options: PaginatedRequestOptions = {},
): Promise<GetResponse> {
  const { showPagination, maxPages, sudo, ...query } = options;
  const response = await service.requester.get(service, endpoint, {
    query: query || {},
    sudo,
  });
  const { headers } = response;
  let { body } = response;
  let pagination = {
    total: headers['x-total'],
    next: parseInt(headers['x-next-page'], 10) || null,
    current: parseInt(headers['x-page'], 10) || 1,
    previous: headers['x-prev-page'] || null,
    perPage: headers['x-per-page'],
    totalPages: headers['x-total-pages'],
  };

  const underLimit = maxPages ? pagination.current < maxPages : true;

  // Camelize response body if specified
  if (service.camelize) body = camelizeKeys(body);

  // Rescurse through pagination results
  if (!query.page && underLimit && pagination.next) {
    const { next } = Li.parse(headers.link);
    const more = await get(service, next.replace(`${service.url}/`, ''), {
      maxPages,
      sudo,
      showPagination: true
    }) as PaginationResponse;

    pagination = more.pagination;
    body = [...body, ...more.data];
  }

  return (query.page || body.length > 0) && showPagination ? { data: body, pagination } : body;
}

export function stream(
  service: BaseService,
  endpoint: string,
  options: BaseRequestOptions = {},
) {
  if (typeof service.requester.stream !== 'function') {
    throw new Error('Stream method is not implementated in requester!');
  }

  return service.requester.stream(service, endpoint, {
    query: options,
  });
}

export async function post(
  service: BaseService,
  endpoint: string,
  options: BaseRequestOptions = {},
): Promise<PostResponse> {
  const { sudo, ...body } = options;
  const response = await service.requester.post(service, endpoint, {
    body,
    sudo,
  });

  return response.body;
}

export async function put(
  service: BaseService,
  endpoint: string,
  options: BaseRequestOptions = {},
): Promise<PutResponse> {
  const { sudo, ...body } = options;
  const response = await service.requester.put(service, endpoint, {
    body,
  });

  return response.body;
}

export async function del(
  service: BaseService,
  endpoint: string,
  options: BaseRequestOptions = {},
): Promise<DelResponse> {
  const { sudo, ...query } = options;
  const response = await service.requester.delete(service, endpoint, {
    query,
    sudo,
  });

  return response.body;
}
