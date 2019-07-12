import * as RequestHelper from './RequestHelper';

export { BaseService } from './BaseService';
export { bundler } from './Utils';
export { KyRequester } from './KyRequester';
export { RequestHelper };

// Bundler
export interface Constructor {
  new (...args: any): any;
}

export type Mapper<T extends { [name: string]: Constructor }, P extends keyof T> = {
  [name in P]: InstanceType<T[name]>;
};

export interface Bundle<T extends { [name: string]: Constructor }, P extends keyof T> {
  new (options?: any): Mapper<T, P>;
}

// Base Service
export interface Sudo {
  sudo?: string | number;
}

export interface Requester {
  get: Function;
  post: Function;
  put: Function;
  delete: Function;
  stream?: Function;
}

export interface BaseServiceOptions extends Sudo {
  oauthToken?: string;
  token?: string;
  jobToken?: string;
  host?: string;
  url?: string;
  version?: 'v3' | 'v4';
  rejectUnauthorized?: boolean;
  camelize?: boolean;
  requester?: Requester;
  requestTimeout?: number;
}

// RequestHelper
export interface PaginationOptions {
  total: number;
  next: number | null;
  current: number;
  previous: number | null;
  perPage: number;
  totalPages: number;
}

export interface DefaultRequestOptions extends Sudo {
  body?: object | FormData;
  query?: object;
}

export interface BaseRequestOptions extends Sudo {
  [key: string]: any;
}

export interface PaginatedRequestOptions extends BaseRequestOptions {
  showPagination?: boolean;
  maxPages?: number;
  page?: number;
  perPage?: number;
}

export type PaginationResponse = { data: object[]; pagination: PaginationOptions };
export type GetResponse = PaginationResponse | object | object[];
export type PostResponse = object;
export type PutResponse = object;
export type DelResponse = object;
