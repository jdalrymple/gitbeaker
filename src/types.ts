// Base Service
export interface BaseServiceOptions {
  url?: string;
  token?: string;
  oauthToken?: string;
  version?: string;
  sudo?: string | number;
  rejectUnauthorized?: boolean;
}

// RequestHelper
export interface DefaultRequestOptions {
  body?: object | undefined;
  query?: object | undefined;
  sudo?: string | number | undefined;
}

export interface BaseRequestOptions {
  sudo?: string | number | undefined;
  [propName: string]: any;
}

export interface PaginatedRequestOptions extends BaseRequestOptions {
  showPagination?: boolean;
  maxPages?: number;
  page?: number;
}

// Users
export interface UserIdOptions extends BaseRequestOptions {
	userId?: number;
}