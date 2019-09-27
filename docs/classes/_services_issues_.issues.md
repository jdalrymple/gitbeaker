# Class: Issues

## Hierarchy

* [BaseService](_infrastructure_baseservice_.baseservice.md)

  ↳ **Issues**

## Constructors

###  constructor

\+ **new Issues**(`__namedParameters`: object): *[Issues](_services_issues_.issues.md)*

*Inherited from [BaseService](_infrastructure_baseservice_.baseservice.md).[constructor](_infrastructure_baseservice_.baseservice.md#constructor)*

*Defined in [infrastructure/BaseService.ts:10](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/infrastructure/BaseService.ts#L10)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`camelize` | boolean | false |
`host` | string | "https://gitlab.com" |
`jobToken` | undefined &#124; string | - |
`oauthToken` | undefined &#124; string | - |
`rejectUnauthorized` | boolean | true |
`requestTimeout` | number | 300000 |
`requester` | [Requester](../interfaces/_infrastructure_index_.requester.md) |  KyRequester |
`sudo` | undefined &#124; string &#124; number | - |
`token` | undefined &#124; string | - |
`url` | string | "" |
`version` | string | "v4" |

**Returns:** *[Issues](_services_issues_.issues.md)*

## Properties

###  camelize

• **camelize**: *boolean*

*Inherited from [BaseService](_infrastructure_baseservice_.baseservice.md).[camelize](_infrastructure_baseservice_.baseservice.md#camelize)*

*Defined in [infrastructure/BaseService.ts:9](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/infrastructure/BaseService.ts#L9)*

___

###  headers

• **headers**: *object*

*Inherited from [BaseService](_infrastructure_baseservice_.baseservice.md).[headers](_infrastructure_baseservice_.baseservice.md#headers)*

*Defined in [infrastructure/BaseService.ts:8](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/infrastructure/BaseService.ts#L8)*

#### Type declaration:

* \[ **header**: *string*\]: string

___

###  rejectUnauthorized

• **rejectUnauthorized**: *boolean*

*Inherited from [BaseService](_infrastructure_baseservice_.baseservice.md).[rejectUnauthorized](_infrastructure_baseservice_.baseservice.md#rejectunauthorized)*

*Defined in [infrastructure/BaseService.ts:10](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/infrastructure/BaseService.ts#L10)*

___

###  requestTimeout

• **requestTimeout**: *number*

*Inherited from [BaseService](_infrastructure_baseservice_.baseservice.md).[requestTimeout](_infrastructure_baseservice_.baseservice.md#requesttimeout)*

*Defined in [infrastructure/BaseService.ts:7](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/infrastructure/BaseService.ts#L7)*

___

###  requester

• **requester**: *[Requester](../interfaces/_infrastructure_index_.requester.md)*

*Inherited from [BaseService](_infrastructure_baseservice_.baseservice.md).[requester](_infrastructure_baseservice_.baseservice.md#requester)*

*Defined in [infrastructure/BaseService.ts:6](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/infrastructure/BaseService.ts#L6)*

___

###  url

• **url**: *string*

*Inherited from [BaseService](_infrastructure_baseservice_.baseservice.md).[url](_infrastructure_baseservice_.baseservice.md#url)*

*Defined in [infrastructure/BaseService.ts:5](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/infrastructure/BaseService.ts#L5)*

## Methods

###  addSpentTime

▸ **addSpentTime**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `issueId`: [IssueId](../modules/_services_index_.md#issueid), `duration`: string, `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/Issues.ts:11](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Issues.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`issueId` | [IssueId](../modules/_services_index_.md#issueid) |
`duration` | string |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  addTimeEstimate

▸ **addTimeEstimate**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `issueId`: [IssueId](../modules/_services_index_.md#issueid), `duration`: string, `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/Issues.ts:20](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Issues.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`issueId` | [IssueId](../modules/_services_index_.md#issueid) |
`duration` | string |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  all

▸ **all**(`__namedParameters`: object): *Promise‹object | object | object[]›*

*Defined in [services/Issues.ts:29](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Issues.ts#L29)*

**Parameters:**

▪`Default value`  **__namedParameters**: *object*=  {}

Name | Type |
------ | ------ |
`options` | [options](undefined) |
`projectId` | undefined &#124; string &#124; number |

**Returns:** *Promise‹object | object | object[]›*

___

###  create

▸ **create**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Defined in [services/Issues.ts:35](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Issues.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  edit

▸ **edit**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `issueId`: [IssueId](../modules/_services_index_.md#issueid), `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Defined in [services/Issues.ts:41](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Issues.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`issueId` | [IssueId](../modules/_services_index_.md#issueid) |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  link

▸ **link**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `issueIId`: [IssueId](../modules/_services_index_.md#issueid), `targetProjectId`: [ProjectId](../modules/_services_index_.md#projectid), `targetIssueId`: [IssueId](../modules/_services_index_.md#issueid), `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Defined in [services/Issues.ts:47](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Issues.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`issueIId` | [IssueId](../modules/_services_index_.md#issueid) |
`targetProjectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`targetIssueId` | [IssueId](../modules/_services_index_.md#issueid) |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  participants

▸ **participants**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `issueId`: [IssueId](../modules/_services_index_.md#issueid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [services/Issues.ts:64](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Issues.ts#L64)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`issueId` | [IssueId](../modules/_services_index_.md#issueid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  remove

▸ **remove**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `issueId`: [IssueId](../modules/_services_index_.md#issueid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/Issues.ts:70](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Issues.ts#L70)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`issueId` | [IssueId](../modules/_services_index_.md#issueid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  resetSpentTime

▸ **resetSpentTime**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `issueId`: [IssueId](../modules/_services_index_.md#issueid), `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Defined in [services/Issues.ts:76](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Issues.ts#L76)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`issueId` | [IssueId](../modules/_services_index_.md#issueid) |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  resetTimeEstimate

▸ **resetTimeEstimate**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `issueId`: [IssueId](../modules/_services_index_.md#issueid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/Issues.ts:82](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Issues.ts#L82)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`issueId` | [IssueId](../modules/_services_index_.md#issueid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  show

▸ **show**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `issueId`: [IssueId](../modules/_services_index_.md#issueid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [services/Issues.ts:88](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Issues.ts#L88)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`issueId` | [IssueId](../modules/_services_index_.md#issueid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  subscribe

▸ **subscribe**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `issueId`: [IssueId](../modules/_services_index_.md#issueid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/Issues.ts:94](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Issues.ts#L94)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`issueId` | [IssueId](../modules/_services_index_.md#issueid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  timeStats

▸ **timeStats**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `issueId`: [IssueId](../modules/_services_index_.md#issueid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [services/Issues.ts:100](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Issues.ts#L100)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`issueId` | [IssueId](../modules/_services_index_.md#issueid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  unsubscribe

▸ **unsubscribe**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `issueId`: [IssueId](../modules/_services_index_.md#issueid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/Issues.ts:106](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Issues.ts#L106)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`issueId` | [IssueId](../modules/_services_index_.md#issueid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*
