# Class: ProjectImportExport

## Hierarchy

* [BaseService](_infrastructure_baseservice_.baseservice.md)

  ↳ **ProjectImportExport**

## Constructors

###  constructor

\+ **new ProjectImportExport**(`__namedParameters`: object): *[ProjectImportExport](_services_projectimportexport_.projectimportexport.md)*

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

**Returns:** *[ProjectImportExport](_services_projectimportexport_.projectimportexport.md)*

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

###  download

▸ **download**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [services/ProjectImportExport.ts:6](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/ProjectImportExport.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  exportStatus

▸ **exportStatus**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [services/ProjectImportExport.ts:12](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/ProjectImportExport.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  import

▸ **import**(`content`: string, `path`: string, `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/ProjectImportExport.ts:18](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/ProjectImportExport.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`content` | string |
`path` | string |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  importStatus

▸ **importStatus**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [services/ProjectImportExport.ts:29](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/ProjectImportExport.ts#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  schedule

▸ **schedule**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Defined in [services/ProjectImportExport.ts:35](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/ProjectImportExport.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*
