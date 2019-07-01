import {Group} from './group.model';
export interface User {
     uid: string;
     name: string;
     email: string;
     groups?: Array<Group>;
     isAdmin: boolean;
}
