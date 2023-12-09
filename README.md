# TV-Kingdom
🎬📺🏰🎉TV Kingdom, where the magic of television meets the future: a modern, fully responsive, full-stack web application that unlocks a kingdom of limitless TV show data at your fingertips!

#### Site is powered by: [TV MAZE](https://www.tvmaze.com)

## Disclaimer
- This is a non-commercial student project designed to showcase programming skills. I have only used it in a student environment @SoftUni.
<br />

## App Demo
#### The app was deployed using the Firebase Hosting service
<a href="https://kingdom-71759.web.app/" target="_blank"><img src="https://github.com/mirokrastanov/Software-Engineering-SoftUni/blob/main/miscellaneous/try-now-btn.png?raw=true" height="60px" /></a>
- BACKUP: [In case main hosting is down](https://kingdom-71759.firebaseapp.com/)

#### Last updated - Dec 2023

<br />

# General App Overview
## Introduction
The website is an entertainment platform focused on TV shows. It provides users with a variety of features including browsing and searching for shows, viewing detailed information about shows, seasons, episodes, cast, crew, and actors. Users can also explore images related to shows and episodes. Additionally, the website offers user authentication, allowing registered users to personalize their experience by managing their profiles.


## Features
- `Infinite Scrolling` for Shows, Actors & Schedule pages.
- Unique Home Page `Shows Cards Slider` supporting user interactions and resembling the Shuffle of a Deck of Cards. Available to both guests and users.
- Schedule page for tracking show timings.
- Detailed pages for Shows, Seasons, Episodes, Cast, Crew, and Actors.
- `User authentication` for personalized profiles. Users get an enhanced experience and full access to the app.
- Custom 404 Not Found page for handling invalid routes.
- `Light/Dark modes` - selection is remembered for each account.
- `Comments` for the following pages: Show Details, Actor Details, Episode Details.
- Overview of `latest comments` is also available on Users' profile page.
- `Profile image selection` from a preset of stock images (future update might also support custom image upload).
- `Dynamic search` available both from the nav bar and as a dedicated feature page.
- Dynamic switching between Shows & Actors results. Both available on the dedicated Search page.
- Dynamic navigation with animations and `Custom Tooltips`.
- `Responsive Design on All pages`. Mobile device views and mobile specific navigation with a show/hide button.
- `Custom scrollbars` with a smooth effect.
- The app also features a set of beautiful background images for user sign in & sign up pages, and also for the home page.
- And much more...


## Page Map
1. Home
   - Route: `/`
   - Element: `<Home />`

2. Schedule
   - Route: `/schedule`
   - Element: `<Schedule />`

3. Shows
   - Route: `/shows`
   - Element: `<Shows />`
     - Show Details
       - Route: `/shows/:showId/details`
       - Element: `<ShowDetails />`
     - Show Seasons
       - Route: `/shows/:showId/seasons`
       - Element: `<ShowSeasons />`
     - Show Season
       - Route: `/shows/:showId/seasons/:seasonId`
       - Element: `<ShowSeason />`
     - Show Episodes
       - Route: `/shows/:showId/episodes`
       - Element: `<ShowEpisodes />`
     - Show Cast
       - Route: `/shows/:showId/cast`
       - Element: `<ShowCast />`
     - Show Crew
       - Route: `/shows/:showId/crew`
       - Element: `<ShowCrew />`
     - Show Images
       - Route: `/shows/:showId/images`
       - Element: `<ShowImages />`

4. Episodes
   - Route: `/episodes/:episodeId/details`
   - Element: `<ShowEpisode />`

5. Actors
   - Route: `/actors`
   - Element: `<Actors />`
     - Actor Details
       - Route: `/actors/:actorId/details`
       - Element: `<ActorDetails />`

6. Search
   - Route: `/search`
   - Element: `<Search />`

7. User Profile
   - Route: `/user/profile`
   - Element: `<UserProfile />`

8. User Sign-In
   - Route: `/user/sign-in`
   - Element: `<UserSignIn />`

9. User Sign-Up
   - Route: `/user/sign-up`
   - Element: `<UserSignUp />`

10. Not Found
    - Route: `*`
    - Element: `<NotFound />`




<br />

## Sneak Peak Images 
- Dashboard (User View)


- Actor Card, Show Card (with a custom animation that uncovers hidden extra content) & Custom tooltips
<p align="center">
   <a href="https://kingdom-71759.web.app/"><img src="https://github.com/mirokrastanov/Software-Engineering-SoftUni/blob/main/miscellaneous/tv-kingdom-assets/actor-card.png?raw=true" alt="game-image" height="300px"></a>
   <a href="https://kingdom-71759.web.app/"><img src="https://github.com/mirokrastanov/Software-Engineering-SoftUni/blob/main/miscellaneous/tv-kingdom-assets/show-card.png?raw=true" alt="game-image" height="300px"></a>
   <a href="https://kingdom-71759.web.app/"><img src="https://github.com/mirokrastanov/Software-Engineering-SoftUni/blob/main/miscellaneous/tv-kingdom-assets/custom-tooltip.png?raw=true" alt="game-image" height="100px"></a>
   <a href="https://kingdom-71759.web.app/"><img src="https://github.com/mirokrastanov/Software-Engineering-SoftUni/blob/main/miscellaneous/tv-kingdom-assets/guest-star-tooltip.png?raw=true" alt="game-image" height="100px"></a>
</p>

- Comments
<p align="center">
   <a href="https://kingdom-71759.web.app/"><img src="https://github.com/mirokrastanov/Software-Engineering-SoftUni/blob/main/miscellaneous/tv-kingdom-assets/comments.png?raw=true" alt="game-image" height="500px"></a>
</p>

- Episodes
<p align="center">
   <a href="https://kingdom-71759.web.app/"><img src="https://github.com/mirokrastanov/Software-Engineering-SoftUni/blob/main/miscellaneous/tv-kingdom-assets/episodes.png?raw=true" alt="game-image" height="500px"></a>
</p>

- Images
<p align="center">
   <a href="https://kingdom-71759.web.app/"><img src="https://github.com/mirokrastanov/Software-Engineering-SoftUni/blob/main/miscellaneous/tv-kingdom-assets/images.png?raw=true" alt="game-image" height="500px"></a>
</p>

- Schedule
<p align="center">
   <a href="https://kingdom-71759.web.app/"><img src="https://github.com/mirokrastanov/Software-Engineering-SoftUni/blob/main/miscellaneous/tv-kingdom-assets/schedule.png?raw=true" alt="game-image" height="500px"></a>
</p>

- Search - Nav view & Dedicated page view
<p align="center">
   <a href="https://kingdom-71759.web.app/"><img src="https://github.com/mirokrastanov/Software-Engineering-SoftUni/blob/main/miscellaneous/tv-kingdom-assets/search-nav.png?raw=true" alt="game-image" height="60px"></a>
   <a href="https://kingdom-71759.web.app/"><img src="https://github.com/mirokrastanov/Software-Engineering-SoftUni/blob/main/miscellaneous/tv-kingdom-assets/search-dedicated.png?raw=true" alt="game-image" height="500px"></a>
</p>

- Seasons
<p align="center">
   <a href="https://kingdom-71759.web.app/"><img src="https://github.com/mirokrastanov/Software-Engineering-SoftUni/blob/main/miscellaneous/tv-kingdom-assets/seasons.png?raw=true" alt="game-image" height="500px"></a>
</p>

- Home (Light Mode)
<p align="center">
   <a href="https://kingdom-71759.web.app/"><img src="https://github.com/mirokrastanov/Software-Engineering-SoftUni/blob/main/miscellaneous/tv-kingdom-assets/home-light.png?raw=true" alt="game-image" height="500px"></a>
</p>

- Home (Dark Mode)
<p align="center">
   <a href="https://kingdom-71759.web.app/"><img src="https://github.com/mirokrastanov/Software-Engineering-SoftUni/blob/main/miscellaneous/tv-kingdom-assets/home-dark.png?raw=true" alt="game-image" height="500px"></a>
</p>

- Actors
<p align="center">
   <a href="https://kingdom-71759.web.app/"><img src="https://github.com/mirokrastanov/Software-Engineering-SoftUni/blob/main/miscellaneous/tv-kingdom-assets/actors.png?raw=true" alt="game-image" height="500px"></a>
</p>

- Show Details
<p align="center">
   <a href="https://kingdom-71759.web.app/"><img src="https://github.com/mirokrastanov/Software-Engineering-SoftUni/blob/main/miscellaneous/tv-kingdom-assets/show-details.png?raw=true" alt="game-image" height="500px"></a>
</p>

- Episode Details
<p align="center">
   <a href="https://kingdom-71759.web.app/"><img src="https://github.com/mirokrastanov/Software-Engineering-SoftUni/blob/main/miscellaneous/tv-kingdom-assets/single-episode.png?raw=true" alt="game-image" height="500px"></a>
</p>





<br />

## A lot more awaits you on the app. Thank You! 
<a href="https://kingdom-71759.web.app/" target="_blank"><img src="https://github.com/mirokrastanov/Software-Engineering-SoftUni/blob/main/miscellaneous/try-now-btn.png?raw=true" height="60px" /></a>
- BACKUP: [In case main hosting is down](https://kingdom-71759.firebaseapp.com/)



<br />
<br />

# Technical Information

## Project Tools & Technologies used
### IDE
- [VS Code](https://code.visualstudio.com/)
### Extensions 
- [CSS Variable Autocomplete](https://marketplace.visualstudio.com/items?itemName=vunguyentuan.vscode-css-variables)
- [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
### Languages
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
### Libraries
- [Swiper.js](https://swiperjs.com/)
- [React Feather](https://feathericons.com/)
- [React Router](https://reactrouter.com/en/main)
- [Vite](https://vitejs.dev/guide/)
### Fonts, Icons & Visual elements
- [Font Awesome Icons](https://fontawesome.com/)
- [Google Material Icons](https://fonts.google.com/icons?icon.set=Material+Symbols)
- [Font - Montserrat](https://fonts.google.com/specimen/Montserrat)

<br />

## Front End side 
### This SPA project was built using the React.js
- More information regarding React can be found in [this README](https://github.com/mirokrastanov/TV-Kingdom/blob/main/client/README.md) and in the [React Docs](https://react.dev/learn).

<br />

## Back End side
### Authentication 
- [Appwrite.io](https://cloud.appwrite.io/)
### Database 
- [Appwrite.io](https://cloud.appwrite.io/)
### Hosting 
- [Firebase](https://firebase.google.com/)
### Read more
- Read the details of this project's back end handling and challenges. [Here](https://github.com/mirokrastanov/TV-Kingdom/blob/main/server/README.md)

### Powered by 
- App Data provided by: [TV MAZE](https://www.tvmaze.com)

