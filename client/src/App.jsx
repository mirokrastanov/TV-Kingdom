import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Home from './components/core/home/Home';
import Navigation from './components/core/navigation/Navigation';
import Footer from './components/core/footer/Footer';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='app-ctr'>
      <Navigation />

      <Home />

      <Footer />
    </div>
  )
}

export default App;
