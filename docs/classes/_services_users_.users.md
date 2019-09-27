# Class: Users

## Hierarchy

* [BaseService](_infrastructure_baseservice_.baseservice.md)

  ↳ **Users**

## Constructors

###  constructor

\+ **new Users**(`__namedParameters`: object): *[Users](_services_users_.users.md)*

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

**Returns:** *[Users](_services_users_.users.md)*

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

###  activities

▸ **activities**(`options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [services/Users.ts:15](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Users.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  all

▸ **all**(`options?`: [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md)): *Promise‹object | object | object[]›*

*Defined in [services/Users.ts:11](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Users.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`options?` | [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  block

▸ **block**(`userId`: [UserId](../modules/_services_index_.md#userid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/Users.ts:25](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Users.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`userId` | [UserId](../modules/_services_index_.md#userid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  create

▸ **create**(`options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Defined in [services/Users.ts:31](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Users.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  current

▸ **current**(`options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [services/Users.ts:35](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Users.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  edit

▸ **edit**(`userId`: [UserId](../modules/_services_index_.md#userid), `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Defined in [services/Users.ts:39](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Users.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`userId` | [UserId](../modules/_services_index_.md#userid) |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  events

▸ **events**(`userId`: [UserId](../modules/_services_index_.md#userid), `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) & [EventOptions](../interfaces/_services_index_.eventoptions.md)): *Promise‹object | object | object[]›*

*Defined in [services/Users.ts:45](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Users.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`userId` | [UserId](../modules/_services_index_.md#userid) |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) & [EventOptions](../interfaces/_services_index_.eventoptions.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  projects

▸ **projects**(`userId`: [UserId](../modules/_services_index_.md#userid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [services/Users.ts:19](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Users.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`userId` | [UserId](../modules/_services_index_.md#userid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  remove

▸ **remove**(`userId`: [UserId](../modules/_services_index_.md#userid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/Users.ts:72](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Users.ts#L72)*

**Parameters:**

Name | Type |
------ | ------ |
`userId` | [UserId](../modules/_services_index_.md#userid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  search

▸ **search**(`emailOrUsername`: string, `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [services/Users.ts:59](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Users.ts#L59)*

**Parameters:**

Name | Type |
------ | ------ |
`emailOrUsername` | string |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  session

▸ **session**(`email`: string, `password`: string, `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/Users.ts:51](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Users.ts#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`email` | string |
`password` | string |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  show

▸ **show**(`userId`: [UserId](../modules/_services_index_.md#userid), `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object | object | object[]›*

*Defined in [services/Users.ts:66](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Users.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`userId` | [UserId](../modules/_services_index_.md#userid) |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  unblock

▸ **unblock**(`userId`: [UserId](../modules/_services_index_.md#userid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/Users.ts:78](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Users.ts#L78)*

**Parameters:**

Name | Type |
------ | ------ |
`userId` | [UserId](../modules/_services_index_.md#userid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*
