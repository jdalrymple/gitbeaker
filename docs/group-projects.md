## Group Projects

* [List all group projects](#list-all-group-projects)
* [Add a project to a group](#add-a-project-to-a-group)

### List all group projects

Gets a list of group projects viewable by the authenticated user.

```javascript
let milestones = GitlabAPI.group.projects.all(groupId);
```
**Parameters**: [List all a group projects](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/groups.md#list-a-groups-projects)

**Extra Parameters**

| Argument      | Description              | Type     | Required | Default           |
|---------------|--------------------------|----------|----------|-------------------|
| max_pages     |Limits the amount of pages returned | Number   | No       |  All pages         |


### Add a project to a group

Adds a project to a group.

```javascript
let milestone = GitlabAPI.groups.projects.add(groupId, projectId);
```
**Parameters**: [Transfer project to group](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/groups.md#transfer-project-to-group)
