# Class: GroupVariables

## Hierarchy

  ↳ [ResourceVariables](_templates_resourcevariables_.resourcevariables.md)

  ↳ **GroupVariables**

## Constructors

###  constructor

\+ **new GroupVariables**(`options`: [BaseServiceOptions](../interfaces/_infrastructure_index_.baseserviceoptions.md)): *[GroupVariables](_services_groupvariables_.groupvariables.md)*

*Overrides [ResourceVariables](_templates_resourcevariables_.resourcevariables.md).[constructor](_templates_resourcevariables_.resourcevariables.md#constructor)*

*Defined in [services/GroupVariables.ts:4](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/GroupVariables.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [BaseServiceOptions](../interfaces/_infrastructure_index_.baseserviceoptions.md) |

**Returns:** *[GroupVariables](_services_groupvariables_.groupvariables.md)*

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

*Inherited from [ResourceVariables](_templates_resourcevariables_.resourcevariables.md).[all](_templates_resourcevariables_.resourcevariables.md#all)*

*Defined in [templates/ResourceVariables.ts:15](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceVariables.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`options?` | [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  create

▸ **create**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Inherited from [ResourceVariables](_templates_resourcevariables_.resourcevariables.md).[create](_templates_resourcevariables_.resourcevariables.md#create)*

*Defined in [templates/ResourceVariables.ts:21](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceVariables.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  edit

▸ **edit**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `keyId`: [KeyId](../modules/_services_index_.md#keyid), `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Inherited from [ResourceVariables](_templates_resourcevariables_.resourcevariables.md).[edit](_templates_resourcevariables_.resourcevariables.md#edit)*

*Defined in [templates/ResourceVariables.ts:27](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceVariables.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`keyId` | [KeyId](../modules/_services_index_.md#keyid) |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  remove

▸ **remove**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `keyId`: [KeyId](../modules/_services_index_.md#keyid), `options?`: [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md)): *Promise‹object›*

*Inherited from [ResourceVariables](_templates_resourcevariables_.resourcevariables.md).[remove](_templates_resourcevariables_.resourcevariables.md#remove)*

*Defined in [templates/ResourceVariables.ts:39](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceVariables.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`keyId` | [KeyId](../modules/_services_index_.md#keyid) |
`options?` | [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  show

▸ **show**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `keyId`: [KeyId](../modules/_services_index_.md#keyid), `options?`: [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md)): *Promise‹object | object | object[]›*

*Inherited from [ResourceVariables](_templates_resourcevariables_.resourcevariables.md).[show](_templates_resourcevariables_.resourcevariables.md#show)*

*Defined in [templates/ResourceVariables.ts:33](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceVariables.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`keyId` | [KeyId](../modules/_services_index_.md#keyid) |
`options?` | [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md) |

**Returns:** *Promise‹object | object | object[]›*
