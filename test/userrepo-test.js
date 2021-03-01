import {
  expect
} from 'chai';

import UserRepo from '../src/User-repo';
import User from '../src/User';
import {
  fakeUserData,
  fakeHydrationData,
  fakeSleepData,
  fakeSleepData2,
  fakeSleepData3,
  fakeActivityData,
} from '../src/data/fakeData';

describe('User Repo', function () {

  let userOne, userTwo, users, userRepo;

  beforeEach(function () {
    userRepo = new UserRepo(fakeUserData);
  });


  it('should be a function', function() {
    expect(UserRepo).to.be.a('function');
  });

  it('should create and store users', function() {
    expect(userRepo.users).to.deep.equal([fakeUserData[0], fakeUserData[1], fakeUserData[2]]);
  });

  it('should find User data based on ID', function() {
    expect(userRepo.findUserData(1)).to.deep.equal(fakeUserData[0]);
  });

  it('should find average step goal amongst all users', function() {
    expect(userRepo.findAverageStepGoal()).to.equal(6666.666666666667);
  });

  it('should be able to find data by id for any data set', function() {
  expect(userRepo.getDataFromUserID(2, fakeSleepData)).to.deep.equal([fakeSleepData[1], fakeSleepData[4], fakeSleepData[7]]);
  expect(userRepo.getDataFromUserID(3, fakeHydrationData)).to.deep.equal([fakeHydrationData[2], fakeHydrationData[6], fakeHydrationData[9]])
  });

  it('should get a users most recent date using the app', function() {
    expect(userRepo.getToday(3, fakeHydrationData)).to.equal("2019/05/09");
  });

  it('should sort data by date and extract its week', function() {
    expect(userRepo.getFirstWeek(4, fakeHydrationData)).to.deep.equal([fakeHydrationData[12],
      fakeHydrationData[13], fakeHydrationData[14], fakeHydrationData[15], fakeHydrationData[16], fakeHydrationData[17], fakeHydrationData[3]]);
  });

  it('should get a sorted week of data for a single user from a date', function() {
    const a = fakeSleepData2
    expect(userRepo.findWeekOfData('2019/06/26', 1, fakeSleepData2)).to.deep.equal([a[12], a[11], a[9], a[8], a[10], a[6], a[5]]);
    expect(userRepo.findWeekOfData('2019/06/21', 1, fakeSleepData2)).to.deep.equal([a[6], a[5], a[4], a[3], a[2], a[1], a[0]]);
  });


  // it('should get a week of data for all users in data set', function() {
  //   console.log(userRepo.chooseWeekDataForAllUsers(fakeSleepData3, '2019/06/26'))
  //   expect(userRepo.chooseWeekDataForAllUsers(fakeSleepData3, '2019/06/22')[1]).to.deep.equal(fakeSleepData3[3]);
  //   expect(userRepo.chooseWeekDataForAllUsers(fakeSleepData3, '2019/06/22')[7]).to.deep.equal(fakeSleepData3[10]);
  // });

  it('should get a day of data for all users in data set', function() {
    const a = fakeSleepData
    expect(userRepo.chooseDayDataForAllUsers(fakeSleepData, '2019/06/16')).to.deep.equal([a[3], a[4], a[5]])
  });

  // HARD STOP

  it.skip('should isolate a user ID and its values of any relevant data', function() {
    expect(userRepo.isolateUsernameAndRelevantData(sleepData, "2019/06/21", 'sleepQuality', userRepo.chooseWeekDataForAllUsers(sleepData, "2019/06/21"))).to.eql({
      '2': [3.5, 4, 3.3, 3.6, 3.6, 4, 3.1],
      '4': [3.5, 4, 1.3, 1.6, 1.6, 1, 3.1],
      '5': [4, 4, 4, 4, 4, 4, 4]
    })
    expect(userRepo.isolateUsernameAndRelevantData(hydrationData, "2019/05/09", 'numOunces', userRepo.chooseWeekDataForAllUsers(hydrationData, "2019/05/09"))).to.eql({
      '3': [1]
    })
  });

  it.skip('should rank user ids according to relevant data value averages', function() {
    expect(userRepo.rankUserIDsbyRelevantDataValue(sleepData, "2019/06/21", 'sleepQuality', userRepo.chooseWeekDataForAllUsers(sleepData, "2019/06/21"))).to.eql(['5', '2', '4'])
  });

  it.skip('should show list in order of userID and average of relevant value', function() {
    expect(userRepo.combineRankedUserIDsAndAveragedData(sleepData, "2019/06/21", 'sleepQuality', userRepo.chooseWeekDataForAllUsers(sleepData, "2019/06/21"))[0]).to.eql({
      '5': 4
    })
  });

});
