# Movie Night App

> A simple React app that was initially created to be used with a group of friends to search, select, and upvote movies that we'd want to watch for a movie night. Has since been used and updated as a means to learn more about React, Redux, and Redux Toolkit. Is also being used as a boilerplate for a similar app to search, select, and upvote videogames to play for a videogame club (think book club but replace books with videogames!).

## Updates

### 3/19/2023
* User request: option to toggle between dark mode and light mode
* Send delete method to upvoted movies data when the number of votes on an upvoted movie reaches 0
* Add user profile page - enable user to change password and see movies they've upvoted
* Changes to layout for better user experience
* Fixed Tailwind config

## Installing/Getting started

It's required to have [npm](https://www.npmjs.com/get-npm) installed locally,  have a cloned setup of the [Movie Night Cloudflare Worker](https://github.com/candisuuu/movie-night-api), and to have set up an account and application with [Auth0](https://manage.auth0.com/dashboard/) to follow the instructions.

---

Once you have everything installed and an Auth0 account and application set up do the following:

Open the `.env` file and enter the domain, client ID, audience URL, user API URL, and user metadata namespace domain for your application set up with Auth0, and the base URL for the API you've set up via Cloudflare from the Movie Night Cloudflare Worker.

```sh
# Navigate to where the repo data is located in your machine
$ cd [repo data location]
# Deploy app to dev environment for local testing
$ npm start
# Once app is ready for production run a build for production
$ npm run build
```

## Next Steps for Development
* User request: ability for user with an admin role to go in and delete movies from Upvoted Movies page
* User request: "Encore" page for user to see movies that have been watched that they can upvote to watch again
* User request: Add new status that will display on movie cards for movies that have been watched
* Tidy up class names and children content being used in components
* Confirmation/error message for movie form submission
* Popup error message for all instances of errors when fetching data
* Send email notification to app owner of errors along with error details