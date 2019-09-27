# Class: PipelineScheduleVariables

## Hierarchy

* [BaseService](_infrastructure_baseservice_.baseservice.md)

  ↳ **PipelineScheduleVariables**

## Constructors

###  constructor

\+ **new PipelineScheduleVariables**(`__namedParameters`: object): *[PipelineScheduleVariables](_services_pipelineschedulevariables_.pipelineschedulevariables.md)*

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

**Returns:** *[PipelineScheduleVariables](_services_pipelineschedulevariables_.pipelineschedulevariables.md)*

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

▸ **all**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `pipelineScheduleId`: [PipelineScheduleId](../modules/_services_index_.md#pipelinescheduleid), `options?`: [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md)): *Promise‹object | object | object[]›*

*Defined in [services/PipelineScheduleVariables.ts:10](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/PipelineScheduleVariables.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`pipelineScheduleId` | [PipelineScheduleId](../modules/_services_index_.md#pipelinescheduleid) |
`options?` | [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  create

▸ **create**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `pipelineScheduleId`: [PipelineScheduleId](../modules/_services_index_.md#pipelinescheduleid), `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Defined in [services/PipelineScheduleVariables.ts:20](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/PipelineScheduleVariables.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`pipelineScheduleId` | [PipelineScheduleId](../modules/_services_index_.md#pipelinescheduleid) |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  edit

▸ **edit**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `pipelineScheduleId`: [PipelineScheduleId](../modules/_services_index_.md#pipelinescheduleid), `keyId`: [KeyId](../modules/_services_index_.md#keyid), `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Defined in [services/PipelineScheduleVariables.ts:34](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/PipelineScheduleVariables.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`pipelineScheduleId` | [PipelineScheduleId](../modules/_services_index_.md#pipelinescheduleid) |
`keyId` | [KeyId](../modules/_services_index_.md#keyid) |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  remove

▸ **remove**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `pipelineScheduleId`: [PipelineScheduleId](../modules/_services_index_.md#pipelinescheduleid), `keyId`: [KeyId](../modules/_services_index_.md#keyid), `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Defined in [services/PipelineScheduleVariables.ts:64](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/PipelineScheduleVariables.ts#L64)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`pipelineScheduleId` | [PipelineScheduleId](../modules/_services_index_.md#pipelinescheduleid) |
`keyId` | [KeyId](../modules/_services_index_.md#keyid) |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  show

▸ **show**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `pipelineScheduleId`: [PipelineScheduleId](../modules/_services_index_.md#pipelinescheduleid), `keyId`: [KeyId](../modules/_services_index_.md#keyid), `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object | object | object[]›*

*Defined in [services/PipelineScheduleVariables.ts:49](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/PipelineScheduleVariables.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`pipelineScheduleId` | [PipelineScheduleId](../modules/_services_index_.md#pipelinescheduleid) |
`keyId` | [KeyId](../modules/_services_index_.md#keyid) |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object | object | object[]›*
