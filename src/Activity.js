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
    let friends = friendsStepsWithNames(user, date, userRepo)
    let winnerFirst = friends.sort((a, b) => a.totalSteps - b.totalSteps)
    console.log('winners', winnerFirst);
  }
  // getFriendsAverageStepsForWeek(user, date, userRepo) {
  //   let friendsActivity = this.getFriendsActivity(user, userRepo);
  //   let timeline = userRepo.chooseWeekDataForAllUsers(friendsActivity, date);
  //   return userRepo.combineRankedUserIDsAndAveragedData(friendsActivity, date, 'numSteps', timeline)
  // }

  showChallengeListAndWinner(user, date, userRepo) {
    let rankedList = this.getFriendsAverageStepsForWeek(user, date, userRepo);

    return rankedList.map(function(listItem) {
      let userID = Object.keys(listItem)[0];
      let userName = userRepo.getDataFromID(parseInt(userID)).name;
      return `${userName}: ${listItem[userID]}`
    })
  }
  showcaseWinner(user, date, userRepo) {
    let namedList = this.showChallengeListAndWinner(user, date, userRepo);
    let winner = this.showChallengeListAndWinner(user, date, userRepo).shift();
    return winner;
  }
  getStreak(userRepo, id, relevantData) {
    let data = this.activityData;
    let sortedUserArray = (userRepo.makeSortedUserArray(id, data)).reverse();
    let streaks = sortedUserArray.filter(function(element, index) {
      if (index >= 2) {
        return (sortedUserArray[index - 2][relevantData] < sortedUserArray[index - 1][relevantData] && sortedUserArray[index - 1][relevantData] < sortedUserArray[index][relevantData])
      }
    });
    return streaks.map(function(streak) {
      return streak.date;
    })
  }
  getWinnerId(user, date, userRepo) {
    let rankedList = this.getFriendsAverageStepsForWeek(user, date, userRepo);
    let keysList = rankedList.map(listItem => Object.keys(listItem));
    return parseInt(keysList[0].join(''))
  }
}



export default Activity;
