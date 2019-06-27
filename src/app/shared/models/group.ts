import {User} from './user.model';
export default class GroupClass {
    name: string;
    users: Array<User>;

    constructor(name: string, users?: Array<User>) {
        this.name = name;
        this.users = users;
    }
}