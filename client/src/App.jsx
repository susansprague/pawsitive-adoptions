// src/App.jsx
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/Navbar';
import AppPetCards from './components/PetCards';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function App() {
  const pets = [
    { id: 1, name: 'Name1', breed: 'Breed1' },
    { id: 2, name: 'Name2', breed: 'Breed2' },
    { id: 3, name: 'Name3', breed: 'breed3' },
  ];

  return (
    <div className="App">
  
      <h1>Pawsitive Adoptions</h1>
      <AppNavbar />
      <h2>Available Pets</h2>
      <Container>
        <Row>
        {pets.map((pet) => (
          <Col key={pet} xs={12} md={4} lg={3}>
                <AppPetCards />
          </Col>
        ))}
        </Row>
      </Container>
    </div>
  )}

export default App;
