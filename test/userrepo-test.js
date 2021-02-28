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
  fakeActivityData,
} from '../src/data/fakeData';

describe.only('User Repo', function () {

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

  it.skip('should get a sorted week of data for a single user from a date', function() {
    expect(userRepo.findWeekOfData('2019/09/17', 1, fakeSleepData2)[3].date).to.eql("2019/04/15");
    expect(userRepo.findWeekOfData('2019/09/18', 1, fakeSleepData2)[3].date).to.eql("2019/09/15");
  });

// HARD STOP

  it.skip('should get a week of data for all users in data set', function() {
    expect(userRepo.chooseWeekDataForAllUsers(hydrationData, '2019/09/17')[2].date).to.eql("2019/09/15");
    expect(userRepo.chooseWeekDataForAllUsers(hydrationData, '2019/09/17')[2].userID).to.eql(4);
    expect(userRepo.chooseWeekDataForAllUsers(hydrationData, '2019/09/17')[3].date).to.eql("2019/09/17");
    expect(userRepo.chooseWeekDataForAllUsers(hydrationData, '2019/09/17')[3].userID).to.eql(3);
  });

  it.skip('should get a day of data for all users in data set', function() {
    expect(userRepo.chooseDayDataForAllUsers(sleepData, '2019/06/15')[0].date).to.eql('2019/06/15');
    expect(userRepo.chooseDayDataForAllUsers(sleepData, '2019/06/15')[0].hoursSlept).to.eql(9);
    expect(userRepo.chooseDayDataForAllUsers(sleepData, '2019/06/15')[2].date).to.eql('2019/06/15');
    expect(userRepo.chooseDayDataForAllUsers(sleepData, '2019/06/15')[2].userID).to.eql(5);
  });

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
