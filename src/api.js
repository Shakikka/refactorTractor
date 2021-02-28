//GET requests
export const sleepDataAPI = fetch("http://localhost:3001/api/v1/sleep")
  .then(response => response.json())
  .catch(err => alert('Sorry, but there was an error. Please try again.'))

export const userDataAPI = fetch("http://localhost:3001/api/v1/users")
  .then(response => response.json())
  .catch(err => alert('Sorry, but there was an error. Please try again.'))

export const activityDataAPI = fetch("http://localhost:3001/api/v1/activity")
  .then(response => response.json())
  .catch(err => alert('Sorry, but there was an error. Please try again.'))

export const hydrationDataAPI = fetch("http://localhost:3001/api/v1/hydration")
  .then(response => response.json())
  .catch(err => alert('Sorry, but there was an error. Please try again.'))


//POST requests
export const sleepDataPost = (dataFormEntry) => {
  fetch("http://localhost:3001/api/v1/sleep", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataFormEntry)
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log('too much sauce')) //err.message
}

//moved to scripts for now
// export const hydrationDataPost = (dataFormEntry) => {
//   fetch("http://localhost:3001/api/v1/hydration", {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(dataFormEntry)
//     })
//     .then(response => response.json())
//     .then(json => console.log(json))
//     .catch(err => console.log('too much sauce')) //err.message
// }

//moved to scripts for now
// export const activityDataPost = (dataFormEntry) => {
//   fetch("http://localhost:3001/api/v1/activity", {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(dataFormEntry)
//     })
//     .then(response => response.json())
//     // .then(json => console.log(json))
//     .then(json => {
//       activityRepo.activityData.push(json)
//     })
//     // .then(() => console.log(activityRepo.activityData))
//     .catch(err => console.log('too much sauce')) //err.message
// }


//activity....leaving here for example with data
// fetch("http://localhost:3001/api/v1/activity", {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       userID: 33,
//       date: "2021/01/01",
//       numSteps: 68,
//       minutesActive: 66,
//       flightsOfStairs: 610
//     })
//   })
//   .then(response => response.json())
//   .then(json => console.log(json))
//   .catch(err => console.log('too much sauce'))