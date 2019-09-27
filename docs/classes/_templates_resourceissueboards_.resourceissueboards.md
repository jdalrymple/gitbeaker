# Class: ResourceIssueBoards

## Hierarchy

* [BaseService](_infrastructure_baseservice_.baseservice.md)

  ↳ **ResourceIssueBoards**

  ↳ [GroupIssueBoards](_services_groupissueboards_.groupissueboards.md)

  ↳ [ProjectIssueBoards](_services_projectissueboards_.projectissueboards.md)

## Constructors

###  constructor

\+ **new ResourceIssueBoards**(`resourceType`: string, `options`: any): *[ResourceIssueBoards](_templates_resourceissueboards_.resourceissueboards.md)*

*Overrides [BaseService](_infrastructure_baseservice_.baseservice.md).[constructor](_infrastructure_baseservice_.baseservice.md#constructor)*

*Defined in [templates/ResourceIssueBoards.ts:10](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceIssueBoards.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceType` | string |
`options` | any |

**Returns:** *[ResourceIssueBoards](_templates_resourceissueboards_.resourceissueboards.md)*

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

*Defined in [templates/ResourceIssueBoards.ts:15](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceIssueBoards.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`options?` | [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  create

▸ **create**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `name`: string, `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [templates/ResourceIssueBoards.ts:21](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceIssueBoards.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`name` | string |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  createList

▸ **createList**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `boardId`: number, `labelId`: [LabelId](../modules/_services_index_.md#labelid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [templates/ResourceIssueBoards.ts:27](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceIssueBoards.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`boardId` | number |
`labelId` | [LabelId](../modules/_services_index_.md#labelid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  edit

▸ **edit**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `boardId`: number, `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Defined in [templates/ResourceIssueBoards.ts:33](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceIssueBoards.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`boardId` | number |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  editList

▸ **editList**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `boardId`: number, `listId`: number, `position`: number, `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [templates/ResourceIssueBoards.ts:39](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceIssueBoards.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`boardId` | number |
`listId` | number |
`position` | number |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  lists

▸ **lists**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `boardId`: number, `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [templates/ResourceIssueBoards.ts:51](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceIssueBoards.ts#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`boardId` | number |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  remove

▸ **remove**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `boardId`: number, `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [templates/ResourceIssueBoards.ts:57](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceIssueBoards.ts#L57)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`boardId` | number |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  removeList

▸ **removeList**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `boardId`: number, `listId`: number, `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [templates/ResourceIssueBoards.ts:63](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceIssueBoards.ts#L63)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`boardId` | number |
`listId` | number |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  show

▸ **show**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `boardId`: number, `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [templates/ResourceIssueBoards.ts:69](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceIssueBoards.ts#L69)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`boardId` | number |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  showList

▸ **showList**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `boardId`: number, `listId`: number, `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [templates/ResourceIssueBoards.ts:75](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceIssueBoards.ts#L75)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`boardId` | number |
`listId` | number |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*
