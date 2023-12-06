import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useTheme } from './contexts/ThemeContext';
import './App.css';
import Home from './components/home/Home';
import Navigation from './components/navigation/Navigation';
import NotFound from './components/notFound/NotFound';
import Shows from './components/shows/Shows';
import UserSignIn from './components/userSignIn/UserSignIn';
import Actors from './components/actors/Actors';
import Schedule from './components/schedule/Schedule';
import Search from './components/search/Search';
import ShowDetails from './components/showDetails/ShowDetails';
import UserSignUp from './components/userSignUp/UserSignUp';
import UserRoutes from './utilities/userRoutes';
import UserProfile from './components/userProfile/UserProfile';
import GuestRoutes from './utilities/guestRoutes';
import ShowSeasons from './components/showSeasons/showSeasons';
import ShowSeason from './components/showSeason/showSeason';
import ShowEpisodes from './components/showEpisodes/ShowEpisodes';
import ActorDetails from './components/actorDetails/ActorDetails';
import ShowEpisode from './components/showEpisode/ShowEpisode';
import ShowCast from './components/showCast/ShowCast';
import ShowCrew from './components/showCrew/ShowCrew';
import ShowImages from './components/showImages/ShowImages';

function App() {
    const darkTheme = useTheme();
    const { showId, seasonId, actorId, episodeId } = useParams();

    return (
        <div className={`app-ctr${darkTheme ? ' dark-mode' : ''}`}>
            <Navigation />

            <div className="app-content">
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route path='home' element={<Navigate to='/' />} />
                    <Route path='index' element={<Navigate to='/' />} />
                    <Route path='schedule' element={<Schedule />} />
                    {/* SCHEDULE come here - available to ALL */}

                    <Route element={<UserRoutes />}>
                        <Route path='shows' element={<Shows />} />
                        <Route exact path='shows/:showId/' element={<Navigate to={'details'} />} />
                        <Route path='shows/:showId/details' element={<ShowDetails />} />
                        <Route path='shows/:showId/seasons' element={<ShowSeasons />} />
                        <Route path='shows/:showId/seasons/:seasonId' element={<ShowSeason />} />
                        <Route path='shows/:showId/episodes' element={<ShowEpisodes />} />
                        <Route path='shows/:showId/cast' element={<ShowCast />} />
                        <Route path='shows/:showId/crew' element={<ShowCrew />} />
                        <Route path='shows/:showId/images' element={<ShowImages />} />

                        <Route path='episodes/:episodeId/details' element={<ShowEpisode />} />
                        <Route exact path='episodes/:episodeId/' element={<Navigate to={'details'} />} />

                        <Route path='actors' element={<Actors />} />
                        <Route exact path='actors/:actorId/' element={<Navigate to={'details'} />} />
                        <Route path='actors/:actorId/details' element={<ActorDetails />} />

                        <Route path='search' element={<Search />} />

                        <Route path='user/profile' element={<UserProfile />} />
                    </Route>

                    <Route element={<GuestRoutes />}>
                        <Route path='user/sign-in' element={<UserSignIn />} />
                        <Route path='user/sign-up' element={<UserSignUp />} />
                    </Route>

                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>

        </div>
    )
}

export default App;
