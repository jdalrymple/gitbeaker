# Merge Requests

## List all projects

[Official documentation](https://docs.gitlab.com/ee/api/merge_requests.html#list-merge-requests)

```typescript
Gitlab.MergeRequests.all(projectId, groupId, { showPagination, maxPages, page, perPage, sudo, ...filters })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | no | the numerical id or the name of the project to view merge requests for, e.g. `12` or `node-gitlab`
groupId | number&#124;string | no | the numerical id or the name of the group to view merge requests for, e.g. `4` or `gitlab-demos`
showPagination | boolean | no | return or remove the pagination object on the request
maxPages | number | no | the maximum amount of pages to return <!-- TODO: add proper description -->
page | number | no | page number to request (default 1), see [official docs](https://docs.gitlab.com/ee/api/README.html#pagination)
perPage | number | no | amount of results per page (default 20, max 100), see [official docs](https://docs.gitlab.com/ee/api/README.html#pagination)
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)
filters | various | no | filter merge requests based on criteria, see [official docs](https://docs.gitlab.com/ee/api/merge_requests.html#list-merge-requests)

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/merge_requests.html#list-merge-requests) for examples
