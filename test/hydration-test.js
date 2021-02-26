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

  //below method to be deleted if not used

  // it('should find sleep quality by day for that days week', function () {
  //   const user1 = new User(fakeUserData[0]);
  //   const user2 = new User(fakeUserData[1]);

  //   const users = [user1, user2];
  //   const userRepo = new UserRepo(users);
  //   console.log(hydration.calculateRandomWeekOunces('2016/08/22', 1, userRepo))
  //   expect(hydration.calculateRandomWeekOunces('2019/09/18', 4, userRepo)[0]).to.eql('2019/09/18: 40');
  // })

});