import GroupClass from './group';

describe('Group class tests', () => {
  let group: GroupClass = null;
  beforeEach(() => {
    group = new GroupClass('Basketball', '1');
  });

  it('should set groupName correctly through constructor', () => {
    group = new GroupClass('Basketball', '1');
    expect(group.name).toEqual('Basketball');
  });
});
