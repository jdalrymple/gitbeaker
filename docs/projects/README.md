# Projects

## List all projects

[Official documentation](https://docs.gitlab.com/ee/api/projects.html#list-all-projects)

```typescript
Gitlab.Projects.all({ showPagination, maxPages, page, perPage, sudo })
```

Option | Type | Required | Description
--- | --- | --- | ---
showPagination | boolean | no | return or remove the pagination object on the request
maxPages | number | no | the maximum amount of pages to return <!-- TODO: add proper description -->
page | number | no | page number to request (default 1), see [official docs](https://docs.gitlab.com/ee/api/README.html#pagination)
perPage | number | no | amount of results per page (default 20, max 100), see [official docs](https://docs.gitlab.com/ee/api/README.html#pagination)
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)

## Archive a project

[Official documentation](https://docs.gitlab.com/ee/api/projects.html#archive-a-project)

```typescript
Gitlab.Projects.archive(projectId, { sudo })
```

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project, e.g. `12` or `node-gitlab`
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)
