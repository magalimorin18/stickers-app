import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import StickerUploader from './components/StickerUploader';
import Marketplace from './components/Marketplace';
import Leaderboard from './components/Leaderboard';
import Payment from './components/Payment';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<StickerUploader />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;