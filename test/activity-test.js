import {
  expect
} from 'chai';

import Activity from '../src/Activity';
import UserRepo from '../src/User-repo';
import {
  fakeUserData,
  fakeUserData2,
  fakeActivityData,
  fakeActivityData2,
  fakeActivityData3
} from '../src/data/fakeData';

describe('Activity', function () {


  let userOne, userTwo, userThree, userRepo, activityRepo;

  beforeEach(function () {
    userRepo = new UserRepo(fakeUserData2);
    userOne = userRepo.users[0];
    userTwo = userRepo.users[1];
    userThree = userRepo.users[2];
    activityRepo = new Activity(fakeActivityData);
  });


  it('should be a function', function () {
    expect(Activity).to.be.a('function');
  });

  it('should be an instance of Activity', function () {
    expect(activityRepo).to.be.an.instanceof(Activity);
  });

  it('should calculate miles user has walked on a given date', function() {
    expect(activityRepo.calculateMilesWalked(userOne, "2019/06/15")).to.eql(2.91);
  });

  it('should return average active minutes in a given week', function() {
    expect(activityRepo.findMinutesActiveAverage(userThree, "2019/06/15", userRepo)).to.eql(116);
  });

  it('should determine whether user met their step goal on a given day', function() {
    expect(activityRepo.accomplishStepGoal(userThree, "2019/06/15")).to.eql(true);
    expect(activityRepo.accomplishStepGoal(userTwo, "2019/06/15")).to.eql(false);
  });

  it('should find user/s stats by date', function() {
    let stat = 'flightsOfStairs';
    expect(activityRepo.getUserStat("2019/06/15", userOne, stat)).to.eql(16);

    stat = 'numSteps';
    expect(activityRepo.getUserStat("2019/06/15", userOne, stat)).to.eql(3577);

    stat = 'minutesActive';
    expect(activityRepo.getUserStat("2019/06/15", userOne, stat)).to.eql(140);
  });

  it('should find user/s stat totals by week', function() {
    let stat = 'flightsOfStairs';
    expect(activityRepo.getUserTotalsForWeek(userThree, "2019/06/15", userRepo, stat)).to.eql(398);

    stat = 'numSteps';
    expect(activityRepo.getUserTotalsForWeek(userThree, "2019/06/15", userRepo, stat)).to.eql(51814);

    stat = 'minutesActive';
    expect(activityRepo.getUserTotalsForWeek(userThree, "2019/06/15", userRepo, stat)).to.eql(812);
  });

  it('should find average activity stats for all users on a given day', function() {
    let stat = 'flightsOfStairs';
    expect(activityRepo.getAllUserAverageByDate("2019/06/15", stat)).to.eql(19.67);

    stat = 'numSteps';
    expect(activityRepo.getAllUserAverageByDate("2019/06/15", stat)).to.eql(5091);

    stat = 'minutesActive';
    expect(activityRepo.getAllUserAverageByDate("2019/06/15", stat)).to.eql(131.33);
  });


  //The methods below are not currently displayed on UI but should be considered for
  //future iterations

  it('should return all days that a given user exceeded their step goal', function() {
    expect(activityRepo.getDaysGoalExceeded(userThree, userRepo)).to.eql([
      '2019/06/15',
      '2019/06/14',
      '2019/06/13',
      '2019/06/12',
      '2019/06/11',
      '2019/06/10',
      '2019/06/09'
    ]);
  });

  it('should return user/s record for flights of stairs climbed in a day', function() {
    expect(activityRepo.getStairRecord(userOne)).to.eql(16);
    expect(activityRepo.getStairRecord(userThree)).to.eql(200);
  });

  //END future iteration suggestions

});





//START FRIENDS STEP CHALLENGE HERE

describe.only('Friend Activity', function() {
  let activityRepo;
  let user1;
  let user2;
  let user3;
  let user4;
  let user5;
  let users;
  let userRepo;

  beforeEach(function() {
    userRepo = new UserRepo(fakeUserData2);
    user1 = userRepo.users[0];
    user2 = userRepo.users[1];
    user3 = userRepo.users[2];
    user4 = userRepo.users[3];
    user5 = userRepo.users[4];
    activityRepo = new Activity(fakeActivityData2);
  });

  it('should get a users friend lists activity', function() {
    const a = fakeActivityData2
    expect(activityRepo.getFriendsActivity(user3, userRepo)).to.deep.equal([a[1],
       a[6], a[11], a[3], a[8], a[13], a[4], a[9], a[14], a[2], a[7], a[12]]);
  });

  it('should show total steps for friends for the week', function() {
    activityRepo = new Activity(fakeActivityData3);
    let friendsTotal = [{id: 5, totalSteps: 53729}, {id: 1, totalSteps: 65341},
      {id: 3, totalSteps: 54567}, {id: 4, totalSteps: 61072}]
    expect(activityRepo.totalFriendsStepCount(user4, "2019/06/22", userRepo)).to.deep.equal(friendsTotal);
  });

  it('should be able to get names for friends', function() {
    activityRepo = new Activity(fakeActivityData3);
    let friendsTotal = [{id: 5, name: 'Erick Schaden', totalSteps: 53729},
    {id: 1, name: 'Luisa Hane', totalSteps: 65341}, {id: 3, name: 'Herminia Witting', totalSteps: 54567},
     {id: 4, name: 'Mae Connelly', totalSteps: 61072}]
    expect(activityRepo.friendsStepsWithNames(user4, '2019/06/22', userRepo)).to.deep.equal(friendsTotal);
  });

  it('should organize friends from winner to loser', function() {
    activityRepo = new Activity(fakeActivityData3);
    let friendsTotal = [{id: 1, name: 'Luisa Hane', totalSteps: 65341},
    {id: 4, name: 'Mae Connelly', totalSteps: 61072}, {id: 3, name: 'Herminia Witting', totalSteps: 54567},
    {id: 5, name: 'Erick Schaden', totalSteps: 53729}]
    expect(activityRepo.friendsWeeklyRanking(user4, '2019/06/22', userRepo)).to.deep.equal(friendsTotal)
  });

  // END OF FRIEND TESTS BEWARE BELOW

  //START EXTENSION

  it('should find ranked list of friends', function() {
    expect(activityRepo.findRank(user4, "2019/06/15", userRepo)).to.eql([
      { id: 5, name: 'Erick Schaden', totalSteps: 11374, rank: 1 },
      { id: 1, name: 'Luisa Hane', totalSteps: 3577, rank: 2 },
      { id: 3, name: 'Herminia Witting', totalSteps: 1, rank: 3 }
    ])
  });

  it('should find 3-day increase in user steps', function() {
    expect(activityRepo.getStreak(userRepo, user3, 'numSteps')).to.eql([
      {
        userID: 3,
        date: '2019/06/17',
        numSteps: 3,
        minutesActive: 100,
        flightsOfStairs: 5
      },
      {
        userID: 3,
        date: '2019/06/16',
        numSteps: 2,
        minutesActive: 50,
        flightsOfStairs: 8
      },
      {
        userID: 3,
        date: '2019/06/15',
        numSteps: 1,
        minutesActive: 20,
        flightsOfStairs: 33
      }
    ]);
  });


});
