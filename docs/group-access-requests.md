## Group Milestones

* [List all group access-requests](#list-all-group-access-requests)
* [Request access to a group](#request-access-to-a-group)
* [Approve a group access request](#approve-a-group-access-request)
* [Deny a group access request](#deny-a-group-access-request)

### List all group access requests

Gets a list of access requests viewable by the authenticated user.

```javascript
let milestones = GitlabAPI.group.accessRequests.all(groupId);
```
**Parameters**: [List all access requests](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/access_requests.md#list-access-requests-for-a-group-or-project)

**Extra Parameters**

| Argument      | Description              | Type     | Required | Default           |
|---------------|--------------------------|----------|----------|-------------------|
| max_pages     |Limits the amount of pages returned | Number   | No       |  All pages         |


### Request access to a group

Requests access for the authenticated user to a group or project.

```javascript
let milestone = GitlabAPI.groups.accessRequest.request(groupId);
```
**Parameters**: [Get a milestone](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/access_requests.md#request-access-to-a-group-or-project)


### Approve a group access request

Approves an access request for the given user.


```javascript
let milestone = GitlabAPI.groups.accessRequest.approve(groupId, userId);
```
**Parameters**: [Approve an access request](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/access_requests.md#approve-an-access-request)


### Deny a group access request

Deny an access request for the given user.


```javascript
let milestone = GitlabAPI.groups.accessRequest.deny(groupId, userId);
```
**Parameters**: [Deny an access request](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/access_requests.md#deny-an-access-request)
