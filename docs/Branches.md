# Branches

## List repository branches

[Official documentation](https://docs.gitlab.com/ee/api/branches.html#list-repository-branches)

```typescript
Gitlab.Branches.all(projectId, { showPagination, maxPages, page, perPage, sudo, search })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to list branches of, e.g. `12` or `node-gitlab`
showPagination | boolean | no | return or remove the pagination object on the request
maxPages | number | no | the maximum amount of pages to return <!-- TODO: add proper description -->
page | number | no | page number to request (default 1), see [official docs](https://docs.gitlab.com/ee/api/README.html#pagination)
perPage | number | no | amount of results per page (default 20, max 100), see [official docs](https://docs.gitlab.com/ee/api/README.html#pagination)
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)
search | string | no | the query string to search for branch names by

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/branches.html#list-repository-branches) for examples

## Create repository branch

[Official documentation](https://docs.gitlab.com/ee/api/branches.html#create-repository-branch)

```typescript
Gitlab.Branches.create(projectId, branchName, ref, { sudo })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to create branch in, e.g. `12` or `node-gitlab`
branchName | string | yes | the name of the new branch
ref | string | yes | the commit hash to point the branch at
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/branches.html#create-repository-branch) for examples

## Protect repository branch

[Official documentation](https://docs.gitlab.com/ee/api/branches.html#protect-repository-branch)

```typescript
Gitlab.Branches.protect(projectId, branchName, { sudo, developers_can_push, developers_can_merge })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to protect branch from, e.g. `12` or `node-gitlab`
branchName | string | yes | the name of the branch to protect
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)
developers_can_push | boolean | no | whether developers can push to the branch
developers_can_merge | boolean | no | whether developers can create merge requests to the branch

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/branches.html#protect-repository-branch) for examples

## Delete repository branch

[Official documentation](https://docs.gitlab.com/ee/api/branches.html#delete-repository-branch)

```typescript
Gitlab.Branches.remove(projectId, branchName, { sudo, developers_can_push, developers_can_merge })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to delete branch from, e.g. `12` or `node-gitlab`
branchName | string | yes | the name of the branch to delete
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)

### Returns
No returned data.

## Get single repository branch

[Official documentation](https://docs.gitlab.com/ee/api/branches.html#get-single-repository-branch)

```typescript
Gitlab.Branches.show(projectId, branchName, { sudo })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to show branches from, e.g. `12` or `node-gitlab`
branchName | string | yes | the name of the branch to show
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/branches.html#get-single-repository-branch) for examples

## Unprotect repository branch

[Official documentation](https://docs.gitlab.com/ee/api/branches.html#unprotect-repository-branch)

```typescript
Gitlab.Branches.unprotect(projectId, branchName, { sudo })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to unprotect branch from, e.g. `12` or `node-gitlab`
branchName | string | yes | the name of the branch to unprotect
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/branches.html#unprotect-repository-branch) for examples
