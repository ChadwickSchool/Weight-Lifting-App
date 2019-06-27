import { User } from './user.model';
import {Group} from './group.model';

export default class UserClass implements User {
    name: string;    
    email: string;
    groups?: Array<Group>;
    isAdmin: boolean;

    constructor(name: string, email: string, isAdmin: boolean, groups?: Array<Group>) {
        this.name = name;
        this.email = email;
        this.isAdmin = isAdmin;
        this.groups = groups;
    }
}