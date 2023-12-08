# TV-Kingdom
🎬📺🏰🎉TV Kingdom, where the magic of television meets the future: a modern, fully responsive, full-stack web application that unlocks a kingdom of limitless TV show data at your fingertips!

### Disclaimer
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


## Key Features
- A Unique Home Page Cards Slider supporting user interactions and resembling the Shuffle of a Deck of Cards. Available to both guests and users.
- Home Page showcasing featured content.
- Schedule page for tracking show timings.
- Detailed pages for Shows, Seasons, Episodes, Cast, Crew, and Actors.
- Search functionality for discovering content.
- User authentication for personalized profiles.
- Custom 404 Not Found page for handling invalid routes.
- Light/Dark modes - selection is remembered for each account.
- Comments for the following pages: Show Details, Actor Details, Episode Details.
- Overview of latest comments is also available at Users' profile page.
- Profile image selection from a preset of stock images (future update might also support custom image upload).
- Guest features/access are limited to less than 10% of all features.
- Users get an enhanced experience and full access to the app.
- Dynamic search available as a separate entity with its own page and also from within the navigation bar. Both share the same search context.
- Dynamic navigation with animations.
- Special mobile device views and navigation show/hide button for mobile view
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






## Sneak Peak Images 
- Dashboard (User View)

### (In progress...)

<!--
<p align="center"><a href="https://nba-1-480a7.web.app/"><img src="https://github.com/mirokrastanov/Software-Engineering-SoftUni/blob/main/miscellaneous/nba-dashboard-project/1.png?raw=true" alt="game-image" height="600px"></a></p>
- Dashboard (Guest View)
<p align="center"><a href="https://nba-1-480a7.web.app/"><img src="https://github.com/mirokrastanov/Software-Engineering-SoftUni/blob/main/miscellaneous/nba-dashboard-project/2.png?raw=true" alt="game-image" height="600px"></a></p>
- Teams (with nice hover effects)
<p align="center"><a href="https://nba-1-480a7.web.app/"><img src="https://github.com/mirokrastanov/Software-Engineering-SoftUni/blob/main/miscellaneous/nba-dashboard-project/3.png?raw=true" alt="game-image" height="600px"></a></p>
- Navigation (with a custom animated tooltip on hover)
<p align="center"><a href="https://nba-1-480a7.web.app/"><img src="https://github.com/mirokrastanov/Software-Engineering-SoftUni/blob/main/miscellaneous/nba-dashboard-project/4.png?raw=true" alt="game-image" height="300px"></a></p>
- Navigation on big screens
<p align="center"><a href="https://nba-1-480a7.web.app/"><img src="https://github.com/mirokrastanov/Software-Engineering-SoftUni/blob/main/miscellaneous/nba-dashboard-project/5.png?raw=true" alt="game-image" height="600px"></a></p>
- Navigation on mobile devices (toggled on)
<p align="center"><a href="https://nba-1-480a7.web.app/"><img src="https://github.com/mirokrastanov/Software-Engineering-SoftUni/blob/main/miscellaneous/nba-dashboard-project/6.png?raw=true" alt="game-image" height="600px"></a></p>
- Mobile View with navigation toggled off
<p align="center"><a href="https://nba-1-480a7.web.app/"><img src="https://github.com/mirokrastanov/Software-Engineering-SoftUni/blob/main/miscellaneous/nba-dashboard-project/7.png?raw=true" alt="game-image" height="600px"></a></p>
- Liked Team (already added to favorites)
<p align="center"><a href="https://nba-1-480a7.web.app/"><img src="https://github.com/mirokrastanov/Software-Engineering-SoftUni/blob/main/miscellaneous/nba-dashboard-project/8.png?raw=true" alt="game-image" height="100px"></a></p>
- Not liked (you can click on the star to add it to favorites). Also showcases the custom tooltip on hover telling you what happens if you click the star. The star also spins with an animation effect, but to see that you must try out the app. :)
<p align="center"><a href="https://nba-1-480a7.web.app/"><img src="https://github.com/mirokrastanov/Software-Engineering-SoftUni/blob/main/miscellaneous/nba-dashboard-project/9.png?raw=true" alt="game-image" height="200px"></a></p>


## A lot more awaits you on the app. Thank You! 
<a href="https://nba-1-480a7.web.app/" target="_blank"><img src="https://github.com/mirokrastanov/Software-Engineering-SoftUni/blob/main/miscellaneous/try-now-btn.png?raw=true" height="60px" /></a>
- BACKUP: [In case main hosting is down](https://nba-1-480a7.firebaseapp.com/)



<br />
<br />

# Technical Information

## Front End side 
### This SPA project was built using the Angular framework
- More information regarding Angular can be found in [this README](https://github.com/mirokrastanov/NBA-Dashboard/blob/main/client/README.md) and in the [Angular Docs](https://docs.angularjs.org/api).


## Back End side
### Back End is fully handled by Firebase
- Read the details of this project's back end handling and challenges. [Here](https://github.com/mirokrastanov/NBA-Dashboard/blob/main/server/README.md)

### NBA Data obtained via web scraping
- The lack of a free and feasible good API led to me learning web scraping and incorporating it for this project.
- It was a great way for me to learn more about the `puppeteer` library and web scraping as a whole.
- This of course made the Front End use of this data harder than using a regular API. 
- There were many challenges and the process was very involved. 
- Read more about it [Here](https://github.com/mirokrastanov/NBA-Dashboard/tree/main/web-scrapers)

-->

