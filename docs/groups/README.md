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
