// src/App.jsx
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppHome from './pages/Home';
import AppContact from './pages/Contact';
import AppAbout from './pages/About';
import AppSignIn from './pages/Signin';





function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<AppHome />} />
      <Route path='/contact' element={<AppContact />} />
      <Route path='/about' element={<AppAbout />} />
      <Route path='/signin' element={<AppSignIn />} />
    </Routes>
  </BrowserRouter>

  )}

export default App;
