import { useState } from 'react';
import AppNavbar from '../components/React/Navbar';

function AppSignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your user registration logic here (e.g., API calls, validation)
  };

  return (
    <div>
        <h1>Pawsitive Adoptions</h1>          
  <AppNavbar />
       <h3>Sign Up</h3>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
    </div>
  );
}

export default AppSignUp;