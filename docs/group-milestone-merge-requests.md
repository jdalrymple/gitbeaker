## Group Milestones Merge Requests

* [List all group milestone merge requests](#list-all-group-milestone-merge-requests)

### List all group milestone merge requests

Gets a list of all of issues associated with a specific group milestone viewable by the authenticated user.

```javascript
let milestones = GitlabAPI.group.milestones.mergeRequests.all(groupId);
```
**Parameters**: [List all group milestone issues](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/group_milestones.md#get-all-merge-requests-assigned-to-a-single-milestone)

**Extra Parameters**

| Argument      | Description              | Type     | Required | Default           |
|---------------|--------------------------|----------|----------|-------------------|
| max_pages     |Limits the amount of pages returned | Number   | No       |  All pages         |
