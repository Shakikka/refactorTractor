import './css/base.scss';

import './images/person walking on path.jpg';
import './images/The Rock.jpg';

import {
  sleepDataAPI,
  userDataAPI,
  hydrationDataAPI,
  activityDataAPI,
  sleepDataPost,
  hydrationDataPost,
  activityDataPost
} from './api.js'
// import userData from './data/users';
import hydrationData from './data/hydration';
import sleepData from './data/sleep';
import activityData from './data/activity';

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
const friendList = document.getElementById('friendList');
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

let activityRepo, randomUser, userRepo, sleepRepo, hydrationRepo; // may not need userRepo globally

function loadThisFirst() {
  Promise.all([sleepDataAPI, userDataAPI, activityDataAPI, hydrationDataAPI])
    .then((values) => {
      // let sleepRepo = new Sleep(values[0].sleepData);
      activityRepo = new Activity(values[2].activityData);
      // let today = makeToday(userRepo, userNowId, values[3].hydrationData);
      // let randomHistory = makeRandomDate(userRepo, userNowId, hydrationData);
      // historicalWeek.forEach(instance => instance.insertAdjacentHTML('afterBegin', `Week of ${randomHistory}`));
      // addHydrationInfo(userNowId, hydrationRepo, today, userRepo, randomHistory);
      // addSleepInfo(userNowId, sleepRepo, today, userRepo, randomHistory);
      // let winnerNow = makeWinnerID(activityRepo, userNow, today, userRepo);
      // addActivityInfo(userNowId, activityRepo, today, userRepo, randomHistory, userNow, winnerNow);
      // addFriendGameInfo(userNowId, activityRepo, userRepo, today, randomHistory, userNow);
      displayInfo(values[1].userData, values[3].hydrationData, values[0].sleepData)
    })
}

function displayInfo(userInfo, hydrationInfo, sleepInfo) {
  userRepo = new UserRepo(userInfo);
  randomUser = pickUser(userRepo);

  addInfoToSidebar(randomUser, userRepo);
  displayHydrationInfo(userRepo, randomUser.id, hydrationInfo);
  displaySleepInfo(userRepo, randomUser.id, sleepInfo);
}

function displayHydrationInfo(userInfo, id, hydrationInfo) {
  hydrationRepo = new Hydration(hydrationInfo);
  let today = makeToday(userInfo, id, hydrationRepo.hydrationData);
  console.log('Result of makeToday function called upon the hydrationData:', today);

  hydrationToday.insertAdjacentHTML('afterBegin', `<p>You drank</p><p><span
  class="number">${hydrationRepo.calculateDailyOunces(id, today)}</span></p><p>oz water today.</p>`);

  hydrationThisWeek.insertAdjacentHTML('afterBegin', makeHydrationHTML(id,
    hydrationRepo, userInfo, hydrationRepo.calculateFirstWeekOunces(userInfo, id)))
}

function displaySleepInfo(userInfo, id, sleepInfo) {
  sleepRepo = new Sleep(sleepInfo);
  let today = makeToday(userInfo, id, sleepRepo.sleepData);
  console.log('Result of makeToday function called upon the sleepData:', today);

  sleepToday.insertAdjacentHTML('afterBegin', `<p>You slept:</p><p><span
  class="number">${sleepRepo.calculateDailySleep(id, today)}</span></p><p> hours today.</p>
  <p>Quality of sleep: ${sleepRepo.calculateDailySleepQuality(id, today)}</p>`);

  let weeksHours = sleepRepo.calculateWeekSleep(today, id, userInfo);
  console.log(weeksHours);

  let weeksQuality = sleepRepo.calculateWeekSleepQuality(today, id, userInfo);
  console.log(weeksQuality);

  weeksHours.forEach(element => {
    sleepThisWeek.insertAdjacentHTML('afterBegin', `
      <li>${element} hours</li>
    `)
  })

  sleepThisWeek.innerHTML += `<li>QUALITY: PLACHEOLDER</li>`;

  allTimeSleep.innerHTML += `
    <p>All time average hours of sleep: ${sleepRepo.calculateAverageSleep(id)}</p>
    <p>All time average quality of sleep: ${sleepRepo.calculateAverageSleepQuality(id)}</p>
  `;
}

function pickUser(listRepo) {
  let randomUser = Math.floor(Math.random() * 50);
  return listRepo.findUserData(randomUser);
}

function addInfoToSidebar(user, userStorage) {
  sidebarName.innerText = user.name;
  headerText.innerText = `${user.getFirstName()}'s Activity Tracker`;
  stepGoalCard.innerText = `Your daily step goal is ${user.dailyStepGoal}.`
  avStepGoalCard.innerText = `The average daily step goal is ${userStorage.findAverageStepGoal()}`;
  userAddress.innerText = user.address;
  userEmail.innerText = user.email;
  userStridelength.innerText = `Your stridelength is ${user.strideLength} meters.`;
  friendList.insertAdjacentHTML('afterBegin', makeFriendHTML(user, userStorage))
};


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
  const sortedArray = userStorage.makeSortedUserArray(id, dataSet);
  // console.log(id)
  // console.log('sortedArray:', sortedArray);
  return sortedArray[0].date;
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

function makeHydrationHTML(id, hydrationInfo, userStorage, method) {
  return method.map(drinkData => `<li class="historical-list-listItem">${drinkData}oz</li>`).join('');
}

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

function addActivityInfo(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId) {
  userStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count:</p><p>You</><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'flightsOfStairs')}</span></p>`)
  avgStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count: </p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'flightsOfStairs')}</span></p>`)
  userStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>You</p><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'numSteps')}</span></p>`)
  avgStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'numSteps')}</span></p>`)
  userMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>You</p><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'minutesActive')}</span></p>`)
  avgMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'minutesActive')}</span></p>`)
  userStepsThisWeek.insertAdjacentHTML("afterBegin", makeStepsHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, "numSteps")));
  userStairsThisWeek.insertAdjacentHTML("afterBegin", makeStairsHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, "flightsOfStairs")));
  userMinutesThisWeek.insertAdjacentHTML("afterBegin", makeMinutesHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, "minutesActive")));
  bestUserSteps.insertAdjacentHTML("afterBegin", makeStepsHTML(user, activityInfo, userStorage, activityInfo.userDataForWeek(winnerId, dateString, userStorage, "numSteps")));
}

function makeStepsHTML(id, activityInfo, userStorage, method) {
  return method.map(activityData => `<li class="historical-list-listItem">On ${activityData} steps</li>`).join('');
}

function makeStairsHTML(id, activityInfo, userStorage, method) {
  return method.map(data => `<li class="historical-list-listItem">On ${data} flights</li>`).join('');
}

function makeMinutesHTML(id, activityInfo, userStorage, method) {
  return method.map(data => `<li class="historical-list-listItem">On ${data} minutes</li>`).join('');
}

function addFriendGameInfo(id, activityInfo, userStorage, dateString, laterDateString, user) {
  friendChallengeListToday.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
  streakList.insertAdjacentHTML("afterBegin", makeStepStreakHTML(id, activityInfo, userStorage, activityInfo.getStreak(userStorage, id, 'numSteps')));
  streakListMinutes.insertAdjacentHTML("afterBegin", makeStepStreakHTML(id, activityInfo, userStorage, activityInfo.getStreak(userStorage, id, 'minutesActive')));
  friendChallengeListHistory.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
  bigWinner.insertAdjacentHTML('afterBegin', `THIS WEEK'S WINNER! ${activityInfo.showcaseWinner(user, dateString, userStorage)} steps`)
}

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

function resetForm() {
  formInputs.forEach(ele => ele.value = '');
  userForms.forEach(ele => addClass(ele))
  addClass(submitFormButton)
}

function postFormEntry() {
  // const userID = ;
  const date = new Date().toISOString().replace(/-/g, "/").split("T")[0];

  switch (enterProgressDropdown.value) {
    case 'activity':
      // postActivityData(userID, date);
      break;
      // case 'hydration':
      //   postHydrationData(userID, date);
      //   break;
      // case 'sleep':
      //   postSleepData(userID, date);
      //   break;
  }
  resetForm();
  enterProgressDropdown.value = '';
}

function postActivityData(userID, date) {
  //check if date exist in activity data
  //if yes - alert saying data exists for this date already
  //if no - 
  //1. create object (relevant params) to pass into post request
  //2. run post request and pass in obect
  //3. add new data to local dataset (push to array or fetch and replace whole dataset?)
  //run dom updates based on new dataset (run whole dom update or just category specific?)
}

function postHydrationData(userID, date) {
  //
}

function postSleepData(userID, date) {
  //
}

///////event listeners
window.addEventListener('load', loadThisFirst)

enterProgressDropdown.addEventListener('change', function (event) {
  updateFormView(event)
})

submitFormButton.addEventListener('click', postFormEntry)