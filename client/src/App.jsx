import { Routes, Route } from 'react-router-dom';
import { useTheme } from './contexts/ThemeContext';
import './App.css';
import Home from './components/core/home/Home';
import Navigation from './components/core/navigation/Navigation';
import Footer from './components/core/footer/Footer';

function App() {
    const darkTheme = useTheme();

    return (
        <div className={`app-ctr${darkTheme ? ' dark-mode' : ''}`}>
            <Navigation />

            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>

            <Footer />
        </div>
    )
}

export default App;
