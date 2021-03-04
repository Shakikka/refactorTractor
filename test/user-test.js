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

});