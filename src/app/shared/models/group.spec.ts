import GroupClass from './group';

describe('Group class tests', () => {
  let group: GroupClass = null;
  beforeEach(() => {
    group = new GroupClass('Basketball');
  });

  it('should set groupName correctly through constructor', () => {
    group = new GroupClass('Basketball');
    expect(group.name).toEqual('Basketball');
  });
});
