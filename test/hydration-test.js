import {
  expect
} from 'chai';
import Hydration from '../src/Hydration';
import UserRepo from '../src/User-repo';
import User from '../src/User';
import {
  fakeHydrationData,
  fakeUserData
} from '../src/data/fakeData';

describe('Hydration', function () {

  let hydration;

  beforeEach(function () {
    hydration = new Hydration(fakeHydrationData);
  });

  it('should be a function', function () {
    expect(Hydration).to.be.a('function');
  });

  it('should be an instance of User', function () {
    expect(hydration).to.be.an.instanceof(Hydration);
  });

  it('should take in a list of hydration data', function () {
    expect(hydration.hydrationData[0].userID).to.equal(1);
    expect(hydration.hydrationData[2].numOunces).to.equal(1);
    expect(hydration.hydrationData[4].date).to.equal('2018/10/23');
  });

  it('should find the average water intake per day for a user', function () {
    expect(hydration.calculateAverageOunces(3)).to.equal(2);
  });

  it('should find the water intake for a user on a specified date', function () {
    expect(hydration.calculateDailyOunces(1, "2019/06/15")).to.equal(37);
    expect(hydration.calculateDailyOunces(4, "2019/04/15")).to.equal(36);
    expect(hydration.calculateDailyOunces(1, "2020/06/15")).to.equal(0);
  });

  it('should find water intake by day for first week', function () {
    const user1 = new User(fakeUserData[0]);
    const user2 = new User(fakeUserData[1]);

    const users = [user1, user2];
    const userRepo = new UserRepo(users);
    expect(hydration.calculateFirstWeekOunces(userRepo, 1)[0]).to.eql('2019/06/15: 37');
    expect(hydration.calculateFirstWeekOunces(userRepo, 2)[1]).to.eql('2018/10/23: 34');
  });

  it('should find sleep quality by day for that days week', function () {
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
    const users = [user3, user4];
    const userRepo = new UserRepo(users);
    expect(hydration.calculateRandomWeekOunces('2019/09/18', 4, userRepo)[0]).to.eql('2019/09/18: 40');
    // expect(hydration.calculateRandomWeekOunces('2018/02/01', 4, userRepo)[6]).to.eql('2019/09/16: 30');
    //this is failing because it doesn't exist, need a failure case
  })
  //day of hydration should not include user 2 or user 1 on August 22
  //week of hydration should not include user 4 not during the week

});