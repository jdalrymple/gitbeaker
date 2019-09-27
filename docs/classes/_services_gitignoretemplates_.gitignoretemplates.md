# Class: GitignoreTemplates

## Hierarchy

  ↳ [ResourceTemplates](_templates_resourcetemplates_.resourcetemplates.md)

  ↳ **GitignoreTemplates**

## Constructors

###  constructor

\+ **new GitignoreTemplates**(`options`: [BaseServiceOptions](../interfaces/_infrastructure_index_.baseserviceoptions.md)): *[GitignoreTemplates](_services_gitignoretemplates_.gitignoretemplates.md)*

*Overrides [ResourceTemplates](_templates_resourcetemplates_.resourcetemplates.md).[constructor](_templates_resourcetemplates_.resourcetemplates.md#constructor)*

*Defined in [services/GitignoreTemplates.ts:4](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/GitignoreTemplates.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [BaseServiceOptions](../interfaces/_infrastructure_index_.baseserviceoptions.md) |

**Returns:** *[GitignoreTemplates](_services_gitignoretemplates_.gitignoretemplates.md)*

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

*Inherited from [ResourceTemplates](_templates_resourcetemplates_.resourcetemplates.md).[all](_templates_resourcetemplates_.resourcetemplates.md#all)*

*Defined in [templates/ResourceTemplates.ts:15](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceTemplates.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`options?` | [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  show

▸ **show**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Inherited from [ResourceTemplates](_templates_resourcetemplates_.resourcetemplates.md).[show](_templates_resourcetemplates_.resourcetemplates.md#show)*

*Defined in [templates/ResourceTemplates.ts:19](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceTemplates.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*
