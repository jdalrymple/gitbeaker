import * as Gitbeaker from '@gitbeaker/core';
import { Requester } from './KyRequester';

const output = {};

Object.keys(Gitbeaker).forEach(name => {
  output[name] = args =>
    new Gitbeaker[name]({
      requester: Requester,
      ...args,
    });
});

/* eslint-disable */
export default output;
