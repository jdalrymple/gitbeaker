import * as all from '@gitbeaker/core';
import { Requester } from './GotRequester';

const { BaseRequester, ...coreFns } = all;
const output = {};

for (let name in coreFns) {
	output[name] = (args) => new coreFns[name]({ requester: Requester, ...args });
}

export default output;