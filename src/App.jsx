// src/App.jsx
import './App.css';

function App() {
  const pets = [
    { id: 1, name: 'Name1', breed: 'Breed1' },
    { id: 2, name: 'Name2', breed: 'Breed2' },
    { id: 3, name: 'Name3', breed: 'breed3' },
  ];

  return (
    <div className="App">
      <h1>Pawsitive Adoptions</h1>
      <h2>Available Pets</h2>
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            <h3>{pet.name}</h3>
            <p>Breed: {pet.breed}</p>
            <button>Adopt</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
