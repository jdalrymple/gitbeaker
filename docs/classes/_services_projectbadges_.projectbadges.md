# Class: ProjectBadges

## Hierarchy

  ↳ [ResourceBadges](_templates_resourcebadges_.resourcebadges.md)

  ↳ **ProjectBadges**

## Constructors

###  constructor

\+ **new ProjectBadges**(`options`: [BaseServiceOptions](../interfaces/_infrastructure_index_.baseserviceoptions.md)): *[ProjectBadges](_services_projectbadges_.projectbadges.md)*

*Overrides [ResourceBadges](_templates_resourcebadges_.resourcebadges.md).[constructor](_templates_resourcebadges_.resourcebadges.md#constructor)*

*Defined in [services/ProjectBadges.ts:4](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/ProjectBadges.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [BaseServiceOptions](../interfaces/_infrastructure_index_.baseserviceoptions.md) |

**Returns:** *[ProjectBadges](_services_projectbadges_.projectbadges.md)*

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

▸ **add**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Inherited from [ResourceBadges](_templates_resourcebadges_.resourcebadges.md).[add](_templates_resourcebadges_.resourcebadges.md#add)*

*Defined in [templates/ResourceBadges.ts:16](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceBadges.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  all

▸ **all**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `options?`: [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md)): *Promise‹object | object | object[]›*

*Inherited from [ResourceBadges](_templates_resourcebadges_.resourcebadges.md).[all](_templates_resourcebadges_.resourcebadges.md#all)*

*Defined in [templates/ResourceBadges.ts:22](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceBadges.ts#L22)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`options?` | [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  edit

▸ **edit**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `badgeId`: [BadgeId](../modules/_services_index_.md#badgeid), `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Inherited from [ResourceBadges](_templates_resourcebadges_.resourcebadges.md).[edit](_templates_resourcebadges_.resourcebadges.md#edit)*

*Defined in [templates/ResourceBadges.ts:28](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceBadges.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`badgeId` | [BadgeId](../modules/_services_index_.md#badgeid) |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  preview

▸ **preview**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `linkUrl`: string, `imageUrl`: string, `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Inherited from [ResourceBadges](_templates_resourcebadges_.resourcebadges.md).[preview](_templates_resourcebadges_.resourcebadges.md#preview)*

*Defined in [templates/ResourceBadges.ts:34](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceBadges.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`linkUrl` | string |
`imageUrl` | string |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  remove

▸ **remove**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `badgeId`: [BadgeId](../modules/_services_index_.md#badgeid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Inherited from [ResourceBadges](_templates_resourcebadges_.resourcebadges.md).[remove](_templates_resourcebadges_.resourcebadges.md#remove)*

*Defined in [templates/ResourceBadges.ts:40](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceBadges.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`badgeId` | [BadgeId](../modules/_services_index_.md#badgeid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  show

▸ **show**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `badgeId`: [BadgeId](../modules/_services_index_.md#badgeid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Inherited from [ResourceBadges](_templates_resourcebadges_.resourcebadges.md).[show](_templates_resourcebadges_.resourcebadges.md#show)*

*Defined in [templates/ResourceBadges.ts:46](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceBadges.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`badgeId` | [BadgeId](../modules/_services_index_.md#badgeid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*
