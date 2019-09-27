# Class: ResourceAccessRequests

## Hierarchy

* [BaseService](_infrastructure_baseservice_.baseservice.md)

  ↳ **ResourceAccessRequests**

  ↳ [GroupAccessRequests](_services_groupaccessrequests_.groupaccessrequests.md)

  ↳ [ProjectAccessRequests](_services_projectaccessrequests_.projectaccessrequests.md)

## Constructors

###  constructor

\+ **new ResourceAccessRequests**(`resourceType`: string, `options`: [BaseServiceOptions](../interfaces/_infrastructure_index_.baseserviceoptions.md)): *[ResourceAccessRequests](_templates_resourceaccessrequests_.resourceaccessrequests.md)*

*Overrides [BaseService](_infrastructure_baseservice_.baseservice.md).[constructor](_infrastructure_baseservice_.baseservice.md#constructor)*

*Defined in [templates/ResourceAccessRequests.ts:4](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceAccessRequests.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceType` | string |
`options` | [BaseServiceOptions](../interfaces/_infrastructure_index_.baseserviceoptions.md) |

**Returns:** *[ResourceAccessRequests](_templates_resourceaccessrequests_.resourceaccessrequests.md)*

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

▸ **all**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid)): *Promise‹object | object | object[]›*

*Defined in [templates/ResourceAccessRequests.ts:9](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceAccessRequests.ts#L9)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |

**Returns:** *Promise‹object | object | object[]›*

___

###  approve

▸ **approve**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `userId`: [UserId](../modules/_services_index_.md#userid), `__namedParameters`: object): *Promise‹object›*

*Defined in [templates/ResourceAccessRequests.ts:21](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceAccessRequests.ts#L21)*

**Parameters:**

▪ **resourceId**: *[ResourceId](../modules/_services_index_.md#resourceid)*

▪ **userId**: *[UserId](../modules/_services_index_.md#userid)*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`accessLevel` | 10 &#124; 20 &#124; 30 &#124; 40 &#124; 50 |

**Returns:** *Promise‹object›*

___

###  deny

▸ **deny**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `userId`: [UserId](../modules/_services_index_.md#userid)): *Promise‹object›*

*Defined in [templates/ResourceAccessRequests.ts:33](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceAccessRequests.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`userId` | [UserId](../modules/_services_index_.md#userid) |

**Returns:** *Promise‹object›*

___

###  request

▸ **request**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid)): *Promise‹object›*

*Defined in [templates/ResourceAccessRequests.ts:15](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceAccessRequests.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |

**Returns:** *Promise‹object›*
