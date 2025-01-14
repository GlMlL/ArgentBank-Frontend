import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';


function App() {
  const isAuthenticated = useSelector((state) => state.user?.isAuthenticated || false);
 // Utilisez `state.user` ici

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;