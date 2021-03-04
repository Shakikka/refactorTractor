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
* [Wireframe]()


## Set Up

### FitLit API Server

COPY TO DESCRIBE HOW TO RUN THE FITLIT API

### Server

Clone down this repository to your local machine, then install the library dependencies by running:

```bash
npm install
```


To start the server that hosts the app, run:

```bash
npm start
```

If you see `Compiled successfully` in your terminal, the server is running and the app can be veiwed at `http://localhost:8080/` in your browser. Make sure this server, and the FitLit API server, are both running to ensure you see the right information displayed on the app.



### Open the here: [RefactorTractor: FitLit]() IF WE DEPLOY TO GITHUB PAGES THE LINK WILL GO HERE


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


<img width="600" alt="landing-desktop" src="landing.png">
<img width="350" alt="landing-mobile" src="landing_mobile.png">



## Mobile Views

### Medium-sized Screens

<img width="800" alt="recipe detail view" src="Screen Shot 2021-02-17 at 7.56.07 PM.png">


### Small Screens


<img width="800" alt="recipe detail view" src="Screen Shot 2021-02-17 at 7.56.07 PM.png">




## Post Requests


![](https://media.giphy.com/media/JzWO5R7K2BYd1dRHiF/giphy.gif)





---
## Challenges

*
*
*
*

---
## Wins


* Great organization - we got through everything!
* 
*
*

---
## Future Iterations

* Methods were left in each class that we thought had a sound practical purpose, but were not represented on the DOM. These would be great to display in further iterations.
* Implementing icons or buttons to hide or display information when a user clicks on them.
* 
*










## Deploying to GitHub Pages

_If you are finished with the functionality and testing of your project_, then you can consider deploying your project to the web! This way anyone can play it without cloning down your repo.

[GitHub Pages](https://pages.github.com/) is a great way to deploy your project to the web. Don't worry about this until your project is free of bugs and well tested!

If you _are_ done, you can follow [this procedure](./gh-pages-procedure.md) to get your project live on GitHub Pages.
