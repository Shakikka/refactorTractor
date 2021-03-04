# Refactor Tractor: FitLit

A [Front-End Project](https://frontend.turing.io/projects/module-2/refactor-tractor.html) by [Jeff Shepherd](https://github.com/JeffShepherd), [Joel Thomas](https://github.com/Shakikka) and [Jessica Justice](https://github.com/m1073496)



1. [Overview](#overview)
2. [Planning Resources](#planning-resources)
3. [Set Up](#set-up)
4. [Learning Goals](#learning-goals)
5. [Technologies](#technologies)
6. [Features](#features)
7. [Challenges](#challenges)
8. [Wins](#wins)
9. [Future Additions](#future-additions)


## Overview

This is a Turing School of Software and Design - Module 2 group project.

The purpose of this project was to get brown-field project experience: working on a project that has already been built out and refactoring/updating the project to make for a better user and dev experience with the app. The project we were given was FitLit, an app that tracks a user's activity, like steps, flights of stairs climbed, and miles walked in a week, as well as their hydration and sleep habits. The app also tracks a user's friends' activity, and offers a friendly competition that displays on the UI. 

Our task was to redesign the layout, including the responsiveness of the app on various screen sizes, to make for a better UI, as well as refactor the code behind the scenes for better dev readability and empathy. At the same time, we removed all the hard-coded data, exchanged it for data fetched with an API, and implemented POST request functionality that subsequently updates the DOM. As we refactored the code, we followed TDD best practices to test each class's methods before hooking them up to the DOM. We also refactored the CSS to incorporate SASS files, mixins, and variables to DRY up this code and implemented a reset file so that our styling carries across multiple browsers.

## Planning Resources

* [Trello Project Board](https://trello.com/b/oP41W1po/refactor-tractor)
* [Miro Board - Class Structure Outline](https://miro.com/app/board/o9J_lSqxVCE=/)


## Set Up (server and application must be running simultaneously)

### FitLit API Server

Clone down this repo: [FitLit API](https://github.com/turingschool-examples/fitlit-api)

cd into directory and run:

```
npm install
```

To start the server, run:

```
npm start
```

### FitLit Application

Clone down this repository to your local machine, then install the library dependencies by running:

```
npm install
```


To start application, run:

```
npm start
```

If you see `Compiled successfully` in your terminal, the application is running and the app can be veiwed at `http://localhost:8080/` in your browser. Make sure this application, and the FitLit API server, are both running to ensure you see the right information displayed on the app.




## Learning Goals

* Brown-field experience
* Webpack
* SASS
* Fetch API
* CSS Grid and Responsive design


## Technologies

* HTML
* CSS
* SASS
* Javascript
* Git
* GitHub
* ESlint
* Webpack
* Fetch API

---
## Features

+ [Landing Page](#landing-page)
+ [Mobile Views](#mobile-views)
+ [Post Requests](#post-requests)


## Landing Page


<img width="350" alt="landing-mobile" src="https://files.slack.com/files-pri/T029P2S9M-F01QA4ZEPTN/screen_shot_2021-03-03_at_7.42.23_pm.png">


## Mobile Views


![](https://media.giphy.com/media/khbZidy9qRf0e6CqGJ/giphy.gif)



## Post Requests


![](https://media.giphy.com/media/3N4gXjnexFyH37d611/giphy.gif)





---
## Challenges

* Inexperience working with brown-field projects
* Deciding where to start on the project
* Leveraging multiple new technologies that we learned during the project
* Refactoring complex methods

---
## Wins


* Great organization - we got through everything!
* Getting a better understand of the fetch API
* Leveraging complex methods needed for extensions
* Practicing array iterator methods

---
## Future Iterations

* Methods were left in each class that we thought had a sound practical purpose, but were not represented on the DOM. These would be great to display in further iterations.
* Implementing icons or buttons to hide or display information when a user clicks on them.





