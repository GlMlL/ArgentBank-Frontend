import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/reducers/authUserSlice'; // Action logout
import argentBankLogo from '../../img/argentBankLogo.png'; 
import '../../styles/Header.css';
import { isAuthenticatedSelector } from '../../redux/reducers/authUserSlice'; // Import du sélecteur

function Header() {
  const isAuthenticated = useSelector(isAuthenticatedSelector); // Utilisation du sélecteur
  const user = useSelector((state) => state.authUser.user); // Accès à 'authUser' via le state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fonction pour gérer la déconnexion sécurisée
  const handleSignOut = () => {
    dispatch(logout()); // Déconnecte l'utilisateur en réinitialisant Redux
    localStorage.removeItem('authToken'); // Supprime le token du stockage local
    navigate('/'); // Redirige vers la page d'accueil
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo} 
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isAuthenticated ? (
          <div className="main-nav-item" onClick={handleSignOut} style={{ cursor: 'pointer' }}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </div>
        ) : (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;
