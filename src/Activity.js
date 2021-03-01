class Activity {
  constructor(activityData) {
    this.activityData = activityData;
  };

  calculateMilesWalked(user, date, userRepo) {
    let foundUser = this.activityData.find(data => user.id === data.userID && date === data.date);
    let userSteps = foundUser.numSteps;
    let stepsNeededforOneMile = 5280 / user.strideLength;
    let milesTraveled = (userSteps / stepsNeededforOneMile).toFixed(2);
    return Number(milesTraveled);
  };

  findMinutesActive(user, date) {
    let userActivityByDate = this.activityData.find(activity => activity.userID === user.id && activity.date === date);
    return userActivityByDate.minutesActive;
  };

  findMinutesActiveAverage(user, date, userRepo) {
    let foundWeek = userRepo.findWeekOfData(date, user.id, this.activityData);
    return (foundWeek.reduce((totalMinutes, day) => {
      return totalMinutes + day.minutesActive
    }, 0)) / 7;
  };

  accomplishStepGoal(user, date, userRepo) {
    let foundActivityByDate = this.activityData.find(activity => activity.userID === user.id && activity.date === date);
    if (foundActivityByDate.numSteps >= user.dailyStepGoal) {
      return true;
    } else {
      return false;
    }
  };

  //Below is not required to display on UI ????

  getDaysGoalExceeded(user, userRepo) {
    let sortedArray = userRepo.makeSortedUserArray(user.id, this.activityData);
    return sortedArray.filter(data => user.id === data.userID && data.numSteps >= user.dailyStepGoal).map(data => data.date);
  };

  getStairRecord(user) {
    let userActivities = this.activityData.filter(data => user.id === data.userID);
    let sortedStairCount = userActivities.sort((a, b) => b.flightsOfStairs - a.flightsOfStairs);
    return sortedStairCount[0].flightsOfStairs;
    };

  //


  getAllUserAverageForDay(date, userRepo, relevantData) {
    let selectedDayData = userRepo.chooseDayDataForAllUsers(this.activityData, date);
    return parseFloat((selectedDayData.reduce((acc, elem) => acc += elem[relevantData], 0) / selectedDayData.length).toFixed(1));
  }
  userDataForToday(id, date, userRepo, relevantData) {
    let userData = userRepo.getDataFromUserID(id, this.activityData);
    return userData.find(data => data.date === date)[relevantData];
  }
  userDataForWeek(id, date, userRepo, releventData) {
    return userRepo.getWeekFromDate(date, id, this.activityData).map((data) => `${data.date}: ${data[releventData]}`);
  }

  // Friends

  getFriendsActivity(user, userRepo) {
    let data = this.activityData;
    let userDatalist = user.friends.map(function(friend) {
      return userRepo.getDataFromUserID(friend, data)
    });
    return userDatalist.reduce(function(arraySoFar, listItem) {
      return arraySoFar.concat(listItem);
    }, []);
  }
  getFriendsAverageStepsForWeek(user, date, userRepo) {
    let friendsActivity = this.getFriendsActivity(user, userRepo);
    let timeline = userRepo.chooseWeekDataForAllUsers(friendsActivity, date);
    return userRepo.combineRankedUserIDsAndAveragedData(friendsActivity, date, 'numSteps', timeline)
  }
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
