# Commits

## List repository commits

[Official documentation](https://docs.gitlab.com/ee/api/commits.html#list-repository-commits)

```typescript
Gitlab.Commits.all(projectId, { showPagination, maxPages, page, perPage, sudo, ...filters })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to view commits of, e.g. `12` or `node-gitlab`
showPagination | boolean | no | return or remove the pagination object on the request
maxPages | number | no | the maximum amount of pages to return <!-- TODO: add proper description -->
page | number | no | page number to request (default 1), see [official docs](https://docs.gitlab.com/ee/api/README.html#pagination)
perPage | number | no | amount of results per page (default 20, max 100), see [official docs](https://docs.gitlab.com/ee/api/README.html#pagination)
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)
filters | various | no | filter projects based on criteria, see [official docs](https://docs.gitlab.com/ee/api/commits.html#list-repository-commits)

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/commits.html#list-repository-commits) for examples

## Cherry pick a commit

[Official documentation](https://docs.gitlab.com/ee/api/commits.html#cherry-pick-a-commit)

```typescript
Gitlab.Commits.cherryPick(projectId, sha, branch, { sudo })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to cherry pick commit from, e.g. `12` or `node-gitlab`
sha | string | yes | The commit to cherry pick
branch | string | yes | The branch to commit to
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/commits.html#cherry-pick-a-commit) for examples

## Cherry pick a commit

[Official documentation](https://docs.gitlab.com/ee/api/commits.html#get-the-comments-of-a-commit)

```typescript
Gitlab.Commits.comments(projectId, sha, { sudo })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to view comments from, e.g. `12` or `node-gitlab`
sha | string | yes | The commit to show comments for
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/commits.html#get-the-comments-of-a-commit) for examples

## Create a commit with multiple files and actions

[Official documentation](https://docs.gitlab.com/ee/api/commits.html#create-a-commit-with-multiple-files-and-actions)

```typescript
Gitlab.Commits.create(projectId, branch, message, actions, { sudo, start_branch, author_email, author_name, stats })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to create commit in, e.g. `12` or `node-gitlab`
branch | string | yes | The branch to commit to
message | string | yes | The commit message
actions | array | no | The actions to take, see [official docs](https://docs.gitlab.com/ee/api/commits.html#create-a-commit-with-multiple-files-and-actions)
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)
start_branch | string | no | If creating a new branch, the name of the branch to base commit on
author_email | string | no | Commit author's email
author_name | string | no | Commit author's name
stats | boolean | no | Include commit stats in response

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/commits.html#create-a-commit-with-multiple-files-and-actions) for examples

## Post comment to commit

[Official documentation](https://docs.gitlab.com/ee/api/commits.html#post-comment-to-commit)

```typescript
Gitlab.Commits.createComment(projectId, sha, note, { sudo, path, line, line_type })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to create comment in, e.g. `12` or `node-gitlab`
sha | string | yes | The commit to comment on; either hash, tag, or branch name
note | string | yes | The comment text
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)
path | string | no | The path of the file to comment on, e.g. `src/app/config.ts`
line | number | no | The line number of the file to comment on
line_type | string | no | Either `new` or `old` line to comment on

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/commits.html#post-comment-to-commit) for examples

## Get the diff of a commit

[Official documentation](https://docs.gitlab.com/ee/api/commits.html#get-the-diff-of-a-commit)

```typescript
Gitlab.Commits.diff(projectId, sha, { sudo })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to show diff in, e.g. `12` or `node-gitlab`
sha | string | yes | The commit to diff; either hash, tag, or branch name
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/commits.html#get-the-diff-of-a-commit) for examples

## Post the build status to a commit

[Official documentation](https://docs.gitlab.com/ee/api/commits.html#post-the-build-status-to-a-commit)

```typescript
Gitlab.Commits.editStatus(projectId, sha, { sudo, ...status })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to operate on, e.g. `12` or `node-gitlab`
sha | string | yes | The commit to diff; either hash, tag, or branch name
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)
status | various | yes | The status to post, see [official docs](https://docs.gitlab.com/ee/api/commits.html#post-the-build-status-to-a-commit)

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/commits.html#post-the-build-status-to-a-commit) for examples

## Get references a commit is pushed to

[Official documentation](https://docs.gitlab.com/ee/api/commits.html#get-references-a-commit-is-pushed-to)

```typescript
Gitlab.Commits.references(projectId, sha, { sudo })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to operate on, e.g. `12` or `node-gitlab`
sha | string | yes | The commit to list references for
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/commits.html#get-references-a-commit-is-pushed-to) for examples

## Get a single commit

[Official documentation](https://docs.gitlab.com/ee/api/commits.html#get-a-single-commit)

```typescript
Gitlab.Commits.show(projectId, sha, { sudo, stats })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to operate on, e.g. `12` or `node-gitlab`
sha | string | yes | The commit to show
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)
stats | boolean | no | Return commit stats in response

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/commits.html#get-a-single-commit) for examples

## List the statuses of a commit

[Official documentation](https://docs.gitlab.com/ee/api/commits.html#list-the-statuses-of-a-commit)

```typescript
Gitlab.Commits.status(projectId, sha, { sudo, ...filters })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
projectId | number&#124;string | yes | the numerical id or the name of the project to operate on, e.g. `12` or `node-gitlab`
sha | string | yes | The commit to show statuses for
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)
filters | various | no | filter status based on criteria, see [official docs](https://docs.gitlab.com/ee/api/commits.html#list-the-statuses-of-a-commit)

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/commits.html#list-the-statuses-of-a-commit) for examples
