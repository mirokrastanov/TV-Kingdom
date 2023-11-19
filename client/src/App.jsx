import { Routes, Route, Navigate } from 'react-router-dom';
import { useTheme } from './contexts/ThemeContext';
import './App.css';
import Home from './components/home/Home';
import Navigation from './components/navigation/Navigation';
import NotFound from './components/notFound/NotFound';

function App() {
    const darkTheme = useTheme();

    return (
        <div className={`app-ctr${darkTheme ? ' dark-mode' : ''}`}>
            <Navigation />

            <div className="app-content">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/home' element={<Navigate to='/' />} />
                    <Route path='/index' element={<Navigate to='/' />} />
                    <Route path='/index.html' element={<Navigate to='/' />} />

                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>

        </div>
    )
}

export default App;
