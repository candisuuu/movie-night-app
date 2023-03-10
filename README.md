# Movie Night App

> A simple React app that was initially created to be used with a group of friends to search, select, and upvote movies that we'd want to watch for a movie night. Has since been used and updated as a means to learn more about React, Redux, and Redux Toolkit. Is also being used as a boilerplate for a similar app to search, select, and upvote videogames to play for a videogame club (think book club but replace books with videogames!).

## Installing/Getting started

It's required to have [npm](https://www.npmjs.com/get-npm) installed locally,  have a cloned setup of the [Movie Night Cloudflare Worker](https://github.com/candisuuu/movie-night-api), and to have set up an account and application with [Auth0](https://manage.auth0.com/dashboard/) to follow the instructions.

---

Once you have everything installed and an Auth0 account and application set up do the following:

Open the `.env` file and enter the domain and client ID for your application set up with Auth0, and the base URL for the API you've set up via Cloudflare from the Movie Night Cloudflare Worker.

```sh
# Navigate to where the repo data is located in your machine
$ cd [repo data location]
# Deploy app to dev environment for local testing
$ npm start
# Once app is ready for production run a build for production
$ npm run build
```

## Next Steps for Development
* Confirmation/error message for movie form submission
* Popup error message for all instances of errors when fetching data
* Send email notification to app owner of errors along with error details
* Ability for user with an admin role to go in and delete movies from Upvoted Movies page
* Ability for all users to undo their own upvote action
* Add user profile page - enable user to change password and see movies they've upvoted