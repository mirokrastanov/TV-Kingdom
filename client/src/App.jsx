import { Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
    const darkTheme = useTheme();

    return (
        <div className={`app-ctr${darkTheme ? ' dark-mode' : ''}`}>
            <Navigation />

            <div className="app-content">
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route path='home' element={<Navigate to='/' />} />
                    <Route path='index' element={<Navigate to='/' />} />
                    
                    <Route path='shows' element={<Shows />} />
                    <Route path='actors' element={<Actors />} />
                    <Route path='schedule' element={<Schedule />} />
                    <Route path='search' element={<Search />} />

                    <Route path='user'>
                        <Route path='sign-in' element={<UserSignIn />} />
                        <Route path='sign-up' element={<Shows />} />
                        <Route path='profile' element={<Shows />} />
                    </Route>

                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>

        </div>
    )
}

export default App;
