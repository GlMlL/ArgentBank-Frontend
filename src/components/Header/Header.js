import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/reducers/authUserSlice'; // Assurez-vous que cette action existe
import argentBankLogo from '../../img/argentBankLogo.png'; 
import '../../styles/Header.css';

function Header() {
  const auth = useSelector((state) => state.auth); // Accédez à l'état global auth
  const isAuthenticated = auth && auth.token; // Vérifiez si le token existe
  const user = auth && auth.user; // Vérifiez si l'utilisateur existe
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
