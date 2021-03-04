import './css/base.scss';
import './images/person walking on path.jpg';
import './images/The Rock.jpg';
import {
  sleepDataAPI,
  userDataAPI,
  hydrationDataAPI,
  activityDataAPI,
  postNewData
} from './api.js'

import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import UserRepo from './User-repo';

const sidebarName = document.getElementById('sidebarName');
const stepGoalCard = document.getElementById('stepGoalCard');
const headerText = document.querySelector('.header');
const userAddress = document.getElementById('userAddress');
const userEmail = document.getElementById('userEmail');
const userStridelength = document.getElementById('userStridelength');
const loserList = document.getElementById('loserList');
const hydrationToday = document.getElementById('hydrationToday');
const hydrationThisWeek = document.getElementById('hydrationThisWeek');
const sleepToday = document.getElementById('sleepToday');
const sleepQualityToday = document.getElementById('sleepQualityToday');
const sleepThisWeek = document.getElementById('sleepThisWeek');
const allTimeSleep = document.getElementById('allTimeSleep');
const bigWinner = document.getElementById('bigWinner');
const userStepsToday = document.getElementById('userStepsToday');
const userMinutesToday = document.getElementById('userMinutesToday');
const userStairsThisWeek = document.getElementById('userStairsThisWeek');
const userMinutesThisWeek = document.getElementById('userMinutesThisWeek');
const streakList = document.getElementById('streakList');
const streakMessage = document.getElementById('streakMessage')
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

let activityRepo, randomUser, userRepo, sleepRepo, hydrationRepo;


function loadThisFirst() {
  Promise.all([sleepDataAPI, userDataAPI, activityDataAPI, hydrationDataAPI])
    .then((values) => {
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
  displayActivityInfo(userRepo, randomUser.id);
  addInfoToSidebar(randomUser, userRepo);
}

function displayActivityInfo(userInfo, id) {
  let today = userInfo.getToday(id, activityRepo.activityData);
  populateStepChallenge(randomUser, userRepo);
  displayUserStats(today);
  displayTable(today);
  displayWeeklyStats(today, userInfo)
  displayStreakList(userInfo);
}

function displayUserStats(today) {
  userStridelength.innerText = `Your stridelength is: ${randomUser.strideLength} meters`;
  stepGoalCard.innerText = `Your daily step goal is: ${randomUser.dailyStepGoal} steps`;
  avStepGoalCard.innerText = `The average daily step goal is: ${userRepo.findAverageStepGoal()} steps`;
  userStepsToday.innerText = `Today you have taken: ${activityRepo.getUserStat(today, randomUser, 'numSteps')} steps`
  userMinutesToday.innerText = `Today you have been active for: ${activityRepo.getUserStat(today, randomUser, 'minutesActive')} minutes`;
  userDistanceMiles.innerText = `Today you have walked: ${activityRepo.calculateMilesWalked(randomUser, today)} miles`;
}

function displayTable(today) {
  userStepCountToday.innerText = activityRepo.getUserStat(today, randomUser, 'numSteps');
  userMinToday.innerText = activityRepo.getUserStat(today, randomUser, 'minutesActive');
  userFlightsToday.innerText = activityRepo.getUserStat(today, randomUser, 'flightsOfStairs');
  allStepCountToday.innerText = activityRepo.getAllUserAverageByDate(today, 'numSteps');
  allMinutesToday.innerText = activityRepo.getAllUserAverageByDate(today, 'minutesActive');
  allFlightsToday.innerText = activityRepo.getAllUserAverageByDate(today, 'flightsOfStairs');
}

function displayWeeklyStats(today, userInfo) {
  weeklyStepCount.innerText = `Total steps this week: ${activityRepo.getUserTotalsForWeek(randomUser, today, userInfo, 'numSteps')}`;
  userStairsThisWeek.innerText = `Flights of stairs climbed this week: ${activityRepo.getUserTotalsForWeek(randomUser, today, userInfo, 'flightsOfStairs')}`;
  userMinutesThisWeek.innerText = `Minutes active this week: ${activityRepo.getUserTotalsForWeek(randomUser, today, userInfo, 'minutesActive')}`;
}

function displayStreakList(userInfo) {
  let latestStreaks = activityRepo.getStreak(userInfo, randomUser);

  if (latestStreaks.length === 3) {
    latestStreaks.forEach(item => {
      streakList.innerHTML += `<ul>${item.date}: ${item.numSteps} steps</ul>`;
    });
  } else if (latestStreaks.length === 2) {
    streakList.classList.add('hidden');
    streakMessage.classList.remove('hidden');
    streakMessage.innerText = `You're close to a streak, keep it up!`;
  } else {
    streakList.classList.add('hidden');
    streakMessage.classList.remove('hidden');
    streakMessage.innerText = `Increase your steps every day to start a streak!`;
  }
}

function displayHydrationInfo(userInfo, id) {
  let today = userInfo.getToday(id, hydrationRepo.hydrationData);
  hydrationToday.innerText = `You drank ${hydrationRepo.calculateDailyOunces(id, today)} oz of water today.`;
  hydrationThisWeek.innerHTML = '';
  let hydrationWeekData = hydrationRepo.calculateFirstWeekOunces(userInfo, id);

  hydrationWeekData.forEach(day => {
    hydrationThisWeek.innerHTML +=
      `<li>${day}oz</li> `
  });
}

function displaySleepInfo(userInfo, id) {
  let today = userInfo.getToday(id, sleepRepo.sleepData);
  sleepToday.innerText = `You slept ${sleepRepo.findInfoForDate(id, today, 'hoursSlept')} hours today.`;
  sleepQualityToday.innerText = `Quality of sleep: ${sleepRepo.findInfoForDate(id, today, 'sleepQuality')} / 5`;
  let weeksHours = sleepRepo.calculateWeekSleep(today, id, userInfo, sleepRepo.sleepData);
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
};

function populateStepChallenge(user, userRepo) {
  const today = userRepo.getToday(user.id, activityRepo.activityData);
  let stepRank = activityRepo.friendsWeeklyRanking(user, today, userRepo);
  bigWinner.innerText = `${stepRank[0].name} is the WINNER with ${stepRank[0].totalSteps} steps!`;
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

const addClass = (element, className) => {
  element.classList.add(className || "hidden");
};

const removeClass = (element, className) => {
  element.classList.remove(className || "hidden");
};

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
      displayActivityInfo(userRepo, randomUser.id)
    })
    .catch(err => alert(err))

  resetForm('hide');
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
}

window.addEventListener('load', loadThisFirst)

enterProgressDropdown.addEventListener('change', function (event) {
  updateFormView(event)
})

submitFormButton.addEventListener('click', postFormEntry)
