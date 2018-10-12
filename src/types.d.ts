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
type GroupId = string | number;

type GroupAccess = temporaryAny;

/** The duration in human format. e.g: 3h30m */
type Duration = string;

/**
  * Encodes a text string as a valid component of a Uniform Resource Identifier (URI).
  * @param uriComponent A value representing an encoded URI component.
  */
declare function encodeURIComponent(uriComponent: number | string): string;

declare module 'request-promise-core/errors';

interface ObjectConstructor {
  /**
   * Copy the values of all of the enumerable own properties from one or more source objects to a
   * target object. Returns the target object.
   * @param target The target object to copy to.
   * @param source The source object from which to copy properties.
   */
  assign<T, U>(target: T, source: U): T & U;
  /**
   * Copy the values of all of the enumerable own properties from one or more source objects to a
   * target object. Returns the target object.
   * @param target The target object to copy to.
   * @param source1 The first source object from which to copy properties.
   * @param source2 The second source object from which to copy properties.
   */
  assign<T, U, V>(target: T, source1: U, source2: V): T & U & V;
  /**
   * Copy the values of all of the enumerable own properties from one or more source objects to a
   * target object. Returns the target object.
   * @param target The target object to copy to.
   * @param source1 The first source object from which to copy properties.
   * @param source2 The second source object from which to copy properties.
   * @param source3 The third source object from which to copy properties.
   */
  assign<T, U, V, W>(
    target: T,
    source1: U,
    source2: V,
    source3: W,
  ): T & U & V & W;
  /**
   * Copy the values of all of the enumerable own properties from one or more source objects to a
   * target object. Returns the target object.
   * @param target The target object to copy to.
   * @param sources One or more source objects from which to copy properties
   */
  assign(target: any, ...sources: any[]): any;
}
