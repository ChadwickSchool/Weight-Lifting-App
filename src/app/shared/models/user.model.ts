import {Group} from './group.model';
export interface User {
     name: string;
     email: string;
     groups?: Array<Group>;
     isAdmin: boolean;
}