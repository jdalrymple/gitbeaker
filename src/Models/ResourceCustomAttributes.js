import BaseModel from './BaseModel';
import { parse } from '../Utils';

class ResourceCustomAttributes extends BaseModel {
  constructor(resourceType, ...args) {
    super(...args);

    this.resourceType = resourceType;
  }

  all(resourceId) {
    const rId = parse(resourceId);

    return this.get(`${this.resourceType}/${rId}/custom_attributes`);
  }

  set(resourceId, customAttributeId, value) {
    const [rId, cId] = [resourceId, customAttributeId].map(parse);

    return this.put(`${this.resourceType}/${rId}/custom_attributes/${cId}`, { value });
  }

  remove(resourceId, customAttributeId) {
    const [rId, cId] = [resourceId, customAttributeId].map(parse);

    return this.delete(`${this.resourceType}/${rId}/custom_attributes/${cId}`);
  }

  show(resourceId, customAttributeId) {
    const [rId, cId] = [resourceId, customAttributeId].map(parse);

    return this.get(`${this.resourceType}/${rId}/custom_attributes/${cId}`);
  }
}

export default ResourceCustomAttributes;
