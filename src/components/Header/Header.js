import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/reducers/authUserSlice';
import { isAuthenticatedSelector } from '../../redux/reducers/authUserSlice';
import argentBankLogo from '../../img/argentBankLogo.png';
import '../../styles/Header.css';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Sélecteurs sécurisés
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const user = useSelector((state) => state.auth?.user || null); // Assure que user est défini ou null

  const handleSignOut = () => {
    dispatch(logout());
    localStorage.removeItem('authToken');
    navigate('/');
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
          <div className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            <span>Welcome, {user?.username || 'User'}</span>
            <button
              className="sign-out-button"
              onClick={handleSignOut}
              style={{
                background: 'none',
                border: 'none',
                color: 'inherit',
                cursor: 'pointer',
                marginLeft: '10px',
              }}
            >
              <i className="fa fa-sign-out"></i>
              Sign Out
            </button>
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
