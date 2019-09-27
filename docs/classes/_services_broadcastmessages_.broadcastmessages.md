# Class: BroadcastMessages

## Hierarchy

* [BaseService](_infrastructure_baseservice_.baseservice.md)

  ↳ **BroadcastMessages**

## Constructors

###  constructor

\+ **new BroadcastMessages**(`__namedParameters`: object): *[BroadcastMessages](_services_broadcastmessages_.broadcastmessages.md)*

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

**Returns:** *[BroadcastMessages](_services_broadcastmessages_.broadcastmessages.md)*

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

*Defined in [services/BroadcastMessages.ts:10](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/BroadcastMessages.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`options?` | [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  create

▸ **create**(`options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Defined in [services/BroadcastMessages.ts:14](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/BroadcastMessages.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  edit

▸ **edit**(`broadcastMessageId`: [BroadcastMessageId](../modules/_services_index_.md#broadcastmessageid), `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Defined in [services/BroadcastMessages.ts:18](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/BroadcastMessages.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`broadcastMessageId` | [BroadcastMessageId](../modules/_services_index_.md#broadcastmessageid) |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  remove

▸ **remove**(`broadcastMessageId`: [BroadcastMessageId](../modules/_services_index_.md#broadcastmessageid)): *Promise‹object›*

*Defined in [services/BroadcastMessages.ts:24](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/BroadcastMessages.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`broadcastMessageId` | [BroadcastMessageId](../modules/_services_index_.md#broadcastmessageid) |

**Returns:** *Promise‹object›*

___

###  show

▸ **show**(`broadcastMessageId`: [BroadcastMessageId](../modules/_services_index_.md#broadcastmessageid), `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object | object | object[]›*

*Defined in [services/BroadcastMessages.ts:30](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/BroadcastMessages.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`broadcastMessageId` | [BroadcastMessageId](../modules/_services_index_.md#broadcastmessageid) |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object | object | object[]›*
