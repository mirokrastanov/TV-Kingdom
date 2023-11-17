import { Routes, Route } from 'react-router-dom';
import { useTheme } from './contexts/ThemeContext';
import './App.css';
import Home from './components/home/Home';
import Navigation from './components/navigation/Navigation';
import Footer from './components/footer/Footer';

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
