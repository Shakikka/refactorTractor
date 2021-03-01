// import sleepData from './data/sleep';

class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }

  calculateAverage(id, key) {
    let dailyValues = this.sleepData.filter((userData) => id === userData.userID);
    let totalValue = dailyValues.reduce((total, userData) => total += userData[key], 0)
    let averageValue = totalValue / dailyValues.length
    return averageValue
  }

  findInfoForDate(id, date, key) {
    let infoForDate = this.sleepData.find((userData) => id === userData.userID && date === userData.date);
    return infoForDate[key];
  }

  calculateWeekSleep(date, id, userRepo, sleepData) {
    return userRepo.findWeekOfData(date, id, sleepData).map((data) => {
      return `${data.date}: hours: ${data.hoursSlept}, quality: ${data.sleepQuality}`
    })
  }


  averageOfAllUsers(dataToAverage, key) {
    const completeData = dataToAverage.reduce((totalData, usersInfo) => {
      totalData += usersInfo[key];
      return totalData;
    }, 0)
    return completeData / dataToAverage.length
  }

  // ITERATION 3 BREAK
  // determineBestSleepers(date, userRepo) {
  //   let timeline = userRepo.chooseWeekDataForAllUsers(this.sleepData, date);
  //   let userSleepObject = userRepo.isolateUsernameAndRelevantData(this.sleepData, date, 'sleepQuality', timeline);
  //
  //   return Object.keys(userSleepObject).filter(function(key) {
  //     return (userSleepObject[key].reduce(function(sumSoFar, sleepQualityValue) {
  //       sumSoFar += sleepQualityValue
  //       return sumSoFar;
  //     }, 0) / userSleepObject[key].length) > 3
  //   }).map(function(sleeper) {
  //     return userRepo.getDataFromID(parseInt(sleeper)).name;
  //   })
  // }
  // determineSleepWinnerForWeek(date, userRepo) {
  //   let timeline = userRepo.chooseWeekDataForAllUsers(this.sleepData, date);
  //   let sleepRankWithData = userRepo.combineRankedUserIDsAndAveragedData(this.sleepData, date, 'sleepQuality', timeline);
  //
  //   return this.getWinnerNamesFromList(sleepRankWithData, userRepo);
  // }
  
  mostHoursSlept(date, userRepo, dataSet) {
    let timeline = userRepo.chooseDayDataForAllUsers(dataSet, date);
    let sortedTimeline = timeline.sort((a, b) => b.hoursSlept - a.hoursSlept)
    let winner = sortedTimeline[0]
    let winners = sortedTimeline.filter(person => winner.hoursSlept === person.hoursSlept)
    let trueWinners = winners.map(person => {
      return userRepo.users.find(user => person.userID === user.id)
    })
    return trueWinners
  }

  // getWinnerNamesFromList(sortedArray, userRepo) {
  //   let bestSleepers = sortedArray.filter(function(element) {
  //     return element[Object.keys(element)] === Object.values(sortedArray[0])[0]
  //   });
  //
  //   let bestSleeperIds = bestSleepers.map(function(bestSleeper) {
  //     return (Object.keys(bestSleeper));
  //   });
  //
  //   return bestSleeperIds.map(function(sleepNumber) {
  //     return userRepo.getDataFromID(parseInt(sleepNumber)).name;
  //   });
  // }
}


export default Sleep;
