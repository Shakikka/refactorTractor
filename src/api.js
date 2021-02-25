export const sleepDataAPI = fetch("http://localhost:3001/api/v1/sleep")
                              .then(response => response.json())

export const userDataAPI = fetch("http://localhost:3001/api/v1/users")
                            .then(response => response.json())

export const activityDataAPI = fetch("http://localhost:3001/api/v1/activity")
                                .then(response => response.json())

export const hydrationDataAPI = fetch("http://localhost:3001/api/v1/hydration")
                                  .then(response => response.json())
