import { User } from './user.model';
import { Group } from './group.model';

export default class UserClass implements User {
  uid: string;
  name: string;
  email: string;
  isAdmin: boolean;

  constructor(
    uid: string,
    name: string,
    email: string,
    isAdmin: boolean,
  ) {
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.isAdmin = isAdmin;
  }
}
