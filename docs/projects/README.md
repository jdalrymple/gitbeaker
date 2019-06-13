# Projects

## List all projects

[Official documentation](https://docs.gitlab.com/ee/api/projects.html#list-all-projects)

```typescript
Gitlab.Projects.all({ showPagination, maxPages, page, perPage, sudo })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
showPagination | boolean | no | return or remove the pagination object on the request
maxPages | number | no | the maximum amount of pages to return <!-- TODO: add proper description -->
page | number | no | page number to request (default 1), see [official docs](https://docs.gitlab.com/ee/api/README.html#pagination)
perPage | number | no | amount of results per page (default 20, max 100), see [official docs](https://docs.gitlab.com/ee/api/README.html#pagination)
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/projects.html#list-all-projects) for examples

## Archive a project

[Official documentation](https://docs.gitlab.com/ee/api/projects.html#archive-a-project)

```typescript
Gitlab.Projects.archive(projectId, { sudo })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to archive, e.g. `12` or `node-gitlab`
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/projects.html#archive-a-project) for examples

## Create project

[Official documentation](https://docs.gitlab.com/ee/api/projects.html#create-project)

```typescript
Gitlab.Projects.create({ sudo, userId, ...project })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)
userId | number&#124;string | no | the numerical id or the username of the user to create the project for, instead of creating for a particular group
project | various | yes | project object, refer to [official docs](https://docs.gitlab.com/ee/api/projects.html#create-project) for list of attributes

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/projects.html#create-project) for examples

## Edit project

[Official documentation](https://docs.gitlab.com/ee/api/projects.html#edit-project)

```typescript
Gitlab.Projects.edit({ sudo, userId, ...project })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)
userId | number&#124;string | no | the numerical id or the username of the user to create the project for, instead of creating for a particular group
project | various | yes | project object, refer to [official docs](https://docs.gitlab.com/ee/api/projects.html#create-project) for list of attributes

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/projects.html#edit-project) for examples

## Get project events

[Official documentation](https://docs.gitlab.com/ee/api/events.html#list-a-projects-visible-events)

```typescript
Gitlab.Projects.events(projectId, { sudo, action, targetType, ...events })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)
action | string | no | filter events on a particular action type, see [official docs](https://docs.gitlab.com/ee/api/events.html#action-types)
targetType | string | no | filter events on a particular target type, see [official docs](https://docs.gitlab.com/ee/api/events.html#target-types)
events | various | no | filter events based on criteria, see [official docs](https://docs.gitlab.com/ee/api/events.html#list-a-projects-visible-events)

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/events.html#list-a-projects-visible-events) for examples

## Fork project

[Official documentation](https://docs.gitlab.com/ee/api/projects.html#fork-project)

```typescript
Gitlab.Projects.fork(projectId, { sudo, namespace })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to fork, e.g. `12` or `node-gitlab`
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)
namespace | number&#124;string | yes | the numerical id or the name of the new namespace to fork into, e.g. `12` or `gitlab-demos`

### Returns
No returned data.

## List Forks of a project

[Official documentation](https://docs.gitlab.com/ee/api/projects.html#list-forks-of-a-project)

```typescript
Gitlab.Projects.forks(projectId, { sudo, ...filters })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to list forks of, e.g. `12` or `node-gitlab`
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)
filters | various | no | filter forks based on criteria, see [official docs](https://docs.gitlab.com/ee/api/projects.html#list-forks-of-a-project)

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/projects.html#list-forks-of-a-project) for examples

## Languages

[Official documentation](https://docs.gitlab.com/ee/api/projects.html#languages)

```typescript
Gitlab.Projects.languages(projectId, { sudo })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to list languages of, e.g. `12` or `node-gitlab`
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/projects.html#languages) for examples

## Start the pull mirroring process for a Project

[Official documentation](https://docs.gitlab.com/ee/api/projects.html#start-the-pull-mirroring-process-for-a-project-starter)

```typescript
Gitlab.Projects.mirrorPull(projectId, { sudo })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to mirror, e.g. `12` or `node-gitlab`
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)

### Returns
No returned data.

## Remove project

[Official documentation](https://docs.gitlab.com/ee/api/projects.html#remove-project)

```typescript
Gitlab.Projects.remove(projectId, { sudo })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to list languages of, e.g. `12` or `node-gitlab`
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)

### Returns
No returned data.

## Search for projects by name

[Official documentation](https://docs.gitlab.com/ee/api/projects.html#search-for-projects-by-name)

```typescript
Gitlab.Projects.search(projectName)
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectName | string | yes | the query string to search for project names by

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/projects.html#search-for-projects-by-name) for examples

## Share project with group

[Official documentation](https://docs.gitlab.com/ee/api/projects.html#share-project-with-group)

```typescript
Gitlab.Projects.share(projectId, groupId, groupAccess, { sudo, expires_at })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to share, e.g. `12` or `node-gitlab`
groupId | number&#124;string | yes | the numerical id or the name of the group to share with, e.g. `12` or `gitlab-demos`
groupAccess | number | yes | the permission level for the group, see [official docs](https://docs.gitlab.com/ee/api/members.html)
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)
expires_at | ISO8601 | no | set expiration date for sharing with group YYYY-MM-DD

### Returns
No returned data.

## Get single project

[Official documentation](https://docs.gitlab.com/ee/api/projects.html#get-single-project)

```typescript
Gitlab.Projects.show(projectId, { sudo, statistics, licence, with_custom_attributes })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to show, e.g. `12` or `node-gitlab`
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)
statistics | boolean | no | return statistical information
licence | boolean | no | return licence information
with_custom_attributes | boolean | no | return custom attributes

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/projects.html#get-single-project) for examples

## Star a project

[Official documentation](https://docs.gitlab.com/ee/api/projects.html#star-a-project)

```typescript
Gitlab.Projects.star(projectId, { sudo })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to star, e.g. `12` or `node-gitlab`
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/projects.html#star-a-project) for examples

## Transfer a project to a new namespace

[Official documentation](https://docs.gitlab.com/ee/api/projects.html#transfer-a-project-to-a-new-namespace)

```typescript
Gitlab.Projects.transfer(projectId, { sudo, namespace })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to star, e.g. `12` or `node-gitlab`
namespace | number&#124;string | yes | the numerical id or the name of the namespace to transfer to, e.g. `12` or `gitlab-demos`
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)

### Returns
No returned data.

## Unarchive a project

[Official documentation](https://docs.gitlab.com/ee/api/projects.html#unarchive-a-project)

```typescript
Gitlab.Projects.unarchive(projectId, { sudo })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to unarchive, e.g. `12` or `node-gitlab`
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/projects.html#unarchive-a-project) for examples

## Delete a shared project link within a group

[Official documentation](https://docs.gitlab.com/ee/api/projects.html#unarchive-a-project)

```typescript
Gitlab.Projects.unshare(projectId, groupId, { sudo })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to unshare, e.g. `12` or `node-gitlab`
groupId | number&#124;string | yes | the numerical id or the name of the group to unshare with, e.g. `12` or `gitlab-demos`
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/projects.html#unarchive-a-project) for examples

## Unstar a project

[Official documentation](https://docs.gitlab.com/ee/api/projects.html#unstar-a-project)

```typescript
Gitlab.Projects.unstar(projectId, { sudo })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to unstar, e.g. `12` or `node-gitlab`
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/projects.html#unstar-a-project) for examples

## Edit project push rule

[Official documentation](https://docs.gitlab.com/ee/api/projects.html#edit-project-push-rule)

```typescript
Gitlab.Projects.updatePushRule(projectId, { sudo, ...pushRules })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to unstar, e.g. `12` or `node-gitlab`
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)
pushRules | various | no | push rules to modify, refer to [official docs](https://docs.gitlab.com/ee/api/projects.html#edit-project-push-rule) for list of attributes

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/projects.html#edit-project-push-rule) for examples

## Upload a file

[Official documentation](https://docs.gitlab.com/ee/api/projects.html#upload-a-file)

```typescript
Gitlab.Projects.upload(projectId, content, { fileName })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to unshare, e.g. `12` or `node-gitlab`
content | [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) | yes | the `File` or `Blob` to upload
fileName | string | no | name for the file, will be randomly generated if omitted

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/projects.html#upload-a-file) for examples
