import Humps from 'humps';
import { camelizeKeys } from 'humps';
import QS from 'qs';
import URLJoin from 'url-join';
import StreamableRequest from 'request';
import { BaseService } from '.';
import { CommitAction } from '../services/Commits';

export interface RequestParametersInput {
  url?: string;
  headers: import('./BaseService').default['headers'];
  json?: boolean;
  body?: Object;
  qs?: Object;
  qsStringifyOptions? : Object;
  formData?: temporaryAny;
  resolveWithFullResponse?: boolean;
  rejectUnauthorized?: boolean;
}

interface GetPaginatedOptions {
  showPagination?: boolean;
  maxPages?: number;
  perPage?: number;
  page?: number;
  position?: temporaryAny;
}

type RequestParametersOutput = RequestParametersInput &
  Required<Pick<RequestParametersInput, 'url'>>;

export async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function defaultRequest(
  { url, useXMLHttpRequest, rejectUnauthorized }: BaseService,
  endpoint: string,
  { headers, body, qs, formData, resolveWithFullResponse = false }: RequestParametersInput,
): RequestParametersOutput {
  const params: RequestParametersOutput = {
    url: URLJoin(url, endpoint),
    headers,
    sudo,
  };

  if (body) params.body = Humps.decamelizeKeys(body);

  // Camelize response body if specified
  if (service.camelize) body = camelizeKeys(body);
      // The xhr package doesn't have a way of passing in a qs object until v3
      params.url = URLJoin(params.url, `?${QS.stringify(Humps.decamelizeKeys(qs), { arrayFormat: 'brackets' })}`);
    } else {
      params.qs = Humps.decamelizeKeys(qs);
      params.qsStringifyOptions = { arrayFormat: 'brackets' };
    }
  }

  if (formData) params.formData = formData;

  params.resolveWithFullResponse = resolveWithFullResponse;

  params.rejectUnauthorized = rejectUnauthorized;

  return params;
}

function getStream(service: BaseService, endpoint: string, options: RequestOptions = {}) {
  if (service.useXMLHttpRequest) {
    throw new Error(
      `Cannot use streaming functionality with XMLHttpRequest. Please instantiate without this
      option to use streaming`,
    );
  }

  const requestOptions = defaultRequest(service, endpoint, {
    headers: service.headers,
    qs: options,
  });

  return StreamableRequest.get(requestOptions);
}

async function getPaginated(
  service: BaseService,
  endpoint: string,
  options: GetPaginatedOptions = {},
) {
  const { showPagination, maxPages, ...queryOptions } = options;
  const requestOptions = defaultRequest(service, endpoint, {
    headers: service.headers,
    qs: queryOptions,
    resolveWithFullResponse: true,
  });

  const response = await service.requester.get(requestOptions);
  const links = LinkParser(response.headers.link) || {};
  const page = response.headers['x-page'];
  const underMaxPageLimit = maxPages ? page < maxPages : true;
  let more = [];
  let data: temporaryAny;

  // If not looking for a singular page and still under the max pages limit
  // AND their is a next page, paginate
  if (!queryOptions.page && underMaxPageLimit && links.next) {
    more = await getPaginated(service, links.next.url.replace(service.url, ''), options);
    data = [...response.body, ...more];
  } else {
    data = response.body;
  }

  if ((queryOptions.page || maxPages) && showPagination) {
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

type RequestType = 'post' | 'get' | 'put' | 'delete';

export interface RequestOptions {
  targetIssueId?: string;
  targetProjectId?: string;
  content?: string;
  id?: string;
  sourceBranch?: string;
  targetBranch?: string;
  /** The duration in human format. e.g: 3h30m */
  duration?: string;
  domain?: string;
  cron?: temporaryAny;
  description?: string;
  file?: {
    value: Buffer;
    options: {
      filename: string;
      contentType: 'application/octet-stream';
    };
  };
  path?: string;
  namespace?: string;
  visibility?: string;
  code?: string;
  fileName?: string;
  from?: string;
  to?: string;
  sha?: string;
  runnerId?: string;
  ref?: string;
  scope?: string;
  url?: string;
  scopes?: temporaryAny;
  expiresAt?: string;
  note?: string;
  actions?: CommitAction[];
  commitMessage?: string;
  branch?: string;
  body?: string | temporaryAny;
  title?: string;
  name?: string;
  labelId?: temporaryAny;
  accessLevel?: number;
  userId?: UserId;
  position?: temporaryAny;
  value?: string;
  linkUrl?: string;
  imageUrl?: string;
  key?: string;
  action?: string;
  targetType?: string;
  email?: string;
  password?: string;
  search?: string;
  public?: boolean;
  text?: string;
}

class RequestHelper {
  static async request(
    type: RequestType,
    service: BaseService,
    endpoint: string,
    options: RequestOptions = {},
    form = false,
    stream = false,
  ): Promise<temporaryAny> {
    try {
      switch (type) {
        case 'get':
          if (stream) return await getStream(service, endpoint, options);
          return await getPaginated(service, endpoint, options);

        case 'post': {
          const requestOptions = defaultRequest(service, endpoint, {
            headers: service.headers,
            [form ? 'formData' : 'body']: options,
          });

          return await service.requester.post(requestOptions);
        }

        case 'put': {
          const requestOptions = defaultRequest(service, endpoint, {
            headers: service.headers,
            body: options,
          });

          return await service.requester.put(requestOptions);
        }

        case 'delete': {
          const requestOptions = defaultRequest(service, endpoint, {
            headers: service.headers,
            qs: options,
          });

          return await service.requester.delete(requestOptions);
        }

        default:
          throw new Error(`Unknown request type ${type}`);
      }
    } catch (err) {
      await RequestHelper.handleRequestError(err);
      return RequestHelper.request(type, service, endpoint, options, form, stream);
    }
  }

  static async handleRequestError(err: temporaryAny) {
    if (
      !err.response ||
      !err.response.headers ||
      !err.response.headers['retry-after'] ||
      parseInt(err.statusCode, 10) !== 429
    ) {
      throw err;
    }

    const sleepTime = parseInt(err.response.headers['retry-after'], 10);

    if (!sleepTime) throw err;
    return wait(sleepTime * 1000);
  }

  static get(
    service: BaseService,
    endpoint: string,
    options: RequestOptions = {},
    { stream = false } = {},
  ) {
    return RequestHelper.request('get', service, endpoint, options, false, stream);
  }

  static post(service: BaseService, endpoint: string, options: RequestOptions = {}, form = false) {
    return RequestHelper.request('post', service, endpoint, options, form);
  }

  static put(service: BaseService, endpoint: string, options: RequestOptions = {}) {
    return RequestHelper.request('put', service, endpoint, options);
  }

  static delete(service: BaseService, endpoint: string, options: RequestOptions = {}) {
    return RequestHelper.request('delete', service, endpoint, options);
  }
}

export default RequestHelper;
