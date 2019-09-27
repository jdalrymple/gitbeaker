# Class: ResourceTemplates

## Hierarchy

* [BaseService](_infrastructure_baseservice_.baseservice.md)

  ↳ **ResourceTemplates**

  ↳ [GitignoreTemplates](_services_gitignoretemplates_.gitignoretemplates.md)

  ↳ [GitLabCIYMLTemplates](_services_gitlabciymltemplates_.gitlabciymltemplates.md)

  ↳ [LicenceTemplates](_services_licencetemplates_.licencetemplates.md)

## Constructors

###  constructor

\+ **new ResourceTemplates**(`resourceType`: string, `options`: [BaseServiceOptions](../interfaces/_infrastructure_index_.baseserviceoptions.md)): *[ResourceTemplates](_templates_resourcetemplates_.resourcetemplates.md)*

*Overrides [BaseService](_infrastructure_baseservice_.baseservice.md).[constructor](_infrastructure_baseservice_.baseservice.md#constructor)*

*Defined in [templates/ResourceTemplates.ts:10](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceTemplates.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceType` | string |
`options` | [BaseServiceOptions](../interfaces/_infrastructure_index_.baseserviceoptions.md) |

**Returns:** *[ResourceTemplates](_templates_resourcetemplates_.resourcetemplates.md)*

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

*Defined in [templates/ResourceTemplates.ts:15](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceTemplates.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`options?` | [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  show

▸ **show**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [templates/ResourceTemplates.ts:19](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceTemplates.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*
