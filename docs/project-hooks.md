## Project Hooks

* [Get all hooks](#get-all-hooks)
* [Get a hook](#get-a-hook)
* [Add a hook](#add-a-hook-to-a-project)
* [Edit a hook](#edit-a-hook) 
* [Remove a hook](#remove-a-hook) 

### Get all hooks

Get a list of project hooks.

```javascript
// From a project ID
let hooks = GitlabAPI.projects.hooks.all(projectId);
```
Parameters: [Get all project hooks](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/projects.md#list-project-hooks)

### Get a hook

Get a specific hook for a project.

```javascript
// From a project ID
let hook = GitlabAPI.projects.hooks.show(projectId, hookId);
```
Parameters: [Get project hook](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/projects.md#get-project-hook)

### Add a hook to a project

Adds a hook to a specified project.

```javascript
// From a project ID
let hook = GitlabAPI.projects.hooks.add(projectId, {
	// params
});
```
Parameters: [Add a hook](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/projects.md#add-project-hook)

### Edit a hook

Edits a hook for a specified project.

```javascript
// From a project ID
let hook = GitlabAPI.projects.hooks.edit(projectId, hookId, {
	// params
});
```
Parameters: [Edit a hook](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/projects.md#edit-project-hook)

### Remove a hook

Remove a hook from a project.

```javascript
// From a project ID
GitlabAPI.projects.hooks.remove(projectId, hookId);
```
Parameters: [Remove a hook](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/projects.md#delete-project-hook)


