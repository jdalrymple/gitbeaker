  // Bundler
  interface Constructor {
    new (...args: any): any;
  }

  type Mapper<T extends { [name: string]: Constructor }, P extends keyof T> = {
    [name in P]: InstanceType<T[name]>
  };

  interface Bundle<T extends { [name: string]: Constructor }, P extends keyof T> {
    new (options?: any): Mapper<T, P>;
  }

  // Base Service
  interface Sudo {
    sudo?: string | number;
  }

  interface Requester {
    get: Function;
    post: Function;
    put: Function;
    delete: Function;
    stream?: Function;
  }

  interface BaseServiceOptions extends Sudo {
    oauthToken?: string;
    token?: string;
    jobToken?: string;
    host?: string;
    url?: string;
    version?: string;
    rejectUnauthorized?: boolean;
    requester?: Requester;
  }

  // RequestHelper
  type GetResponse =
    | { data: object | object[], pagination: PaginationOptions }
    | object
    | object[];
  type PostResponse = object;
  type PutResponse = object;
  type DelResponse = object;

  interface PaginationOptions {
    total: number;
    next: number | null;
    current: number | null;
    previous: number | null;
    perPage: number;
    totalPages: number;
  }

  interface DefaultRequestOptions extends Sudo {
    body?: object | FormData;
    query?: object;
  }

  interface BaseRequestOptions extends Sudo {
    [key: string]: any;
  }

  interface PaginatedRequestOptions extends BaseRequestOptions {
    showPagination?: boolean;
    maxPages?: number;
    page?: number;
    perPage?: number;
  }
