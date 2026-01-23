import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';
import About from './pages/About';
import NavBarSearch from './components/NavBarSearch';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroCarousel from './components/HeroCarousel';
import Home from './pages/Home';

function App() {
  
return (
  <Router>
    <NavBarSearch />
    <HeroCarousel />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Footer myprofile={{
        avatar: '/images/vinh.png',
        name: 'Vinh Hoang',
        email: 'vinh03072005@gmail.com'
      }} />} />
    </Routes>
  </Router>
);
}

export default App;