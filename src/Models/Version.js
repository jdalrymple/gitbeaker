import BaseModel from './BaseModel';

class Version extends BaseModel {
  show() {
    return this.get('version');
  }
}

export default Version;
