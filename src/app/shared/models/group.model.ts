import {User} from './user.model';
export interface Group {
    name: string;
    users: Array<User>;
}