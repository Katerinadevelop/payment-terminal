import '../styles/App.css';
import { Navbar, Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import MainPage from '../components/MainPage';
import RefillBalanceForm from '../components/RefillBalanceForm';

const App = () => {
  return (
    <div className="App-container">
      <Navbar>
        <Container>
          <Navbar.Brand href="/">
            <h1>Payment terminal</h1>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="payment/:operatorId" element={<RefillBalanceForm />} />
      </Routes>
    </div>
  );
};

export default App;
