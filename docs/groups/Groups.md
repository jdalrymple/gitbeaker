# Groups

## List groups

[Official documentation](https://docs.gitlab.com/ee/api/groups.html#list-groups)

```typescript
Gitlab.Groups.all({ showPagination, maxPages, page, perPage, sudo, ...filters })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
showPagination | boolean | no | return or remove the pagination object on the request
maxPages | number | no | the maximum amount of pages to return <!-- TODO: add proper description -->
page | number | no | page number to request (default 1), see [official docs](https://docs.gitlab.com/ee/api/README.html#pagination)
perPage | number | no | amount of results per page (default 20, max 100), see [official docs](https://docs.gitlab.com/ee/api/README.html#pagination)
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)
filters | various | no | filter groups based on criteria, see [official docs](https://docs.gitlab.com/ee/api/groups.html#list-groups)

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/groups.html#list-groups) for examples

## New group

[Official documentation](https://docs.gitlab.com/ee/api/groups.html#new-group)

```typescript
Gitlab.Groups.create({ sudo, ...group })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)
group | various | no | group object, refer to [official docs](https://docs.gitlab.com/ee/api/groups.html#new-group)

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/groups.html#new-group) for examples

## Remove group

[Official documentation](https://docs.gitlab.com/ee/api/groups.html#remove-group)

```typescript
Gitlab.Groups.remove(groupId, { sudo })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
groupId | number&#124;string | yes | the numerical id or the name of the group to remove, e.g. `4` or `gitlab-demos`
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)

### Returns
No returned data.

## Search for group

[Official documentation](https://docs.gitlab.com/ee/api/groups.html#search-for-group)

```typescript
Gitlab.Groups.search(nameOrPath, { sudo })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
nameOrPath | string | yes | the query string to search for group names by
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/groups.html#search-for-group) for examples

## Details of a group

[Official documentation](https://docs.gitlab.com/ee/api/groups.html#details-of-a-group)

```typescript
Gitlab.Groups.show(groupId, { sudo, with_custom_attributes, with_projects })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
groupId | number&#124;string | yes | the numerical id or the name of the group to show, e.g. `4` or `gitlab-demos`
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)
with_custom_attributes | boolean | no | return custom attributes, see [official docs](https://docs.gitlab.com/ee/api/custom_attributes.html)
with_projects | boolean | no | return project information

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/groups.html#details-of-a-group) for examples

## List a group’s subgroups

[Official documentation](https://docs.gitlab.com/ee/api/groups.html#list-a-groups-subgroups)

```typescript
Gitlab.Groups.subgroups({ showPagination, maxPages, page, perPage, sudo, ...filters })
```

### Parameters

Option | Type | Required | Description
--- | --- | --- | ---
showPagination | boolean | no | return or remove the pagination object on the request
maxPages | number | no | the maximum amount of pages to return <!-- TODO: add proper description -->
page | number | no | page number to request (default 1), see [official docs](https://docs.gitlab.com/ee/api/README.html#pagination)
perPage | number | no | amount of results per page (default 20, max 100), see [official docs](https://docs.gitlab.com/ee/api/README.html#pagination)
sudo | number&#124;string | no | the numerical id or the username of the user to impersonate for this operation, see [official docs](https://docs.gitlab.com/ee/api/README.html#sudo)
filters | various | no | filter groups based on criteria, see [official docs](https://docs.gitlab.com/ee/api/groups.html#list-a-groups-subgroups)

### Returns
See [official documentation](https://docs.gitlab.com/ee/api/groups.html#list-a-groups-subgroups) for examples
