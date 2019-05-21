declare function encodeURIComponent(uriComponent: string | number | boolean): string;

declare interface Global {
  URL: typeof URL,
  URLSearchParams: typeof URLSearchParams,
  encodeURIComponent: typeof encodeURIComponent
}
