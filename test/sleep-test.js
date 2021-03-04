import {
  expect
} from 'chai';
import {
  fakeSleepData,
  fakeSleepData2,
  fakeSleepData4,
  fakeUserData
} from '../src/data/fakeData'

import Sleep from '../src/Sleep';
import UserRepo from '../src/User-repo';

describe('Sleep', function () {
  let sleep;
  let userRepo;

  beforeEach(function () {
    sleep = new Sleep(fakeSleepData);
    userRepo = new UserRepo(fakeUserData);
  });

  it('should take in a list of data', function () {
    expect(sleep.sleepData).to.deep.equal(fakeSleepData);
  });

  it('should find the average sleep hours per day for a user', function () {
    expect(sleep.calculateAverage(2, 'hoursSlept').toFixed(2)).to.equal('6.73');
  });

  it('should find the average sleep quality per day for a user', function () {
    expect(sleep.calculateAverage(1, 'sleepQuality').toFixed(2)).to.equal('2.87');
  });

  it('should find the sleep hours for a user on a specified date', function () {
    expect(sleep.findInfoForDate(3, "2019/06/16", 'hoursSlept')).to.equal(10.7);
    expect(sleep.findInfoForDate(2, "2019/06/17", 'hoursSlept')).to.equal(5.7);
  });

  it('should find the sleep quality for a user on a specified date', function () {
    expect(sleep.findInfoForDate(1, '2019/06/15', 'sleepQuality')).to.equal(2.2);
    expect(sleep.findInfoForDate(1, '2019/06/17', 'sleepQuality')).to.equal(2.6);
  });

  it('should find sleep by day for that days week', function () {
    expect(sleep.calculateWeekSleep('2019/06/25', 1, userRepo, fakeSleepData2)[3])
      .to.equal('2019/06/22: hours: 7, quality: 3');
    expect(sleep.calculateWeekSleep('2019/06/21', 1, userRepo, fakeSleepData2)[5])
      .to.equal('2019/06/16: hours: 4.1, quality: 3.8');
  });

  it('should be able to calculate average sleep hours for all users', function () {
    expect(sleep.averageOfAllUsers(fakeSleepData, 'hoursSlept').toFixed(2)).to.equal('7.24');
  });

  it('should be able to calculate average quality of sleep for all users', function () {
    expect(sleep.averageOfAllUsers(fakeSleepData, 'sleepQuality').toFixed(2)).to.equal('3.68');
  });

  it('should return person with longest sleep for the day', function () {
    expect(sleep.mostHoursSlept('2019/06/24', userRepo, fakeSleepData4)).to.deep.equal([fakeUserData[1]]);
  })
  it('should return all qualifying users if longest sleep is a tie', function () {
    expect(sleep.mostHoursSlept('2019/06/23', userRepo, fakeSleepData4))
      .to.deep.equal([fakeUserData[1], fakeUserData[2]]);
  })
});