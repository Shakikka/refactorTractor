import { expect } from 'chai';
import {fakeSleepData, fakeUserData} from '../src/data/fakeData'

import Sleep from '../src/Sleep';
import UserRepo from '../src/User-repo';
import User from '../src/User';

describe('Sleep', function() {
  let sleepData;
  let sleep;
  let user1;
  let user2;
  let user3;
  let users;
  let userRepo;

  beforeEach(function() {

    sleep = new Sleep(fakeSleepData);
    userRepo = new UserRepo(fakeUserData);
    user1 = userRepo.users[0];
    user2 = userRepo.users[1];
    user3 = userRepo.users[2];
  });

  it('should take in a list of data', function() {
    expect(sleep.sleepData).to.deep.equal(fakeSleepData);
  });

  it('should find the average sleep hours per day for a user', function() {
    expect(sleep.calculateAverage(2, 'hoursSlept').toFixed(2)).to.equal('6.73');
  });

  it('should find the average sleep quality per day for a user', function() {
    expect(sleep.calculateAverage(1, 'sleepQuality').toFixed(2)).to.equal('2.87');
  });

  it('should find the sleep hours for a user on a specified date', function() {
    expect(sleep.findInfoForDate(3, "2019/06/16", 'hoursSlept')).to.equal(10.7);
    expect(sleep.findInfoForDate(2, "2019/06/17", 'hoursSlept')).to.equal(5.7);
  });

  it('should find the sleep quality for a user on a specified date', function() {
    expect(sleep.findInfoForDate(1, '2019/06/15', 'sleepQuality')).to.equal(2.2);
    expect(sleep.findInfoForDate(1, '2019/06/17', 'sleepQuality')).to.equal(2.6);
  });
// BREAK
  it.skip('should find sleep by day for that days week', function() {

    expect(sleep.calculateWeekSleep('2019/06/18', 4, userRepo)[0]).to.eql('2019/06/18: 7.9');
    expect(sleep.calculateWeekSleep('2019/06/18', 4, userRepo)[6]).to.eql('2017/06/15: 5.4');
  })

  it.skip('should find sleep quality by day for that days week', function() {

    expect(sleep.calculateWeekSleepQuality('2019/06/18', 4, userRepo)[0]).to.eql('2019/06/18: 1.6');
    expect(sleep.calculateWeekSleepQuality('2019/06/18', 4, userRepo)[6]).to.eql('2017/06/15: 3');
  })
  it.skip('should determine the best quality sleepers for a week', function() {

    expect(sleep.determineBestSleepers("2019/06/21", userRepo)).to.eql(["Allie McCarthy", "Bugs Bunny"]);
  })
  it.skip('should return person with best quality sleep for the week', function() {

    expect(sleep.determineSleepWinnerForWeek("2019/06/21", userRepo)).to.eql(["Bugs Bunny"]);
  })
  it.skip('should return all qualifying users if best quality sleep is a tie', function() {
    sleepData = sleepData.push({
      "userID": 6,
      "date": "2019/06/15",
      "hoursSlept": 9,
      "sleepQuality": 4
    })
    let user6 = new User({
      id: 6,
      name: "Richmond",
      address: "1234 Looney Street, Denver CO 80301-1697",
      email: "BugsB1@hotmail.com",
      strideLength: 3.8,
      dailyStepGoal: 7000,
      friends: [1, 2, 3]
    });
    users = [user1, user2, user3, user4, user5, user6];
    userRepo = new UserRepo(users);

    expect(sleep.determineSleepWinnerForWeek("2019/06/21", userRepo)).to.eql(["Bugs Bunny", "Richmond"]);
  })

  it.skip('should return person with longest sleep for the day', function() {

    expect(sleep.determineSleepHoursWinnerForDay('2019/06/21', userRepo)).to.eql(["Bugs Bunny"]);
  })
  it.skip('should return all qualifying users if longest sleep is a tie', function() {
    sleepData = sleepData.push({
      "userID": 6,
      "date": "2019/06/21",
      "hoursSlept": 9,
      "sleepQuality": 4
    })
    let user6 = new User({
      id: 6,
      name: "Richmond",
      address: "1234 Looney Street, Denver CO 80301-1697",
      email: "BugsB1@hotmail.com",
      strideLength: 3.8,
      dailyStepGoal: 7000,
      friends: [1, 2, 3]
    });
    users = [user1, user2, user3, user4, user5, user6];
    userRepo = new UserRepo(users);

    expect(sleep.determineSleepHoursWinnerForDay('2019/06/21', userRepo)).to.eql(["Bugs Bunny", "Richmond"]);
  })
  //make this test fail when user is NOT best in week
});
