# Class: UserGPGKeys

## Hierarchy

* [BaseService](_infrastructure_baseservice_.baseservice.md)

  ↳ **UserGPGKeys**

## Constructors

###  constructor

\+ **new UserGPGKeys**(`__namedParameters`: object): *[UserGPGKeys](_services_usergpgkeys_.usergpgkeys.md)*

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

**Returns:** *[UserGPGKeys](_services_usergpgkeys_.usergpgkeys.md)*

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

###  add

▸ **add**(`title`: any, `key`: any, `__namedParameters`: object): *Promise‹object›*

*Defined in [services/UserGPGKeys.ts:16](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/UserGPGKeys.ts#L16)*

**Parameters:**

▪ **title**: *any*

▪ **key**: *any*

▪`Default value`  **__namedParameters**: *object*=  {}

Name | Type |
------ | ------ |
`options` | [options](undefined) |
`userId` | undefined &#124; number |

**Returns:** *Promise‹object›*

___

###  all

▸ **all**(`__namedParameters`: object): *Promise‹object | object | object[]›*

*Defined in [services/UserGPGKeys.ts:12](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/UserGPGKeys.ts#L12)*

**Parameters:**

▪`Default value`  **__namedParameters**: *object*=  {}

Name | Type |
------ | ------ |
`options` | [options](undefined) |
`userId` | undefined &#124; number |

**Returns:** *Promise‹object | object | object[]›*

___

###  remove

▸ **remove**(`keyId`: any, `__namedParameters`: object): *Promise‹object›*

*Defined in [services/UserGPGKeys.ts:30](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/UserGPGKeys.ts#L30)*

**Parameters:**

▪ **keyId**: *any*

▪`Default value`  **__namedParameters**: *object*=  {}

Name | Type |
------ | ------ |
`options` | [options](undefined) |
`userId` | undefined &#124; number |

**Returns:** *Promise‹object›*

___

###  show

▸ **show**(`keyId`: any, `__namedParameters`: object): *Promise‹object | object | object[]›*

*Defined in [services/UserGPGKeys.ts:24](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/UserGPGKeys.ts#L24)*

**Parameters:**

▪ **keyId**: *any*

▪`Default value`  **__namedParameters**: *object*=  {}

Name | Type |
------ | ------ |
`options` | [options](undefined) |
`userId` | undefined &#124; number |

**Returns:** *Promise‹object | object | object[]›*
