import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SummaryPage from './pages/SummaryPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => (
  <Router>
    <Navbar />
    <main className="container my-4">
      <Routes>
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </main>
    <Footer />
  </Router>
);

export default App;