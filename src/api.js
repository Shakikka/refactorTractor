//GET requests
export const sleepDataAPI = fetch("http://localhost:3001/api/v1/sleep")
  .then(response => response.json())

export const userDataAPI = fetch("http://localhost:3001/api/v1/users")
  .then(response => response.json())

export const activityDataAPI = fetch("http://localhost:3001/api/v1/activity")
  .then(response => response.json())

export const hydrationDataAPI = fetch("http://localhost:3001/api/v1/hydration")
  .then(response => response.json())


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
    .catch(err => console.log('too much sauce'))
}

export const hydrationDataPost = (dataFormEntry) => {
  fetch("http://localhost:3001/api/v1/hydration", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataFormEntry)
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log('too much sauce'))
}

export const activityDataPost = (dataFormEntry) => {
  fetch("http://localhost:3001/api/v1/activity", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataFormEntry)
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log('too much sauce'))
}


//activity....leaving here for example with data
// fetch("http://localhost:3001/api/v1/activity", {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       userID: 60,
//       date: "2021/01/01",
//       numSteps: 69,
//       minutesActive: 666,
//       flightsOfStairs: 610
//     })
//   })
//   .then(response => response.json())
//   .then(json => console.log(json))
//   .catch(err => console.log('too much sauce'))