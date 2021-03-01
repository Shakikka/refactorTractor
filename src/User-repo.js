import User from '../src/User';

class UserRepo {
  constructor(users) {
    this.users;
    this.createUsers(users);
  }

  createUsers(users) {
    this.users = users.map(user => new User(user));
  }

  findUserData(id) {
    return this.users.find((user) => id === user.id);
  }

  getDataFromUserID(id, dataSet) {
    return dataSet.filter((userData) => id === userData.userID);
  }

  findAverageStepGoal() {
    let totalStepGoal = this.users.reduce((sum, user) => {
      return sum = sum + user.dailyStepGoal;
    }, 0);
    return totalStepGoal / this.users.length;
  }

  makeSortedUserArray(id, dataSet) {
    let selectedID = this.getDataFromUserID(id, dataSet)
    let sortByDate = selectedID.sort((a, b) => new Date(b.date) - new Date(a.date));
    return sortByDate;
  }

  getToday(id, dataSet) {
    return this.makeSortedUserArray(id, dataSet)[0].date;
  }

  getFirstWeek(id, dataSet) {
    return this.makeSortedUserArray(id, dataSet).slice(0, 7);
  }

  findWeekOfData(date, id, dataSet) {
    let organizedData = this.makeSortedUserArray(id, dataSet)
    let foundDate = organizedData.find(sortedItem => sortedItem.date === date);
    let dateIndex = organizedData.indexOf(foundDate);
    let foundWeek = organizedData.slice(dateIndex, dateIndex + 7)
    return foundWeek
  }

  chooseDayDataForAllUsers(dataSet, date) {
    return dataSet.filter(dataItem => dataItem.date === date)
  }
}

  // HARD STOP

//   isolateUsernameAndRelevantData(dataSet, date, relevantData, listFromMethod) {
//     return listFromMethod.reduce(function(objectSoFar, dataItem) {
//       if (!objectSoFar[dataItem.userID]) {
//         objectSoFar[dataItem.userID] = [dataItem[relevantData]]
//       } else {
//         objectSoFar[dataItem.userID].push(dataItem[relevantData])
//       }
//       return objectSoFar;
//     }, {});
//   }
//
//   rankUserIDsbyRelevantDataValue(dataSet, date, relevantData, listFromMethod) {
//     let sortedObjectKeys = this.isolateUsernameAndRelevantData(dataSet, date, relevantData, listFromMethod)
//     return Object.keys(sortedObjectKeys).sort(function(b, a) {
//       return (sortedObjectKeys[a].reduce(function(sumSoFar, sleepQualityValue) {
//         sumSoFar += sleepQualityValue
//         return sumSoFar;
//       }, 0) / sortedObjectKeys[a].length) - (sortedObjectKeys[b].reduce(function(sumSoFar, sleepQualityValue) {
//         sumSoFar += sleepQualityValue
//         return sumSoFar;
//       }, 0) / sortedObjectKeys[b].length)
//     });
//   }
//
//   combineRankedUserIDsAndAveragedData(dataSet, date, relevantData, listFromMethod) {
//     let sortedObjectKeys = this.isolateUsernameAndRelevantData(dataSet, date, relevantData, listFromMethod)
//     let rankedUsersAndAverages = this.rankUserIDsbyRelevantDataValue(dataSet, date, relevantData, listFromMethod)
//     return rankedUsersAndAverages.map(function(rankedUser) {
//       rankedUser = {
//         [rankedUser]: sortedObjectKeys[rankedUser].reduce(
//           function(sumSoFar, sleepQualityValue) {
//             sumSoFar += sleepQualityValue
//             return sumSoFar;
//           }, 0) / sortedObjectKeys[rankedUser].length
//       };
//       return rankedUser;
//     });
//   }
// }

export default UserRepo;
