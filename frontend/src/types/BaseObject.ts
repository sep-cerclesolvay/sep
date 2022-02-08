import { BaseEditableObject } from './BaseEditableObject';
import { Id } from './Id';

export interface BaseObject extends BaseEditableObject {
  id: Id;
}
