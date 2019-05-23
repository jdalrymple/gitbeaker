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
  camelize?: boolean;
  requester?: Requester;
}

// RequestHelper
interface PaginationOptions {
  total: number;
  next: number | null;
  current: number;
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

type PaginationResponse = { data: object[], pagination: PaginationOptions }
type GetResponse = PaginationResponse | object | object[];
type PostResponse = object;
type PutResponse = object;
type DelResponse = object;

