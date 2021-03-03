class Activity {
  constructor(activityData) {
    this.activityData = activityData;
  };

  calculateMilesWalked(user, date) {
    let foundUser = this.activityData.find(data => user.id === data.userID && date === data.date);
    let userSteps = foundUser.numSteps;
    let stepsNeededforOneMile = 5280 / user.strideLength;
    let milesTraveled = (userSteps / stepsNeededforOneMile).toFixed(2);
    return Number(milesTraveled);
  };

  findMinutesActiveAverage(user, date, userRepo) {
    let foundWeek = userRepo.findWeekOfData(date, user.id, this.activityData);
    return (foundWeek.reduce((totalMinutes, day) => {
      return totalMinutes + day.minutesActive
    }, 0)) / 7;
  };

  accomplishStepGoal(user, date) {
    let foundActivityByDate = this.activityData.find(activity => activity.userID === user.id && activity.date === date);
    if (foundActivityByDate.numSteps >= user.dailyStepGoal) {
      return true;
    } else {
      return false;
    }
  };

  getUserStat(date, user, stat) {
    let activityByDate = this.activityData.find(activity => activity.date === date && activity.userID === user.id);
    return activityByDate[stat];
  };

  getUserTotalsForWeek(user, date, userRepo, stat) {
    let userWeek = userRepo.findWeekOfData(date, user.id, this.activityData);
    let statTotal = userWeek.reduce((accu, current) => {
      accu = accu + current[stat];
      return accu;
    }, 0);
    return statTotal;
  };

  getAllUserAverageByDate(date, stat) {
    let activitiesByDate = this.activityData.filter(activity => activity.date === date);

    let average = (activitiesByDate.reduce((accu, current) => {
      accu = accu + current[stat];
      return accu;
    }, 0) / activitiesByDate.length);

    return Number(average.toFixed(2));
  };

  //The methods below are not currently displayed on UI but should be considered for
  //future iterations

  getDaysGoalExceeded(user, userRepo) {
    let sortedArray = userRepo.makeSortedUserArray(user.id, this.activityData);
    return sortedArray.filter(data => user.id === data.userID && data.numSteps >= user.dailyStepGoal).map(data => data.date);
  };

  getStairRecord(user) {
    let userActivities = this.activityData.filter(data => user.id === data.userID);
    let sortedStairCount = userActivities.sort((a, b) => b.flightsOfStairs - a.flightsOfStairs);
    return sortedStairCount[0].flightsOfStairs;
    };

//END future iteration suggestions






  // Friends

  getFriendsActivity(user, userRepo) {
    let data = this.activityData;
    let userDatalist = user.friends.map(friend => {
      return userRepo.getDataFromUserID(friend, data)
    });
    return userDatalist.reduce((allFriendData, friendData) => {
      return allFriendData.concat(friendData);
    }, []);
  }

  totalFriendsStepCount(user, date, userRepo) {
    let friendsActivity = this.getFriendsActivity(user, userRepo);
    let friendSteps = user.friends.map((friend) => {
      let friendly = friendsActivity.filter(activity => activity.userID === friend)
      let friendStepWeek = userRepo.findWeekOfData(date, friend, friendly);
      let totalSteps = friendStepWeek.reduce((totalFriendSteps, day) => {
        return totalFriendSteps += day.numSteps
      }, 0)
      return ({id: friend, totalSteps})
    })
    return friendSteps
  }

  friendsStepsWithNames(user, date, userRepo) {
    let friendsStepsWithID = this.totalFriendsStepCount(user, date, userRepo)
    return friendsStepsWithID.map(({id, totalSteps}) => {
      let user = userRepo.findUserData(id)
      return ({id, name: user.name , totalSteps})
    })
  }

  friendsWeeklyRanking(user, date, userRepo) {
    let friends = this.friendsStepsWithNames(user, date, userRepo);
    let winnerFirst = friends.sort((a, b) => b.totalSteps - a.totalSteps);
    return winnerFirst
  }

  // FOR FUTURE EXTENSIONS

  findRank(user, date, userRepo) {
    let winnerFirst = this.friendsWeeklyRanking(user, date, userRepo);

    let rankedList = winnerFirst.reduce((list, friend, i) => {
      friend['rank'] = i + 1;
      list.push(friend)
      return list
    }, []);
    return rankedList;
  };

  getStreak(userRepo, user) {
    let sortedArray = userRepo.makeSortedUserArray(user.id, this.activityData);

    let streaks = sortedArray.reduce((list, currentActivity, i) => {
      if (sortedArray.indexOf(currentActivity) !== sortedArray.length - 1) {
        if (currentActivity.numSteps > sortedArray[i + 1].numSteps) {
          list.push(currentActivity);
          list.push(sortedArray[i + 1])
        }
      }
      return list
    }, []);

    let filteredStreaks = streaks.reduce((list, currentActivity) => {
      if (!list.includes(currentActivity)) {
        list.push(currentActivity)
      }
      return list
    }, []);

  return filteredStreaks;

  }

}



export default Activity;
