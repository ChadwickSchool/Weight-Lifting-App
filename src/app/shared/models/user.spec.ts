import UserClass from "./user";
import GroupClass from './group';
import TestUtils from './test-utils';

describe('User class tests', () => {
    let user: UserClass = null;
    let group: GroupClass = null;
    beforeEach(() => {
        user = new UserClass('TestUser', 'tuser@gmail.com', false);
    });

    afterEach(() => {
        user = null;
    }); 

    it('should have a valid constructor', () => {
      expect(user).not.toBeNull();
    });

    it('should set name correctly through constructor', () => {
        expect(user.name).toEqual('TestUser');
    });

    it('should set email correctly through constructor', () => {
        expect(user.email).toEqual('tuser@gmail.com');
    });

    it('should set isAdmin correctly through constructor', () => {
        expect(user.isAdmin).toEqual(false);
    });

    it('should set groups correctly through constructor', () => {
        const groups = [TestUtils.getTestGroup()];
        user = new UserClass('User with Groups', 'email@email.com', false, groups);
        expect(user.groups).not.toBeNull();
        expect(user.groups).toEqual(groups);
    });

    it('should get and set name correctly', () => {
        user.name = 'Jimmy Butler'
        expect(user.name).toEqual('Jimmy Butler');
    });

    it('should get and set email correctly', () => {
        user.email = 'jb@gmail.com'
        expect(user.email).toEqual('jb@gmail.com');
    });

    it('should get and set isAdmin correctly', () => {
        user.isAdmin = true;
        expect(user.isAdmin).toEqual(true);
    });
});