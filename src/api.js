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

export const postNewData = (path, body) => {
  return fetch(`http://localhost:3001/api/v1/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}