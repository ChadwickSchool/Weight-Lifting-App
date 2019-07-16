import {User} from './user.model';
export default class GroupClass {
    name: string;
    id: string;

    constructor(name: string, id: string) {
        this.name = name;
        this.id = id;
    }
}
