# Merge Requests

## Accept MR

[Official documentation](https://docs.gitlab.com/ee/api/merge_requests.html#accept-mr)

```typescript
Gitlab.MergeRequests.accept(projectId, mergeRequestIId, {
    sudo, merge_commit_message, should_remove_source_branch, merge_when_pipeline_succeeds, sha
})
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to accept merge request for, e.g. `12` or `node-gitlab`
mergeRequestIId | number | yes | the numerical id of the merge request
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)
merge_commit_message | string | no | custom commit message
should_remove_source_branch | boolean | no | remove source branch after successful merge
merge_when_pipeline_succeeds | boolean | no | merge automatically after pipeline succeeds
sha | string | no | commit hash that matches the HEAD of the merging branch

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/merge_requests.html#accept-mr) for examples

## List all projects

[Official documentation](https://docs.gitlab.com/ee/api/merge_requests.html#add-spent-time-for-a-merge-request)

```typescript
Gitlab.MergeRequests.addSpentTime(projectId, mergeRequestIId, duration, { sudo })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | no | the numerical id or the name of the project to operate on, e.g. `12` or `node-gitlab`
mergeRequestIId | number | yes | the numerical id of the merge request
duration | string | yes | duration, e.g. `2h35m`
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/merge_requests.html#add-spent-time-for-a-merge-request) for examples

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
