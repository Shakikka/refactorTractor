import './css/base.scss';

import './images/person walking on path.jpg';
import './images/The Rock.jpg';

import {
  sleepDataAPI,
  userDataAPI,
  hydrationDataAPI,
  activityDataAPI,
  postNewData
  // sleepDataPost,
  // hydrationDataPost,
  // activityDataPost
} from './api.js'
// import userData from './data/users';
// import hydrationData from './data/hydration';
// import sleepData from './data/sleep';
// import activityData from './data/activity';

import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import UserRepo from './User-repo';
import {
  fakeUserData,
  fakeHydrationData
} from './data/fakeData';

const sidebarName = document.getElementById('sidebarName');
const stepGoalCard = document.getElementById('stepGoalCard');
const headerText = document.querySelector('.header');
const userAddress = document.getElementById('userAddress');
const userEmail = document.getElementById('userEmail');
const userStridelength = document.getElementById('userStridelength');
const loserList = document.getElementById('loserList');
const hydrationToday = document.getElementById('hydrationToday');
const hydrationAverage = document.getElementById('hydrationAverage');
const hydrationThisWeek = document.getElementById('hydrationThisWeek');
const hydrationEarlierWeek = document.getElementById('hydrationEarlierWeek');
const historicalWeek = document.querySelectorAll('.historicalWeek');
const sleepToday = document.getElementById('sleepToday');
const sleepQualityToday = document.getElementById('sleepQualityToday');
const avUserSleepQuality = document.getElementById('avUserSleepQuality');
const sleepThisWeek = document.getElementById('sleepThisWeek');
const allTimeSleep = document.getElementById('allTimeSleep');
const friendChallengeListToday = document.getElementById('friendChallengeListToday');
const friendChallengeListHistory = document.getElementById('friendChallengeListHistory');
const bigWinner = document.getElementById('bigWinner');
const userStepsToday = document.getElementById('userStepsToday');
const avgStepsToday = document.getElementById('avgStepsToday');
const userStairsToday = document.getElementById('userStairsToday');
const avgStairsToday = document.getElementById('avgStairsToday');
const userMinutesToday = document.getElementById('userMinutesToday');
const avgMinutesToday = document.getElementById('avgMinutesToday');
const userStepsThisWeek = document.getElementById('userStepsThisWeek');
const userStairsThisWeek = document.getElementById('userStairsThisWeek');
const userMinutesThisWeek = document.getElementById('userMinutesThisWeek');
const bestUserSteps = document.getElementById('bestUserSteps');
const streakList = document.getElementById('streakList');
const streakListMinutes = document.getElementById('streakListMinutes')
const avStepGoalCard = document.getElementById('avStepGoalCard');
const enterProgressDropdown = document.querySelector('#enter-progress-dropdown');
const activityForm = document.querySelector('#activityForm');
const hydrationForm = document.querySelector('#hydrationForm');
const sleepForm = document.querySelector('#sleepForm');
const userForms = document.querySelectorAll('.user-form');
const formInputs = document.querySelectorAll('.form-input');
const submitFormButton = document.querySelector('#submitForm');
const userDistanceMiles = document.getElementById('userDistanceMiles');
const weeklyStepCount = document.getElementById('weeklyStepCount');
const userStepCountToday = document.getElementById('userStepCountToday');
const allStepCountToday = document.getElementById('allStepCountToday');
const userMinToday = document.getElementById('userMinToday');
const allMinutesToday = document.getElementById('allMinutesToday');
const userFlightsToday = document.getElementById('userFlightsToday');
const allFlightsToday = document.getElementById('allFlightsToday');

const activityFormSteps = document.querySelector('#activityFormSteps')
const activityFormMinutes = document.querySelector('#activityFormMinutes')
const activityFormStairs = document.querySelector('#activityFormStairs')
const hydrationFormOunces = document.querySelector('#hydrationFormOunces')
const sleepFormHours = document.querySelector('#sleepFormHours')
const sleepFormQuality = document.querySelector('#sleepFormQuality')


let activityRepo, randomUser, userRepo, sleepRepo, hydrationRepo; // may not need userRepo globally

////refactor notes/ideas
//no need to pass the userRepo or user into any function since they existsglobally
//create class instances early im loadThisFirst or displayInfo master function


function loadThisFirst() {
  Promise.all([sleepDataAPI, userDataAPI, activityDataAPI, hydrationDataAPI])
    .then((values) => {
      // let sleepRepo = new Sleep(values[0].sleepData);
      // let today = makeToday(userRepo, userNowId, values[3].hydrationData);
      // let randomHistory = makeRandomDate(userRepo, userNowId, hydrationData);
      // historicalWeek.forEach(instance => instance.insertAdjacentHTML('afterBegin', `Week of ${randomHistory}`));
      // addHydrationInfo(userNowId, hydrationRepo, today, userRepo, randomHistory);
      // addSleepInfo(userNowId, sleepRepo, today, userRepo, randomHistory);
      // let winnerNow = makeWinnerID(activityRepo, userNow, today, userRepo);
      // addActivityInfo(userNowId, activityRepo, today, userRepo, randomHistory, userNow, winnerNow);
      // addFriendGameInfo(userNowId, activityRepo, userRepo, today, randomHistory, userNow);
      displayInfo(values[1].userData, values[3].hydrationData, values[0].sleepData, values[2].activityData)
    })
}

function displayInfo(userInfo, hydrationInfo, sleepInfo, activityInfo) {
  userRepo = new UserRepo(userInfo);
  activityRepo = new Activity(activityInfo);
  hydrationRepo = new Hydration(hydrationInfo);
  sleepRepo = new Sleep(sleepInfo);
  randomUser = pickUser(userRepo);


  displayHydrationInfo(userRepo, randomUser.id);
  displaySleepInfo(userRepo, randomUser.id);
  displayActivityInfo(userRepo, randomUser.id)
  addInfoToSidebar(randomUser, userRepo);
}

// function 



function displayActivityInfo(userInfo, id) {
  // activityRepo = new Activity(activityInfo);
  let today = userInfo.getToday(id, activityRepo.activityData);
  populateStepChallenge(randomUser, userRepo)

  userStridelength.innerText = `Your stridelength is ${randomUser.strideLength} meters.`; //do we need to display this?
  stepGoalCard.innerText = `Your daily step goal is ${randomUser.dailyStepGoal} steps.`;
  avStepGoalCard.innerText = `The average daily step goal is ${userRepo.findAverageStepGoal()} steps.`;
  userStepsToday.innerText = `Step Count on most recent day: ${activityRepo.getUserStat(today, randomUser, 'numSteps')}`
  userMinutesToday.innerText = `Active Minutes on most recent day: ${activityRepo.getUserStat(today, randomUser, 'minutesActive')}`;
  userDistanceMiles.innerText = `Miles walked on recent day: ${activityRepo.calculateMilesWalked(randomUser, today)}`;
  ////table start
  userStepCountToday.innerText = activityRepo.getUserStat(today, randomUser, 'numSteps');
  allStepCountToday.innerText = activityRepo.getAllUserAverageByDate(today, 'numSteps');
  userMinToday.innerText = activityRepo.getUserStat(today, randomUser, 'minutesActive');
  allMinutesToday.innerText = activityRepo.getAllUserAverageByDate(today, 'minutesActive');
  userFlightsToday.innerText = activityRepo.getUserStat(today, randomUser, 'flightsOfStairs');
  allFlightsToday.innerText = activityRepo.getAllUserAverageByDate(today, 'flightsOfStairs');
  //bottom section
  weeklyStepCount.innerText = `Total steps this week: ${activityRepo.getUserTotalsForWeek(randomUser, today, userInfo, 'numSteps')}`;
  userStairsThisWeek.innerText = `Flights of stairs climbed this week: ${activityRepo.getUserTotalsForWeek(randomUser, today, userInfo, 'flightsOfStairs')}`;
  userMinutesThisWeek.innerText = `Minutes active this week: ${activityRepo.getUserTotalsForWeek(randomUser, today, userInfo, 'minutesActive')}`;
}


function displayHydrationInfo(userInfo, id) {
  // hydrationRepo = new Hydration(hydrationInfo);
  let today = userInfo.getToday(id, hydrationRepo.hydrationData);

  console.log('Result of makeToday function called upon the hydrationData:', today);

  hydrationToday.innerText = `You drank ${hydrationRepo.calculateDailyOunces(id, today)} oz of water today.`;

  hydrationThisWeek.innerHTML = ''

  let hydrationWeekData = hydrationRepo.calculateFirstWeekOunces(userInfo, id);
  console.log('sauce', hydrationWeekData)

  hydrationWeekData.forEach(day => {
    hydrationThisWeek.innerHTML +=
      `<li>${day}oz</li> `
  });

}

function displaySleepInfo(userInfo, id) {
  // sleepRepo = new Sleep(sleepInfo);
  let today = userInfo.getToday(id, sleepRepo.sleepData);

  console.log('Result of makeToday function called upon the sleepData:', today);

  sleepToday.innerText = `You slept ${sleepRepo.findInfoForDate(id, today, 'hoursSlept')} hours today.`
  sleepQualityToday.innerText = `Quality of sleep: ${sleepRepo.findInfoForDate(id, today, 'sleepQuality')}`;

  let weeksHours = sleepRepo.calculateWeekSleep(today, id, userInfo, sleepRepo.sleepData);
  console.log(weeksHours);

  let weeksQuality = sleepRepo.calculateWeekSleep(today, id, userInfo, sleepRepo.sleepData);
  console.log(weeksQuality);

  sleepThisWeek.innerHTML = '';

  weeksHours.forEach(element => {
    sleepThisWeek.innerHTML +=
      `<li>${element}</li>`
  })

  allTimeSleep.innerHTML = `
    <p>All time average hours of sleep: ${sleepRepo.calculateAverage(id, 'hoursSlept').toFixed(2)}</p>
    <p>All time average quality of sleep: ${sleepRepo.calculateAverage(id, 'sleepQuality').toFixed(2)}</p>
  `;
}

function pickUser(listRepo) {
  let randomUser = Math.floor(Math.random() * 50);
  return listRepo.findUserData(randomUser);
}



function addInfoToSidebar(user) {
  sidebarName.innerText = user.name;
  headerText.innerText = `${user.getFirstName()}'s Activity Tracker`;
  userAddress.innerText = user.address;
  userEmail.innerText = user.email;
  // friendList.insertAdjacentHTML('afterBegin', makeFriendHTML(user, userStorage))
};

function populateStepChallenge(user, userRepo) {
  const today = userRepo.getToday(user.id, activityRepo.activityData)
  let stepRank = activityRepo.friendsWeeklyRanking(user, today, userRepo)
  bigWinner.innerText = `${stepRank[0].name} is the WINNER with ${stepRank[0].totalSteps}steps!`
  const loserRank = stepRank.shift()
  populateLosers(stepRank);
}

function populateLosers(losers) {
  loserList.innerHTML = ''
  losers.forEach(loser => {
    loserList.innerHTML += `
    <li>${loser.name} had ${loser.totalSteps} steps!</li>
    `
  })

}

// function startApp() {
//   let userList = [];
//   makeUsers(userList);
//   let userRepo = new UserRepo(userList);
//   let hydrationRepo = new Hydration(hydrationData);
//   let sleepRepo = new Sleep(sleepData);
//   let activityRepo = new Activity(activityData);
//   const userNowId = pickUser();
//   let userNow = getUserById(userNowId, userRepo);
//   let today = makeToday(userRepo, userNowId, hydrationData);
//   let randomHistory = makeRandomDate(userRepo, userNowId, hydrationData);
//   historicalWeek.forEach(instance => instance.insertAdjacentHTML('afterBegin', `Week of ${randomHistory}`));
//   addInfoToSidebar(userNow, userRepo);
//   addHydrationInfo(userNowId, hydrationRepo, today, userRepo, randomHistory);
//   addSleepInfo(userNowId, sleepRepo, today, userRepo, randomHistory);
//   let winnerNow = makeWinnerID(activityRepo, userNow, today, userRepo);
//   addActivityInfo(userNowId, activityRepo, today, userRepo, randomHistory, userNow, winnerNow);
//   addFriendGameInfo(userNowId, activityRepo, userRepo, today, randomHistory, userNow);
// }

function makeFriendHTML(user, userStorage) {
  return user.getFriendsNames(userStorage).map(friendName => `<li class='historical-list-listItem'>${friendName}</li>`).join('');
}

function makeWinnerID(activityInfo, user, dateString, userStorage) {
  return activityInfo.getWinnerId(user, dateString, userStorage)
}

function makeToday(userStorage, id, dataSet) {
  return userStorage.getToday()

}

function makeHydrationHTML(id, hydrationInfo, userStorage, method) {
  return method.map(drinkData => `<li class="historical-list-listItem">${drinkData}oz</li>`).join('');
}

function makeRandomDate(userStorage, id, dataSet) {
  const sortedArray = userStorage.makeSortedUserArray(id, dataSet);
  return sortedArray[Math.floor(Math.random() * sortedArray.length + 1)].date

}

// function addHydrationInfo(id, hydrationInfo, dateString, userStorage, laterDateString) {
//   hydrationToday.insertAdjacentHTML('afterBegin', `<p>You drank</p><p><span class="number">${hydrationInfo.calculateDailyOunces(id, dateString)}</span></p><p>oz water today.</p>`);
//   hydrationAverage.insertAdjacentHTML('afterBegin', `<p>Your average water intake is</p><p><span class="number">${hydrationInfo.calculateAverageOunces(id)}</span></p> <p>oz per day.</p>`)
//   hydrationThisWeek.insertAdjacentHTML('afterBegin', makeHydrationHTML(id, hydrationInfo, userStorage, hydrationInfo.calculateFirstWeekOunces(userStorage, id)));
//   hydrationEarlierWeek.insertAdjacentHTML('afterBegin', makeHydrationHTML(id, hydrationInfo, userStorage, hydrationInfo.calculateRandomWeekOunces(laterDateString, id, userStorage)));
// }



// function addSleepInfo(id, sleepInfo, dateString, userStorage, laterDateString) {
//   sleepToday.insertAdjacentHTML("afterBegin", `<p>You slept</p> <p><span class="number">${sleepInfo.calculateDailySleep(id, dateString)}</span></p> <p>hours today.</p>`);
//   sleepQualityToday.insertAdjacentHTML("afterBegin", `<p>Your sleep quality was</p> <p><span class="number">${sleepInfo.calculateDailySleepQuality(id, dateString)}</span></p><p>out of 5.</p>`);
//   avUserSleepQuality.insertAdjacentHTML("afterBegin", `<p>The average user's sleep quality is</p> <p><span class="number">${Math.round(sleepInfo.calculateAllUserSleepQuality() *100)/100}</span></p><p>out of 5.</p>`);
//   sleepThisWeek.insertAdjacentHTML('afterBegin', makeSleepHTML(id, sleepInfo, userStorage, sleepInfo.calculateWeekSleep(dateString, id, userStorage)));
//   sleepEarlierWeek.insertAdjacentHTML('afterBegin', makeSleepHTML(id, sleepInfo, userStorage, sleepInfo.calculateWeekSleep(laterDateString, id, userStorage)));
// }

// function makeSleepHTML(id, sleepInfo, userStorage, method) {
//   return method.map(sleepData => `<li class="historical-list-listItem">On ${sleepData} hours</li>`).join('');
// }
//
// function makeSleepQualityHTML(id, sleepInfo, userStorage, method) {
//   return method.map(sleepQualityData => `<li class="historical-list-listItem">On ${sleepQualityData}/5 quality of sleep</li>`).join('');
// }

// function addActivityInfo(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId) {
//   userStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count:</p><p>You</><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'flightsOfStairs')}</span></p>`)
//   avgStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count: </p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'flightsOfStairs')}</span></p>`)
//   userStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>You</p><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'numSteps')}</span></p>`)
//   avgStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'numSteps')}</span></p>`)
//   userMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>You</p><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'minutesActive')}</span></p>`)
//   avgMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'minutesActive')}</span></p>`)
//   userStairsThisWeek.insertAdjacentHTML("afterBegin", makeStairsHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, "flightsOfStairs")));
//   userMinutesThisWeek.insertAdjacentHTML("afterBegin", makeMinutesHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, "minutesActive")));
//   bestUserSteps.insertAdjacentHTML("afterBegin", makeStepsHTML(user, activityInfo, userStorage, activityInfo.userDataForWeek(winnerId, dateString, userStorage, "numSteps")));
// }

function makeStepsHTML(id, activityInfo, userStorage, method) {
  return method.map(activityData => `<li class="historical-list-listItem">On ${activityData} steps</li>`).join('');
}

function makeStairsHTML(id, activityInfo, userStorage, method) {
  return method.map(data => `<li class="historical-list-listItem">On ${data} flights</li>`).join('');
}

function makeMinutesHTML(id, activityInfo, userStorage, method) {
  return method.map(data => `<li class="historical-list-listItem">On ${data} minutes</li>`).join('');
}

// function addFriendGameInfo(id, activityInfo, userStorage, dateString, laterDateString, user) {
//   friendChallengeListToday.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
//   streakList.insertAdjacentHTML("afterBegin", makeStepStreakHTML(id, activityInfo, userStorage, activityInfo.getStreak(userStorage, id, 'numSteps')));
//   streakListMinutes.insertAdjacentHTML("afterBegin", makeStepStreakHTML(id, activityInfo, userStorage, activityInfo.getStreak(userStorage, id, 'minutesActive')));
//   friendChallengeListHistory.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
//   bigWinner.insertAdjacentHTML('afterBegin', `THIS WEEK'S WINNER! ${activityInfo.showcaseWinner(user, dateString, userStorage)} steps`)
// }

function makeFriendChallengeHTML(id, activityInfo, userStorage, method) {
  return method.map(friendChallengeData => `<li class="historical-list-listItem">Your friend ${friendChallengeData} average steps.</li>`).join('');
}

function makeStepStreakHTML(id, activityInfo, userStorage, method) {
  return method.map(streakData => `<li class="historical-list-listItem">${streakData}!</li>`).join('');
}
// startApp();
const addClass = (element, className) => {
  element.classList.add(className || "hidden");
};

const removeClass = (element, className) => {
  element.classList.remove(className || "hidden");
};
///////form and post functionality
function updateFormView(event) {
  resetForm()
  switch (event.target.value) {
    case 'activity':
      removeClass(activityForm);
      removeClass(submitFormButton);
      break;
    case 'hydration':
      removeClass(hydrationForm);
      removeClass(submitFormButton);
      break;
    case 'sleep':
      removeClass(sleepForm);
      removeClass(submitFormButton);
      break;
  }
}

function resetForm(dropdownStatus) {
  formInputs.forEach(ele => ele.value = '');
  userForms.forEach(ele => addClass(ele))
  addClass(submitFormButton)
  if (dropdownStatus === 'hide') {
    enterProgressDropdown.value = '';
  }
}

function postFormEntry() {
  const userID = randomUser.id;
  const date = new Date().toISOString().replace(/-/g, "/").split("T")[0];

  switch (enterProgressDropdown.value) {
    case 'activity':
      postActivityData(userID, date);
      break;
    case 'hydration':
      postHydrationData(userID, date);
      break;
    case 'sleep':
      postSleepData(userID, date);
      break;
  }
}

function checkForEmptyFields(category) {
  switch (category) {
    case 'activity':
      return activityFormSteps.value === "" || activityFormMinutes.value === "" || activityFormStairs.value === "";
    case 'hydration':
      return hydrationFormOunces.value === "";
    case 'sleep':
      return sleepFormHours.value === "" || sleepFormQuality.value === "";
  }
}

const checkForError = response => {
  if (!response.ok) {
    throw new Error('An error has been encountered. Please try again.');
  } else {
    return response.json();
  }
}

function postActivityData(userID, date) {

  if (checkForEmptyFields('activity')) {
    return alert('Please fill in all fields before submitting')
  } else if (activityRepo.activityData.find(data => data.userID === userID && data.date === date)) {
    resetForm('hide');
    return alert('Data exists for this date already')
  }

  const postData = {
    'userID': userID,
    'date': date,
    'numSteps': parseInt(activityFormSteps.value),
    'minutesActive': parseInt(activityFormMinutes.value),
    'flightsOfStairs': parseInt(activityFormStairs.value)
  }
  postNewData('activity', postData)
    .then(checkForError)
    .then(json => {
      activityRepo.activityData.push(json);
      // displayActivityInfo(userRepo, randomUser.id)
    })
    .catch(err => alert(err))

  resetForm('hide');

  //run dom updates based on new dataset (run whole dom update or just category specific?)
}

function postHydrationData(userID, date) {

  if (checkForEmptyFields('hydration')) {
    return alert('Please fill in all fields before submitting')
  } else if (hydrationRepo.hydrationData.find(data => data.userID === userID && data.date === date)) {
    resetForm('hide');
    return alert('Data exists for this date already')
  }

  const postData = {
    'userID': userID,
    'date': date,
    'numOunces': parseInt(hydrationFormOunces.value)
  }

  postNewData('hydration', postData)
    .then(checkForError)
    .then(json => {
      hydrationRepo.hydrationData.push(json)
      displayHydrationInfo(userRepo, randomUser.id);
    })
    .catch(err => alert(err))

  resetForm('hide');

  //run dom updates based on new dataset (run whole dom update or just category specific?)
}

function postSleepData(userID, date) {

  if (checkForEmptyFields('sleep')) {
    return alert('Please fill in all fields before submitting')
  } else if (sleepRepo.sleepData.find(data => data.userID === userID && data.date === date)) {
    resetForm('hide');
    return alert('Data exists for this date already')
  }

  const postData = {
    'userID': userID,
    'date': date,
    'hoursSlept': parseInt(sleepFormHours.value),
    'sleepQuality': parseInt(sleepFormQuality.value)
  }

  postNewData('sleep', postData)
    .then(checkForError)
    .then(json => {
      sleepRepo.sleepData.push(json)
      displaySleepInfo(userRepo, randomUser.id);
    })
    .catch(err => alert(err))

  resetForm('hide');

  //run dom updates based on new dataset (run whole dom update or just category specific?)
}

///////event listeners
window.addEventListener('load', loadThisFirst)

enterProgressDropdown.addEventListener('change', function (event) {
  updateFormView(event)
})


submitFormButton.addEventListener('click', postFormEntry)