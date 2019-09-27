# Class: ProjectSnippetDiscussions

## Hierarchy

  ↳ [ResourceDiscussions](_templates_resourcediscussions_.resourcediscussions.md)

  ↳ **ProjectSnippetDiscussions**

## Constructors

###  constructor

\+ **new ProjectSnippetDiscussions**(`options`: [BaseServiceOptions](../interfaces/_infrastructure_index_.baseserviceoptions.md)): *[ProjectSnippetDiscussions](_services_projectsnippetdiscussions_.projectsnippetdiscussions.md)*

*Overrides [ResourceDiscussions](_templates_resourcediscussions_.resourcediscussions.md).[constructor](_templates_resourcediscussions_.resourcediscussions.md#constructor)*

*Defined in [services/ProjectSnippetDiscussions.ts:4](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/ProjectSnippetDiscussions.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [BaseServiceOptions](../interfaces/_infrastructure_index_.baseserviceoptions.md) |

**Returns:** *[ProjectSnippetDiscussions](_services_projectsnippetdiscussions_.projectsnippetdiscussions.md)*

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

### `Protected` resource2Type

• **resource2Type**: *string*

*Inherited from [ResourceDiscussions](_templates_resourcediscussions_.resourcediscussions.md).[resource2Type](_templates_resourcediscussions_.resourcediscussions.md#protected-resource2type)*

*Defined in [templates/ResourceDiscussions.ts:12](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceDiscussions.ts#L12)*

___

###  url

• **url**: *string*

*Inherited from [BaseService](_infrastructure_baseservice_.baseservice.md).[url](_infrastructure_baseservice_.baseservice.md#url)*

*Defined in [infrastructure/BaseService.ts:5](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/infrastructure/BaseService.ts#L5)*

## Methods

###  addNote

▸ **addNote**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `resource2Id`: [ResourceId](../modules/_services_index_.md#resourceid), `discussionId`: [DiscussionId](../modules/_services_index_.md#discussionid), `noteId`: [NoteId](../modules/_services_index_.md#noteid), `content`: string, `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Inherited from [ResourceDiscussions](_templates_resourcediscussions_.resourcediscussions.md).[addNote](_templates_resourcediscussions_.resourcediscussions.md#addnote)*

*Defined in [templates/ResourceDiscussions.ts:24](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceDiscussions.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`resource2Id` | [ResourceId](../modules/_services_index_.md#resourceid) |
`discussionId` | [DiscussionId](../modules/_services_index_.md#discussionid) |
`noteId` | [NoteId](../modules/_services_index_.md#noteid) |
`content` | string |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  all

▸ **all**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `resource2Id`: [ResourceId](../modules/_services_index_.md#resourceid), `options?`: [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md)): *Promise‹object | object | object[]›*

*Inherited from [ResourceDiscussions](_templates_resourcediscussions_.resourcediscussions.md).[all](_templates_resourcediscussions_.resourcediscussions.md#all)*

*Defined in [templates/ResourceDiscussions.ts:45](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceDiscussions.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`resource2Id` | [ResourceId](../modules/_services_index_.md#resourceid) |
`options?` | [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  create

▸ **create**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `resource2Id`: [ResourceId](../modules/_services_index_.md#resourceid), `content`: string, `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Inherited from [ResourceDiscussions](_templates_resourcediscussions_.resourcediscussions.md).[create](_templates_resourcediscussions_.resourcediscussions.md#create)*

*Defined in [templates/ResourceDiscussions.ts:51](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceDiscussions.ts#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`resource2Id` | [ResourceId](../modules/_services_index_.md#resourceid) |
`content` | string |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  editNote

▸ **editNote**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `resource2Id`: [ResourceId](../modules/_services_index_.md#resourceid), `discussionId`: [DiscussionId](../modules/_services_index_.md#discussionid), `noteId`: [NoteId](../modules/_services_index_.md#noteid), `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Inherited from [ResourceDiscussions](_templates_resourcediscussions_.resourcediscussions.md).[editNote](_templates_resourcediscussions_.resourcediscussions.md#editnote)*

*Defined in [templates/ResourceDiscussions.ts:67](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceDiscussions.ts#L67)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`resource2Id` | [ResourceId](../modules/_services_index_.md#resourceid) |
`discussionId` | [DiscussionId](../modules/_services_index_.md#discussionid) |
`noteId` | [NoteId](../modules/_services_index_.md#noteid) |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  removeNote

▸ **removeNote**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `resource2Id`: [ResourceId](../modules/_services_index_.md#resourceid), `discussionId`: [DiscussionId](../modules/_services_index_.md#discussionid), `noteId`: [NoteId](../modules/_services_index_.md#noteid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Inherited from [ResourceDiscussions](_templates_resourcediscussions_.resourcediscussions.md).[removeNote](_templates_resourcediscussions_.resourcediscussions.md#removenote)*

*Defined in [templates/ResourceDiscussions.ts:85](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceDiscussions.ts#L85)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`resource2Id` | [ResourceId](../modules/_services_index_.md#resourceid) |
`discussionId` | [DiscussionId](../modules/_services_index_.md#discussionid) |
`noteId` | [NoteId](../modules/_services_index_.md#noteid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  show

▸ **show**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `resource2Id`: [ResourceId](../modules/_services_index_.md#resourceid), `discussionId`: [DiscussionId](../modules/_services_index_.md#discussionid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Inherited from [ResourceDiscussions](_templates_resourcediscussions_.resourcediscussions.md).[show](_templates_resourcediscussions_.resourcediscussions.md#show)*

*Defined in [templates/ResourceDiscussions.ts:103](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceDiscussions.ts#L103)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`resource2Id` | [ResourceId](../modules/_services_index_.md#resourceid) |
`discussionId` | [DiscussionId](../modules/_services_index_.md#discussionid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*
