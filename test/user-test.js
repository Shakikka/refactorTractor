import {
  expect
} from 'chai';

import UserRepo from '../src/User-repo';
import User from '../src/User';
import {
  fakeUserData
} from '../src/data/fakeData';

describe('User', function () {

  let user, altUser;

  beforeEach(function () {
    user = new User(fakeUserData[0])
    altUser = new User(fakeUserData[1])
  })


  it('should be a function', function () {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', function () {
    expect(user).to.be.an.instanceof(User);
  });

  it('should be able to take in different user data', function () {
    expect(altUser).to.be.an.instanceof(User);
  });

  it('should have an id', function () {
    expect(user.id).to.equal(1);
  });

  it('should have a name', function () {
    expect(user.name).to.equal("Luisa Hane");
  });

  it('should have an address', function () {
    expect(user.address).to.equal("15195 Nakia Tunnel, Erdmanport VA 19901-1697");
  });

  it('should have an email', function () {
    expect(user.email).to.equal("Diana.Hayes1@hotmail.com");
  });

  it('should have a strideLength', function () {
    expect(user.strideLength).to.equal(4.3);
  });

  it('should have a dailyStepGoal', function () {
    expect(user.dailyStepGoal).to.equal(10000);
  });

  it('should have a list of friends', function () {
    expect(user.friends.length).to.equal(3);
    expect(user.friends).to.deep.equal([16, 4, 8]);
  });

  it('should return user first name', function () {
    expect(user.getFirstName()).to.equal("Luisa");
  });


  //the below is not refactored
  it('should return list of friend names from user repository', function () {
    const user1 = new User({
      id: 1,
      name: "Alex Roth",
      address: "1234 Turing Street, Denver CO 80301-1697",
      email: "alex.roth1@hotmail.com",
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [2, 3, 4]
    });
    const user2 = new User({
      id: 2,
      name: "Allie McCarthy",
      address: "1235 Turing Street, Denver CO 80301-1697",
      email: "allie.mcc1@hotmail.com",
      strideLength: 3.3,
      dailyStepGoal: 9000,
      friends: [1, 3, 4]
    });

    const user3 = new User({
      id: 3,
      name: "The Rock",
      address: "1236 Awesome Street, Denver CO 80301-1697",
      email: "therock@hotmail.com",
      strideLength: 10,
      dailyStepGoal: 60000,
      friends: [1, 2, 4]
    });

    const user4 = new User({
      id: 4,
      name: "Rainbow Dash",
      address: "1237 Equestria Street, Denver CO 80301-1697",
      email: "rainbowD1@hotmail.com",
      strideLength: 3.8,
      dailyStepGoal: 7000,
      friends: [1, 2, 3]
    });
    const users = [user1, user2, user3, user4];
    const userRepo = new UserRepo(users);

    expect(user2.getFriendsNames(userRepo)).to.deep.equal(['Alex Roth', 'The Rock', 'Rainbow Dash']);
  });
});