//GET requests

const checkIfError = response => {
  if (!response.ok) {
    throw new Error('An error has been encountered. Please try again.');
  } else {
    return response.json();
  }
}


export const sleepDataAPI = fetch("http://localhost:3001/api/v1/sleep")
  .then(checkIfError)
  .catch(err => alert(err))

export const userDataAPI = fetch("http://localhost:3001/api/v1/users")
  .then(checkIfError)
  .catch(err => alert(err))

export const activityDataAPI = fetch("http://localhost:3001/api/v1/activity")
  .then(checkIfError)
  .catch(err => alert(err))

export const hydrationDataAPI = fetch("http://localhost:3001/api/v1/hydration")
  .then(checkIfError)
  .catch(err => alert(err))


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