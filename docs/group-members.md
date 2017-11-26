## Group Members

* [List all members](#list-all-members)
* [Get a member](#get-a-member)
* [Add a member](#add-a-member)
* [Edit a member](#edit-a-member)
* [Remove a member](#remove-a-member)

### List all members

Gets a list of group members viewable by the authenticated user.

```javascript
let members = GitlabAPI.projects.members.list(projectId);
```
**Parameters**: [List all members](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/members.md#list-all-members-of-a-group-or-project)

**Extra Parameters**

| Argument      | Description              | Type     | Required | Default           |
|---------------|--------------------------|----------|----------|-------------------|
| max_pages     |Limits the amount of pages returned | Number   | No       |  All pages         |

### Get a member

Gets a member of a group.

```javascript
let member = GitlabAPI.groups.members.show(groupId, memberId);
```
**Parameters**: [Get a member](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/members.md#get-a-member-of-a-group-or-project)


### Add a member

Gets a member of a group.

```javascript
let member = GitlabAPI.groups.members.add(groupId, {
	// params
});
```
**Parameters**: [Add a member](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/members.md#add-a-member-to-a-group-or-project)


### Edit a member

Edits a member of a group.

```javascript
let member = GitlabAPI.groups.members.edit(groupId, {
	// params
});
```
**Parameters**: [Add a member](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/members.md#add-a-member-to-a-group-or-project)


### Remove a member

Removes a member of a group.

```javascript
GitlabAPI.groups.members.remove(groupId, memberId);
```
**Parameters**: [Remove a member](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/members.md#remove-a-member-to-a-group-or-project)
