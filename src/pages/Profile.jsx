import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from '../redux/authActions'; 

import '../styles/Profile.css'; 

function Profile() {
  const dispatch = useDispatch();

  // Sélecteur pour récupérer les informations utilisateur du Redux store
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  
  useEffect(() => {
    console.log('Token:', token); // Affiche le token dans la console
    if (!user && token) {
      dispatch(fetchUserProfile(token));
    }
  }, [user, token, dispatch]);

  if (!user) {
    return <p>Chargement des informations utilisateur...</p>;
  }

  return (
    <>
      
      <div className="profile">
        <header className="profile-header">
          <h1>Bienvenue sur votre profil</h1>
        </header>
        <main className="profile-main">
          <div className="profile-info">
            <p>
              <strong>Nom complet : </strong> {user.firstName} {user.lastName}
            </p>
            <p>
              <strong>Pseudo : </strong> {user.username}
            </p>
            <p>
              <strong>Email : </strong> {user.email}
            </p>
          </div>
        </main>
      </div>
    </>
  );
}

export default Profile;
