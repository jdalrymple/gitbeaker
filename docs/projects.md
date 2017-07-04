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
	* [Share project with group](#list-all-projects)
	* [Delete a shared project link within a group](#get-a-single-project)
	* [List all members of a project](#list-all-projects)
	* [Get a member of a project](#get-a-single-project)
	* [Add a member to a project](#get-a-single-project)
	* [Edit a member of a project](#get-a-single-project)
	* [Remove a member from a project](#get-a-single-project)
* [Project Hooks](#project-members)
	* [Share project with group](#list-all-projects)
	* [Delete a shared project link within a group](#get-a-single-project)
* [Project Branches](#project-members)
	* [Share project with group](#list-all-projects)
	* [Delete a shared project link within a group](#get-a-single-project)
* [Project Search](#project-members)

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
// From a project ID
let projectA = GitlabAPI.projects.create({
  // params
});
```
Parameters: [Create a project](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/projects.md#create-project)


### Create a project for user

Creates a new project owned by the specified user. Available only for admins.

```javascript
// From a project ID
let projectA = GitlabAPI.projects.create({
	userId: 5,
  // params
});
```
Parameters: [Create a project for user](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/projects.md#create-project-for-user)


### Edit a project

Creates a new project owned by the specified user. Available only for admins.

```javascript
// From a project ID
let projectA = GitlabAPI.projects.edit(projectId, {
  // params
});
```
Parameters: [Edit a project](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/projects.md#edit-project)


### Fork a project

Forks a project into the user namespace of the authenticated user or the one provided.

```javascript
// From a project ID
let projectA = GitlabAPI.projects.fork(projectId, {
  // params
});
```
Parameters: [Fork a project](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/projects.md#fork-project)


### Star a project

Stars a given project. Returns status code `304` if the project is already starred.

```javascript
// From a project ID
let projectA = GitlabAPI.projects.star(projectId);
```
Parameters: [Star a project](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/projects.md#star-a-project)


### Unstar a project

Unstars a given project. Returns status code `304` if the project is not starred.

```javascript
// From a project ID
let projectA = GitlabAPI.projects.unstar(projectId);
```
Parameters: [Unstar a project](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/projects.md#unstar-a-project)


### Remove a project

Removes a project including all associated resources (issues, merge requests etc.)

```javascript
// From a project ID
let projectA = GitlabAPI.projects.remove(projectId);
```
Parameters: [Remove a project](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/projects.md#remove-project)


## Project Members

### Share a project with a group

Allow to share project with group.

```javascript
// From a project ID
let projectA = GitlabAPI.projects.share(projectId, groupId, groupAccess, {
	//options
});
```
Parameters: [Share a project with a group](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/projects.md#share-project-with-group)
