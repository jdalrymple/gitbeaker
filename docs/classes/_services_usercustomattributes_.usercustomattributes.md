# Class: UserCustomAttributes

## Hierarchy

  ↳ [ResourceCustomAttributes](_templates_resourcecustomattributes_.resourcecustomattributes.md)

  ↳ **UserCustomAttributes**

## Constructors

###  constructor

\+ **new UserCustomAttributes**(`options`: [BaseServiceOptions](../interfaces/_infrastructure_index_.baseserviceoptions.md)): *[UserCustomAttributes](_services_usercustomattributes_.usercustomattributes.md)*

*Overrides [ResourceCustomAttributes](_templates_resourcecustomattributes_.resourcecustomattributes.md).[constructor](_templates_resourcecustomattributes_.resourcecustomattributes.md#constructor)*

*Defined in [services/UserCustomAttributes.ts:4](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/UserCustomAttributes.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [BaseServiceOptions](../interfaces/_infrastructure_index_.baseserviceoptions.md) |

**Returns:** *[UserCustomAttributes](_services_usercustomattributes_.usercustomattributes.md)*

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

▸ **all**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `options?`: [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md)): *Promise‹object | object | object[]›*

*Inherited from [ResourceCustomAttributes](_templates_resourcecustomattributes_.resourcecustomattributes.md).[all](_templates_resourcecustomattributes_.resourcecustomattributes.md#all)*

*Defined in [templates/ResourceCustomAttributes.ts:15](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceCustomAttributes.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`options?` | [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  remove

▸ **remove**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `customAttributeId`: [CustomAttributeId](../modules/_services_index_.md#customattributeid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Inherited from [ResourceCustomAttributes](_templates_resourcecustomattributes_.resourcecustomattributes.md).[remove](_templates_resourcecustomattributes_.resourcecustomattributes.md#remove)*

*Defined in [templates/ResourceCustomAttributes.ts:30](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceCustomAttributes.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`customAttributeId` | [CustomAttributeId](../modules/_services_index_.md#customattributeid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  set

▸ **set**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `customAttributeId`: [CustomAttributeId](../modules/_services_index_.md#customattributeid), `value`: string, `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Inherited from [ResourceCustomAttributes](_templates_resourcecustomattributes_.resourcecustomattributes.md).[set](_templates_resourcecustomattributes_.resourcecustomattributes.md#set)*

*Defined in [templates/ResourceCustomAttributes.ts:21](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceCustomAttributes.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`customAttributeId` | [CustomAttributeId](../modules/_services_index_.md#customattributeid) |
`value` | string |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  show

▸ **show**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `customAttributeId`: [CustomAttributeId](../modules/_services_index_.md#customattributeid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Inherited from [ResourceCustomAttributes](_templates_resourcecustomattributes_.resourcecustomattributes.md).[show](_templates_resourcecustomattributes_.resourcecustomattributes.md#show)*

*Defined in [templates/ResourceCustomAttributes.ts:36](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceCustomAttributes.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`customAttributeId` | [CustomAttributeId](../modules/_services_index_.md#customattributeid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*
