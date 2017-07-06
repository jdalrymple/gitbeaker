* [Project Members](#project-members)
	* [Share project with group](#share-project-with-group)
	* [Delete a shared project link within a group](#delete-a-shared-project-link-within-a-group)
	* [List all members](#list-all-members-of-a-project)
	* [Get a member](#get-a-member-of-a-project)
	* [Add a member](#add-a-member-of-a-project)
	* [Edit a member](#edit-a-member-of-a-project)
	* [Remove a member](#remove-a-member-of-a-project)

	
## Project Members

### Share a project with a group

Allow to share project with group.

```javascript
GitlabAPI.projects.share(projectId, groupId, groupAccess, {
	// params
});
```
Parameters: [Share a project with a group](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/projects.md#share-project-with-group)

### Delete a shared project link within a group

Unshare the project from the group.

```javascript
GitlabAPI.projects.unshare(projectId, groupId);
```
Parameters: [Unshare a project with a group](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/projects.md#delete-a-shared-project-within-group)

### List all members

Gets a list of project members viewable by the authenticated user.

```javascript
let members = GitlabAPI.projects.members.list(projectId);
```
Parameters: [List all members](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/members.md#list-all-members-of-a-group-or-project)

### Get a member

Gets a member of a project.

```javascript
let member = GitlabAPI.projects.members.show(projectId, memberId);
```
Parameters: [Get a member](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/members.md#get-a-member-of-a-group-or-project)

### Add a member

Gets a member of a project.

```javascript
let member = GitlabAPI.projects.members.add(projectId, {
	// params
});
```
Parameters: [Add a member](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/members.md#add-a-member-to-a-group-or-project)

### Edit a member

Edits a member of a project.

```javascript
let member = GitlabAPI.projects.members.edit(projectId, {
	// params
});
```
Parameters: [Add a member](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/members.md#add-a-member-to-a-group-or-project)

### Remove a member

Removes a member of a project.

```javascript
GitlabAPI.projects.members.remove(projectId, memberId);
```
Parameters: [Remove a member](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/members.md#remove-a-member-to-a-group-or-project)
