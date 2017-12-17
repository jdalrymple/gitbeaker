## Project Triggers

* [Get all triggers](#get-all-triggers)
* [Get a trigger](#get-a-trigger)
* [Add a trigger](#add-a-trigger)
* [Edit a trigger](#edit-a-trigger)
* [Remove a trigger](#edit-a-trigger)

### Get all project triggers

Allow to share project with group.

```javascript
// From a project ID
let triggers = GitlabAPI.projects.triggers.all(projectId);
```
**Parameters**: [Get all project triggers](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/pipeline_triggers.md#list-project-triggers)

**Extra Parameters**

| Argument      | Description              | Type     | Required | Default           |
|---------------|--------------------------|----------|----------|-------------------|
| max_pages     |Limits the amount of pages returned | Number   | No       |  All pages         |

### Get a trigger

Get details of project's build trigger.

```javascript
// From a project ID
let trigger = GitlabAPI.projects.triggers.show(projectId, triggerId);
```
**Parameters**: [Get trigger details](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/pipeline_triggers.md#get-trigger-details)

### Add a trigger

Create a trigger for a project.

```javascript
// From a project ID
let trigger = GitlabAPI.projects.triggers.add(projectId, {
	// params
});
```
**Parameters**: [Create a trigger](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/pipeline_triggers.md#create-a-project-trigger)

### Edit a trigger

Edit a trigger on a project.

```javascript
// From a project ID
let trigger = GitlabAPI.projects.triggers.edit(projectId, triggerId, {
	// params
});
```
**Parameters**: [Edit a trigger](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/pipeline_triggers.md#update-a-project-trigger)

### Remove a trigger

Remove a trigger from a project.

```javascript
// From a project ID
let trigger = GitlabAPI.projects.triggers.remove(projectId, triggerId);
```
**Parameters**: [Remove a trigger](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/pipeline_triggers.md#remove-a-project-trigger)
