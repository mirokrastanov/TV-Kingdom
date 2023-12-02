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

function App() {
    const darkTheme = useTheme();
    const { showId } = useParams();

    return (
        <div className={`app-ctr${darkTheme ? ' dark-mode' : ''}`}>
            <Navigation />

            <div className="app-content">
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route path='home' element={<Navigate to='/' />} />
                    <Route path='index' element={<Navigate to='/' />} />
                    <Route path='schedule' element={<Schedule />} />

                    <Route element={<UserRoutes />}>
                        <Route path='shows' element={<Shows />} />
                        <Route path='shows/:showId/details' element={<ShowDetails />} />

                        <Route path='search' element={<Search />} />
                        <Route path='actors' element={<Actors />} />

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
