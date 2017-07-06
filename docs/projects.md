# Projects API

* [Basic](#basic)
	* [List all projects](#list-all-projects)
	* [Get a single project](#get-a-single-project)
	* [Create a project](#create-a-project)
	* [Create a project for user](#create-a-project-for-user)
	* [Edit a project](#edit-a-project)
	* [Fork a project](#fork-a-project)
	* [Star a project](#star-a-project)
	* [Unstar a project](#unstar-a-project)
* [Project Members](#project-members)
	* [Share project with group](#share-project-with-group)
	* [Delete a shared project link within a group](#delete-a-shared-project-link-within-a-group)
	* [List all members](#list-all-members-of-a-project)
	* [Get a member](#get-a-member-of-a-project)
	* [Add a member](#add-a-member-of-a-project)
	* [Edit a member](#edit-a-member-of-a-project)
	* [Remove a member](#remove-a-member-of-a-project)
* [Project Triggers](#project-hooks)
	* [List all hooks](#list-all-hooks)
	* [Get a hook](#get-a-hook)
	* [Create a hook](#create-a-hook)
	* [Edit a hook](#edit-a-hook)
* [Project Hooks](#project-hooks)
	* [List all hooks](#list-all-hooks)
	* [Get a hook](#get-a-hook)
	* [Create a hook](#create-a-hook)
	* [Edit a hook](#edit-a-hook)
* [Project Branches](#project-members)
	* [List all branches](#list-all-branches)
	* [Get a branch](#get-a-branch)
	* [Protect a branch](#protect-a-branch)
	* [Unprotect a branch](#unprotect-a-branch)
* [Project Search](#project-search)

## Basic

### List all projects

Get a list of visible projects for authenticated user. When accessed without authentication, only public projects are returned.

```javascript
let projects = GitlabAPI.projects.all();
```

Parameters: [List all projects](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/projects.md#list-projects)


### Get a single project

Get a specific project. This endpoint can be accessed without authentication if
the project is publicly accessible.

```javascript
// From a project ID
let projectA = GitlabAPI.projects.show(21);

// From a projects url
let projectB = GitlabAPI.projects.show('diaspora/diaspora');
```

Parameters: [Get a single project](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/projects.md#get-single-project)


### Create a project

Creates a new project owned by the authenticated user.

```javascript
let projectA = GitlabAPI.projects.create({
  // params
});
```
Parameters: [Create a project](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/projects.md#create-project)


### Create a project for user

Creates a new project owned by the specified user. Available only for admins.

```javascript
let projectA = GitlabAPI.projects.create({
	userId: 5,
  // params
});
```
Parameters: [Create a project for user](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/projects.md#create-project-for-user)


### Edit a project

Creates a new project owned by the specified user. Available only for admins.

```javascript
let projectA = GitlabAPI.projects.edit(projectId, {
  // params
});
```
Parameters: [Edit a project](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/projects.md#edit-project)


### Fork a project

Forks a project into the user namespace of the authenticated user or the one provided.

```javascript
let projectA = GitlabAPI.projects.fork(projectId, {
  // params
});
```
Parameters: [Fork a project](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/projects.md#fork-project)


### Star a project

Stars a given project. Returns status code `304` if the project is already starred.

```javascript
let projectA = GitlabAPI.projects.star(projectId);
```
Parameters: [Star a project](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/projects.md#star-a-project)


### Unstar a project

Unstars a given project. Returns status code `304` if the project is not starred.

```javascript
let projectA = GitlabAPI.projects.unstar(projectId);
```
Parameters: [Unstar a project](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/projects.md#unstar-a-project)


### Remove a project

Removes a project including all associated resources (issues, merge requests etc.)

```javascript
GitlabAPI.projects.remove(projectId);
```
Parameters: [Remove a project](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/projects.md#remove-project)


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
let members = GitlabAPI.projects.listMembers(projectId);
```
Parameters: [List all members](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/members.md#list-all-members-of-a-group-or-project)

### Get a member

Gets a member of a project.

```javascript
let member = GitlabAPI.projects.showMember(projectId, memberId);
```
Parameters: [Get a member](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/members.md#get-a-member-of-a-group-or-project)

### Add a member

Gets a member of a project.

```javascript
let member = GitlabAPI.projects.addMember(projectId, {
	// params
});
```
Parameters: [Add a member](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/members.md#add-a-member-to-a-group-or-project)

### Edit a member

Edits a member of a project.

```javascript
let member = GitlabAPI.projects.editMember(projectId, {
	// params
});
```
Parameters: [Add a member](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/members.md#add-a-member-to-a-group-or-project)

### Remove a member

Removes a member of a project.

```javascript
GitlabAPI.projects.editMember(projectId, memberId);
```
Parameters: [Remove a member](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/members.md#remove-a-member-to-a-group-or-project)

## Project Triggers

### List all project triggers

Allow to share project with group.

```javascript
// From a project ID
let projectA = GitlabAPI.projects.listTriggers(projectId);
```
Parameters: [List all project triggers](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/pipeline_triggers.md#list-project-triggers)

