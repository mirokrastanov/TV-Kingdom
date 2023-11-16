import './App.css';
import { useTheme } from './contexts/ThemeContext';
import Home from './components/core/home/Home';
import Navigation from './components/core/navigation/Navigation';
import Footer from './components/core/footer/Footer';

function App() {
  const darkTheme = useTheme();

  return (
    <div className={`app-ctr${darkTheme ? ' dark-mode' : ''}`}>
      <Navigation />

      <Home /> {/* TO ADD ROUTES */}

      <Footer />
    </div>
  )
}

export default App;
