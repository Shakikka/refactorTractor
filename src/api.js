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

export const postNewData = (path, body) => {
  return fetch(`http://localhost:3001/api/v1/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}


// export const sleepDataPost = (body) => {
//   return fetch("http://localhost:3001/api/v1/sleep", {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(body)
//   })
// }

// export const hydrationDataPost = (body) => {
//   return fetch("http://localhost:3001/api/v1/hydration", {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(body)
//   })
// }

// export const activityDataPost = (dataFormEntry) => {
//   return fetch("http://localhost:3001/api/v1/activity", {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(dataFormEntry)
//   })
// }