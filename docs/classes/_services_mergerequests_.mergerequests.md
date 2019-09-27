# Class: MergeRequests

## Hierarchy

* [BaseService](_infrastructure_baseservice_.baseservice.md)

  ↳ **MergeRequests**

## Constructors

###  constructor

\+ **new MergeRequests**(`__namedParameters`: object): *[MergeRequests](_services_mergerequests_.mergerequests.md)*

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

**Returns:** *[MergeRequests](_services_mergerequests_.mergerequests.md)*

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

###  accept

▸ **accept**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `mergerequestIId`: [MergeRequestId](../modules/_services_index_.md#mergerequestid), `options?`: [AcceptMergeRequestOptions](../interfaces/_services_index_.acceptmergerequestoptions.md) & [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Defined in [services/MergeRequests.ts:20](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/MergeRequests.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`mergerequestIId` | [MergeRequestId](../modules/_services_index_.md#mergerequestid) |
`options?` | [AcceptMergeRequestOptions](../interfaces/_services_index_.acceptmergerequestoptions.md) & [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  addSpentTime

▸ **addSpentTime**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `mergerequestIId`: [MergeRequestId](../modules/_services_index_.md#mergerequestid), `duration`: string, `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/MergeRequests.ts:30](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/MergeRequests.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`mergerequestIId` | [MergeRequestId](../modules/_services_index_.md#mergerequestid) |
`duration` | string |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  addTimeEstimate

▸ **addTimeEstimate**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `mergerequestIId`: [MergeRequestId](../modules/_services_index_.md#mergerequestid), `duration`: string, `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/MergeRequests.ts:44](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/MergeRequests.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`mergerequestIId` | [MergeRequestId](../modules/_services_index_.md#mergerequestid) |
`duration` | string |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  all

▸ **all**(`__namedParameters`: object): *Promise‹object | object | object[]›*

*Defined in [services/MergeRequests.ts:58](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/MergeRequests.ts#L58)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`groupId` | any |
`options` | [options](undefined) &#124; [options](undefined) &#124; [options](undefined) |
`projectId` | any |

**Returns:** *Promise‹object | object | object[]›*

___

###  approvals

▸ **approvals**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `__namedParameters`: object): *Promise‹object | object | object[]›*

*Defined in [services/MergeRequests.ts:86](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/MergeRequests.ts#L86)*

**Parameters:**

▪ **projectId**: *[ProjectId](../modules/_services_index_.md#projectid)*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`mergerequestIId` | undefined &#124; number |
`options` | [options](undefined) |

**Returns:** *Promise‹object | object | object[]›*

___

###  approve

▸ **approve**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `mergerequestIId`: [MergeRequestId](../modules/_services_index_.md#mergerequestid), `options`: object & [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Defined in [services/MergeRequests.ts:76](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/MergeRequests.ts#L76)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`mergerequestIId` | [MergeRequestId](../modules/_services_index_.md#mergerequestid) |
`options` | object & [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  approvers

▸ **approvers**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `approverIds`: [UserId](../modules/_services_index_.md#userid)[], `approverGroupIds`: [GroupId](../modules/_services_index_.md#groupid)[], `__namedParameters`: object): *Promise‹object›*

*Defined in [services/MergeRequests.ts:104](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/MergeRequests.ts#L104)*

**Parameters:**

▪ **projectId**: *[ProjectId](../modules/_services_index_.md#projectid)*

▪ **approverIds**: *[UserId](../modules/_services_index_.md#userid)[]*

▪ **approverGroupIds**: *[GroupId](../modules/_services_index_.md#groupid)[]*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`mergerequestIId` | undefined &#124; number |
`options` | [options](undefined) |

**Returns:** *Promise‹object›*

___

###  cancelOnPipelineSucess

▸ **cancelOnPipelineSucess**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `mergerequestIId`: [MergeRequestId](../modules/_services_index_.md#mergerequestid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/MergeRequests.ts:124](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/MergeRequests.ts#L124)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`mergerequestIId` | [MergeRequestId](../modules/_services_index_.md#mergerequestid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  changes

▸ **changes**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `mergerequestIId`: [MergeRequestId](../modules/_services_index_.md#mergerequestid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [services/MergeRequests.ts:134](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/MergeRequests.ts#L134)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`mergerequestIId` | [MergeRequestId](../modules/_services_index_.md#mergerequestid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  closesIssues

▸ **closesIssues**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `mergerequestIId`: [MergeRequestId](../modules/_services_index_.md#mergerequestid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [services/MergeRequests.ts:140](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/MergeRequests.ts#L140)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`mergerequestIId` | [MergeRequestId](../modules/_services_index_.md#mergerequestid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  commits

▸ **commits**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `mergerequestIId`: [MergeRequestId](../modules/_services_index_.md#mergerequestid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [services/MergeRequests.ts:146](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/MergeRequests.ts#L146)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`mergerequestIId` | [MergeRequestId](../modules/_services_index_.md#mergerequestid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  create

▸ **create**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `sourceBranch`: string, `targetBranch`: string, `title`: string, `options?`: [CreateMergeRequestOptions](../interfaces/_services_index_.createmergerequestoptions.md) & [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Defined in [services/MergeRequests.ts:152](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/MergeRequests.ts#L152)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`sourceBranch` | string |
`targetBranch` | string |
`title` | string |
`options?` | [CreateMergeRequestOptions](../interfaces/_services_index_.createmergerequestoptions.md) & [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  edit

▸ **edit**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `mergerequestIId`: [MergeRequestId](../modules/_services_index_.md#mergerequestid), `options?`: [UpdateMergeRequestOptions](../interfaces/_services_index_.updatemergerequestoptions.md) & [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Defined in [services/MergeRequests.ts:170](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/MergeRequests.ts#L170)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`mergerequestIId` | [MergeRequestId](../modules/_services_index_.md#mergerequestid) |
`options?` | [UpdateMergeRequestOptions](../interfaces/_services_index_.updatemergerequestoptions.md) & [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  editApprovals

▸ **editApprovals**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `__namedParameters`: object): *Promise‹object›*

*Defined in [services/MergeRequests.ts:180](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/MergeRequests.ts#L180)*

**Parameters:**

▪ **projectId**: *[ProjectId](../modules/_services_index_.md#projectid)*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`mergerequestIId` | undefined &#124; number |
`options` | [options](undefined) |

**Returns:** *Promise‹object›*

___

###  participants

▸ **participants**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `mergerequestIId`: [MergeRequestId](../modules/_services_index_.md#mergerequestid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [services/MergeRequests.ts:198](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/MergeRequests.ts#L198)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`mergerequestIId` | [MergeRequestId](../modules/_services_index_.md#mergerequestid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  pipelines

▸ **pipelines**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `mergerequestIId`: [MergeRequestId](../modules/_services_index_.md#mergerequestid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [services/MergeRequests.ts:204](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/MergeRequests.ts#L204)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`mergerequestIId` | [MergeRequestId](../modules/_services_index_.md#mergerequestid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  remove

▸ **remove**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `mergerequestIId`: [MergeRequestId](../modules/_services_index_.md#mergerequestid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/MergeRequests.ts:210](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/MergeRequests.ts#L210)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`mergerequestIId` | [MergeRequestId](../modules/_services_index_.md#mergerequestid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  resetSpentTime

▸ **resetSpentTime**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `mergerequestIId`: [MergeRequestId](../modules/_services_index_.md#mergerequestid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/MergeRequests.ts:216](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/MergeRequests.ts#L216)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`mergerequestIId` | [MergeRequestId](../modules/_services_index_.md#mergerequestid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  resetTimeEstimate

▸ **resetTimeEstimate**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `mergerequestIId`: [MergeRequestId](../modules/_services_index_.md#mergerequestid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/MergeRequests.ts:226](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/MergeRequests.ts#L226)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`mergerequestIId` | [MergeRequestId](../modules/_services_index_.md#mergerequestid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  show

▸ **show**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `mergerequestIId`: [MergeRequestId](../modules/_services_index_.md#mergerequestid), `options?`: [ShowMergeRequestOptions](../interfaces/_services_index_.showmergerequestoptions.md) & [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object | object | object[]›*

*Defined in [services/MergeRequests.ts:236](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/MergeRequests.ts#L236)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`mergerequestIId` | [MergeRequestId](../modules/_services_index_.md#mergerequestid) |
`options?` | [ShowMergeRequestOptions](../interfaces/_services_index_.showmergerequestoptions.md) & [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  timeStats

▸ **timeStats**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `mergerequestIId`: [MergeRequestId](../modules/_services_index_.md#mergerequestid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [services/MergeRequests.ts:246](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/MergeRequests.ts#L246)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`mergerequestIId` | [MergeRequestId](../modules/_services_index_.md#mergerequestid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  unapprove

▸ **unapprove**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `mergerequestIId`: [MergeRequestId](../modules/_services_index_.md#mergerequestid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/MergeRequests.ts:273](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/MergeRequests.ts#L273)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`mergerequestIId` | [MergeRequestId](../modules/_services_index_.md#mergerequestid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  unsubscribe

▸ **unsubscribe**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `mergerequestIId`: [MergeRequestId](../modules/_services_index_.md#mergerequestid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/MergeRequests.ts:279](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/MergeRequests.ts#L279)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`mergerequestIId` | [MergeRequestId](../modules/_services_index_.md#mergerequestid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  version

▸ **version**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `mergerequestIId`: [MergeRequestId](../modules/_services_index_.md#mergerequestid), `versionId`: number, `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [services/MergeRequests.ts:252](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/MergeRequests.ts#L252)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`mergerequestIId` | [MergeRequestId](../modules/_services_index_.md#mergerequestid) |
`versionId` | number |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  versions

▸ **versions**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `mergerequestIId`: [MergeRequestId](../modules/_services_index_.md#mergerequestid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [services/MergeRequests.ts:267](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/MergeRequests.ts#L267)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`mergerequestIId` | [MergeRequestId](../modules/_services_index_.md#mergerequestid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*
