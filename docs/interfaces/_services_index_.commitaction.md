# Interface: CommitAction

## Hierarchy

* **CommitAction**

## Properties

###  action

• **action**: *"create" | "delete" | "move" | "update"*

*Defined in [services/index.ts:134](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/index.ts#L134)*

The action to perform

___

### `Optional` content

• **content**? : *undefined | string*

*Defined in [services/index.ts:140](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/index.ts#L140)*

File content, required for all except delete. Optional for move

___

### `Optional` encoding

• **encoding**? : *undefined | string*

*Defined in [services/index.ts:142](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/index.ts#L142)*

text or base64. text is default.

___

###  filePath

• **filePath**: *string*

*Defined in [services/index.ts:136](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/index.ts#L136)*

Full path to the file. Ex. lib/class.rb

___

### `Optional` lastCommitId

• **lastCommitId**? : *undefined | string*

*Defined in [services/index.ts:144](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/index.ts#L144)*

Last known file commit id. Will be only considered in update, move and delete actions.

___

### `Optional` previousPath

• **previousPath**? : *undefined | string*

*Defined in [services/index.ts:138](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/index.ts#L138)*

Original full path to the file being moved.Ex.lib / class1.rb
