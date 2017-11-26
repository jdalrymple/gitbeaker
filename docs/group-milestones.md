## Group Milestones

* [List all group milestones](#list-all-group-milestones)
* [Get a group milestone](#get-a-group-milestone)
* [Create a group milestone](#create-a-group-milestone)
* [Edit a group milestone](#edit-a-group-milestone)

### List all group milestones

Gets a list of group milestones viewable by the authenticated user.

```javascript
let milestones = GitlabAPI.group.milestones.all(groupId);
```
**Parameters**: [List all milestones](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/group_milestones.md#list-group-milestones)

**Extra Parameters**

| Argument      | Description              | Type     | Required | Default           |
|---------------|--------------------------|----------|----------|-------------------|
| max_pages     |Limits the amount of pages returned | Number   | No       |  All pages         |


### Get a group milestone

Gets a group milestone.

```javascript
let milestone = GitlabAPI.groups.milestones.show(groupId, milestoneId);
```
**Parameters**: [Get a milestone](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/group_milestones.md#get-single-milestone)


### Create a group milestone

Creates a group milestone.

```javascript
let milestone = GitlabAPI.groups.milestones.create(groupId, {
	// params
});
```
**Parameters**: [Create a milestone](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/group_milestones.md#create-new-milestone)


### Edit a group milestone

Edits a group milestone.

```javascript
let milestone = GitlabAPI.groups.milestones.edit(groupId, {
	// params
});
```
**Parameters**: [Edit a milestone](https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/group_milestones.md#edit-milestone)
