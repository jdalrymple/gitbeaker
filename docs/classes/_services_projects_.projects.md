# Class: Projects

## Hierarchy

* [BaseService](_infrastructure_baseservice_.baseservice.md)

  ↳ **Projects**

## Constructors

###  constructor

\+ **new Projects**(`__namedParameters`: object): *[Projects](_services_projects_.projects.md)*

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

**Returns:** *[Projects](_services_projects_.projects.md)*

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

###  all

▸ **all**(`options?`: [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md)): *Promise‹object | object | object[]›*

*Defined in [services/Projects.ts:13](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Projects.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`options?` | [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  archive

▸ **archive**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/Projects.ts:17](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Projects.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  create

▸ **create**(`__namedParameters`: object): *Promise‹object›*

*Defined in [services/Projects.ts:23](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Projects.ts#L23)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`options` | [options](undefined) |
`userId` | undefined &#124; number |

**Returns:** *Promise‹object›*

___

###  edit

▸ **edit**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Defined in [services/Projects.ts:29](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Projects.ts#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  events

▸ **events**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) & [EventOptions](../interfaces/_services_index_.eventoptions.md)): *Promise‹object | object | object[]›*

*Defined in [services/Projects.ts:35](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Projects.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) & [EventOptions](../interfaces/_services_index_.eventoptions.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  fork

▸ **fork**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Defined in [services/Projects.ts:41](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Projects.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  forks

▸ **forks**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object | object | object[]›*

*Defined in [services/Projects.ts:47](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Projects.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  languages

▸ **languages**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [services/Projects.ts:53](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Projects.ts#L53)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  mirrorPull

▸ **mirrorPull**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/Projects.ts:59](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Projects.ts#L59)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  remove

▸ **remove**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/Projects.ts:65](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Projects.ts#L65)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  removeFork

▸ **removeFork**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/Projects.ts:71](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Projects.ts#L71)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  search

▸ **search**(`projectName`: string): *Promise‹object | object | object[]›*

*Defined in [services/Projects.ts:77](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Projects.ts#L77)*

**Parameters:**

Name | Type |
------ | ------ |
`projectName` | string |

**Returns:** *Promise‹object | object | object[]›*

___

###  share

▸ **share**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `groupId`: [GroupId](../modules/_services_index_.md#groupid), `groupAccess`: number, `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Defined in [services/Projects.ts:81](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Projects.ts#L81)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`groupId` | [GroupId](../modules/_services_index_.md#groupid) |
`groupAccess` | number |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  show

▸ **show**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object | object | object[]›*

*Defined in [services/Projects.ts:87](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Projects.ts#L87)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  star

▸ **star**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/Projects.ts:93](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Projects.ts#L93)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  statuses

▸ **statuses**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `sha`: string, `state`: string, `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Defined in [services/Projects.ts:100](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Projects.ts#L100)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`sha` | string |
`state` | string |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  transfer

▸ **transfer**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `namespaceId`: [NamespaceId](../modules/_services_index_.md#namespaceid)): *Promise‹object›*

*Defined in [services/Projects.ts:106](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Projects.ts#L106)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`namespaceId` | [NamespaceId](../modules/_services_index_.md#namespaceid) |

**Returns:** *Promise‹object›*

___

###  unarchive

▸ **unarchive**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/Projects.ts:111](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Projects.ts#L111)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  unshare

▸ **unshare**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `groupId`: [GroupId](../modules/_services_index_.md#groupid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/Projects.ts:117](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Projects.ts#L117)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`groupId` | [GroupId](../modules/_services_index_.md#groupid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  unstar

▸ **unstar**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/Projects.ts:123](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Projects.ts#L123)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  updatePushRule

▸ **updatePushRule**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Defined in [services/Projects.ts:129](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Projects.ts#L129)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  upload

▸ **upload**(`projectId`: any, `content`: any, `metadata`: [ProjectUploadMetadata](../interfaces/_services_index_.projectuploadmetadata.md), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/Projects.ts:135](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Projects.ts#L135)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`projectId` | any | - |
`content` | any | - |
`metadata` | [ProjectUploadMetadata](../interfaces/_services_index_.projectuploadmetadata.md) |  {} |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) | - |

**Returns:** *Promise‹object›*
