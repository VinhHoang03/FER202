import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';
import HeroCarousel from './components/HeroCarousel';
import { Container } from 'react-bootstrap';
import PizzaList from './pages/PizzaList';

function App() {
return (
  <>
    <HeroCarousel />
    <div className="d-flex flex-column min-vh-100">
      <Container fluid className="flex-grow-1">
        {/* Other components or content can go here */}
        <PizzaList />
      </Container>
      <Footer myProfile={{
        avatar: '/images/vinh.png',
        name: 'Tra LTB',
        email: 'traltb@fe.edu.vn'
      }} />
    </div>
  </>
);
}

export default App;