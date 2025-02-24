import React from 'react';
import Navbar from './komponenter/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Navbar /> {/* Corrected Navbar component */}
        <Routes>
          <Route path='/' element={<h1>Hem</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;


