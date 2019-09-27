# Class: Groups

## Hierarchy

* [BaseService](_infrastructure_baseservice_.baseservice.md)

  ↳ **Groups**

## Constructors

###  constructor

\+ **new Groups**(`__namedParameters`: object): *[Groups](_services_groups_.groups.md)*

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

**Returns:** *[Groups](_services_groups_.groups.md)*

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

*Defined in [services/Groups.ts:11](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Groups.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`options?` | [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  create

▸ **create**(`options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Defined in [services/Groups.ts:15](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Groups.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  createLDAPLink

▸ **createLDAPLink**(`groupId`: [GroupId](../modules/_services_index_.md#groupid), `cn`: any, `groupAccess`: any, `provider`: string, `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/Groups.ts:19](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Groups.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`groupId` | [GroupId](../modules/_services_index_.md#groupid) |
`cn` | any |
`groupAccess` | any |
`provider` | string |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  edit

▸ **edit**(`groupId`: [GroupId](../modules/_services_index_.md#groupid), `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Defined in [services/Groups.ts:30](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Groups.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`groupId` | [GroupId](../modules/_services_index_.md#groupid) |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  remove

▸ **remove**(`groupId`: [GroupId](../modules/_services_index_.md#groupid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/Groups.ts:36](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Groups.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`groupId` | [GroupId](../modules/_services_index_.md#groupid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  removeLDAPLink

▸ **removeLDAPLink**(`groupId`: [GroupId](../modules/_services_index_.md#groupid), `cn`: any, `__namedParameters`: object): *Promise‹object›*

*Defined in [services/Groups.ts:42](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Groups.ts#L42)*

**Parameters:**

▪ **groupId**: *[GroupId](../modules/_services_index_.md#groupid)*

▪ **cn**: *any*

▪`Default value`  **__namedParameters**: *object*=  {}

Name | Type |
------ | ------ |
`options` | [options](undefined) |
`provider` | undefined &#124; string |

**Returns:** *Promise‹object›*

___

###  search

▸ **search**(`nameOrPath`: string, `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [services/Groups.ts:54](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Groups.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`nameOrPath` | string |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  show

▸ **show**(`groupId`: [GroupId](../modules/_services_index_.md#groupid), `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object | object | object[]›*

*Defined in [services/Groups.ts:61](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Groups.ts#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`groupId` | [GroupId](../modules/_services_index_.md#groupid) |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  subgroups

▸ **subgroups**(`groupId`: [GroupId](../modules/_services_index_.md#groupid), `options?`: [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md)): *Promise‹object | object | object[]›*

*Defined in [services/Groups.ts:67](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Groups.ts#L67)*

**Parameters:**

Name | Type |
------ | ------ |
`groupId` | [GroupId](../modules/_services_index_.md#groupid) |
`options?` | [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  syncLDAP

▸ **syncLDAP**(`groupId`: [GroupId](../modules/_services_index_.md#groupid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/Groups.ts:73](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Groups.ts#L73)*

**Parameters:**

Name | Type |
------ | ------ |
`groupId` | [GroupId](../modules/_services_index_.md#groupid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*
