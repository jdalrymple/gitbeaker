# Groups API

* [Groups](#Groups)
	* [List all Groups](#list-all-groups)
	* [Get a single group](#get-a-single-group)
	* [Create a group](#create-a-group)
	* [Create a group for user](#create-a-group-for-user)
	* [Edit a group](#edit-a-group)
	* [Search for a group](#edit-a-group)
* [Group Members](https://github.com/jdalrymple/node-gitlab-api/blob/master/docs/group-members.md)
* [Group Milestones](https://github.com/jdalrymple/node-gitlab-api/blob/master/docs/group-triggers.md)
	* [Group Milestones Issues](https://github.com/jdalrymple/node-gitlab-api/blob/master/docs/group-triggers.md)
	* [Group Milestones Merge Requests](https://github.com/jdalrymple/node-gitlab-api/blob/master/docs/group-triggers.md)
* [Group Projects](https://github.com/jdalrymple/node-gitlab-api/blob/master/docs/group-hooks.md)
* [Group Access Requests](https://github.com/jdalrymple/node-gitlab-api/blob/master/docs/group-hooks.md)

## Groups

### List all Groups

Get a list of visible Groups for authenticated user. When accessed without authentication, only public Groups are returned.

```javascript
let groups = GitlabAPI.groups.all();
```

**Parameters**: [List all Groups](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/groups.md#list-groups)

**Extra Parameters**

| Argument      | Description              | Type     | Required | Default           |
|---------------|--------------------------|----------|----------|-------------------|
| max_pages     |Limits the amount of pages returned | Number   | No       |  All pages         |


### Get a single group

Get a specific group. This endpoint can be accessed without authentication if
the group is publicly accessible.

```javascript
// From a group ID
let groupA = GitlabAPI.groups.show(21);

// From a Groups url
let groupB = GitlabAPI.groups.show('diaspora/diaspora');
```

**Parameters**: [Get a single group](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/groups.md#details-of-a-group)


### Create a group

Creates a new group owned by the authenticated user.

```javascript
let groupA = GitlabAPI.groups.create({
  // params
});
```
**Parameters**: [Create a group](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/groups.md#new-group)


### Edit a group

Creates a new group owned by the specified user. Available only for admins.

```javascript
let groupA = GitlabAPI.groups.edit(groupId, {
  // params
});
```
**Parameters**: [Edit a group](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/groups.md#update-group)


### Remove a group

Removes a group including all associated resources (issues, merge requests etc.)

```javascript
GitlabAPI.groups.remove(groupId);
```
**Parameters**: [Remove a group](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/groups.md#remove-group)


### Search for a group

Searches for a group and returns a group including all associated resources (issues, merge requests etc.)

```javascript
GitlabAPI.groups.search(query);
```
**Parameters**: [Search for a group](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/groups.md#search-for-group)
