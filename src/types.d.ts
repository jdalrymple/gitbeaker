/// <reference path="../node_modules/jest-extended/types/index.d.ts" />
type temporaryAny = any;
type UserIdOptions = { userId?: string };
type UserId = string;

type ResourceType = string;     // see if we can narrow the type to string literals
type ResourceId = string;       // see if we can narrow the type to string literals
type Resource2Type = string;    // see if we can narrow the type to string literals
type Resource2Id = string;      // see if we can narrow the type to string literals

type NoteId = string;           // see if `| number` is a valid type
type ProjectId = string | number;
type KeyId = string;            // see if `| number` is a valid type

/**
  * Encodes a text string as a valid component of a Uniform Resource Identifier (URI).
  * @param uriComponent A value representing an encoded URI component.
  */
declare function encodeURIComponent(uriComponent: number | string): string;
