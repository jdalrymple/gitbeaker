# Class: UserImpersonationTokens

## Hierarchy

* [BaseService](_infrastructure_baseservice_.baseservice.md)

  ↳ **UserImpersonationTokens**

## Constructors

###  constructor

\+ **new UserImpersonationTokens**(`__namedParameters`: object): *[UserImpersonationTokens](_services_userimpersonationtokens_.userimpersonationtokens.md)*

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

**Returns:** *[UserImpersonationTokens](_services_userimpersonationtokens_.userimpersonationtokens.md)*

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

▸ **add**(`userId`: [UserId](../modules/_services_index_.md#userid), `name`: string, `scopes`: [ImpersonationTokenScope](../modules/_services_index_.md#impersonationtokenscope), `expiresAt`: string, `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/UserImpersonationTokens.ts:11](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/UserImpersonationTokens.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`userId` | [UserId](../modules/_services_index_.md#userid) |
`name` | string |
`scopes` | [ImpersonationTokenScope](../modules/_services_index_.md#impersonationtokenscope) |
`expiresAt` | string |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  all

▸ **all**(`userId`: [UserId](../modules/_services_index_.md#userid), `options?`: [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md)): *Promise‹object | object | object[]›*

*Defined in [services/UserImpersonationTokens.ts:5](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/UserImpersonationTokens.ts#L5)*

**Parameters:**

Name | Type |
------ | ------ |
`userId` | [UserId](../modules/_services_index_.md#userid) |
`options?` | [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  revoke

▸ **revoke**(`userId`: [UserId](../modules/_services_index_.md#userid), `tokenId`: [ImpersonationTokenId](../modules/_services_index_.md#impersonationtokenid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/UserImpersonationTokens.ts:34](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/UserImpersonationTokens.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`userId` | [UserId](../modules/_services_index_.md#userid) |
`tokenId` | [ImpersonationTokenId](../modules/_services_index_.md#impersonationtokenid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  show

▸ **show**(`userId`: [UserId](../modules/_services_index_.md#userid), `tokenId`: [ImpersonationTokenId](../modules/_services_index_.md#impersonationtokenid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [services/UserImpersonationTokens.ts:28](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/UserImpersonationTokens.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`userId` | [UserId](../modules/_services_index_.md#userid) |
`tokenId` | [ImpersonationTokenId](../modules/_services_index_.md#impersonationtokenid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*
