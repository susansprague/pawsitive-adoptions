// src/App.jsx
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppHome from './pages/Home';
import AppContact from './pages/Contact';
import AppSignIn from './pages/LogIn';
import AppSignUp from './pages/signUp';





function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<AppHome />} />
      <Route path='/contact' element={<AppContact />} />
      <Route path='/signin' element={<AppSignIn />} />
      <Route path='/signup' element={<AppSignUp />} />
    </Routes>
  </BrowserRouter>

  )}

export default App;
