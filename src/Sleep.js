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

}

export default Sleep;