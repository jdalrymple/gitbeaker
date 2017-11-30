const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class ResourceCustomAttributes extends BaseModel {
  constructor(resourceType, ...args) {
    super(...args);

    this.resourceType = resourceType;
  }

  all(resourceId) {
    const rId = Utils.parse(resourceId);

    return this.get(`${this.resourceType}/${rId}/custom_attributes`);
  }

  set(resourceId, customAttributeId, value) {
    const [rId, cId] = [resourceId, customAttributeId].map(Utils.parse);

    return this.put(`${this.resourceType}/${rId}/custom_attributes/${cId}`, { value });
  }

  remove(resourceId, customAttributeId) {
    const [rId, cId] = [resourceId, customAttributeId].map(Utils.parse);

    return this.delete(`${this.resourceType}/${rId}/members/${cId}`);
  }

  show(resourceId, customAttributeId) {
    const [rId, cId] = [resourceId, customAttributeId].map(Utils.parse);

    return this.get(`${this.resourceType}/${rId}/members/${cId}`);
  }
}

module.exports = ResourceCustomAttributes;
