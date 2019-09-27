# Class: ResourceMembers

## Hierarchy

* [BaseService](_infrastructure_baseservice_.baseservice.md)

  ↳ **ResourceMembers**

  ↳ [GroupMembers](_services_groupmembers_.groupmembers.md)

  ↳ [ProjectMembers](_services_projectmembers_.projectmembers.md)

## Constructors

###  constructor

\+ **new ResourceMembers**(`resourceType`: string, `options`: [BaseServiceOptions](../interfaces/_infrastructure_index_.baseserviceoptions.md)): *[ResourceMembers](_templates_resourcemembers_.resourcemembers.md)*

*Overrides [BaseService](_infrastructure_baseservice_.baseservice.md).[constructor](_infrastructure_baseservice_.baseservice.md#constructor)*

*Defined in [templates/ResourceMembers.ts:11](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceMembers.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceType` | string |
`options` | [BaseServiceOptions](../interfaces/_infrastructure_index_.baseserviceoptions.md) |

**Returns:** *[ResourceMembers](_templates_resourcemembers_.resourcemembers.md)*

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

▸ **add**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `userId`: [UserId](../modules/_services_index_.md#userid), `accessLevel`: [AccessLevel](../modules/_services_index_.md#accesslevel), `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Defined in [templates/ResourceMembers.ts:25](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceMembers.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`userId` | [UserId](../modules/_services_index_.md#userid) |
`accessLevel` | [AccessLevel](../modules/_services_index_.md#accesslevel) |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  all

▸ **all**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `includeInherited`: boolean, `options?`: [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md)): *Promise‹object | object | object[]›*

*Defined in [templates/ResourceMembers.ts:16](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceMembers.ts#L16)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) | - |
`includeInherited` | boolean | false |
`options?` | [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md) | - |

**Returns:** *Promise‹object | object | object[]›*

___

###  edit

▸ **edit**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `userId`: [UserId](../modules/_services_index_.md#userid), `accessLevel`: [AccessLevel](../modules/_services_index_.md#accesslevel), `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Defined in [templates/ResourceMembers.ts:40](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceMembers.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`userId` | [UserId](../modules/_services_index_.md#userid) |
`accessLevel` | [AccessLevel](../modules/_services_index_.md#accesslevel) |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  remove

▸ **remove**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `userId`: [UserId](../modules/_services_index_.md#userid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [templates/ResourceMembers.ts:60](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceMembers.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`userId` | [UserId](../modules/_services_index_.md#userid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  show

▸ **show**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `userId`: [UserId](../modules/_services_index_.md#userid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [templates/ResourceMembers.ts:54](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceMembers.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`userId` | [UserId](../modules/_services_index_.md#userid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*
