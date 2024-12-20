import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../redux/authActions';

function ProfileUpdate() {
  const dispatch = useDispatch();

  // Récupère les informations de l'utilisateur et le token depuis Redux
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  // Gérer l'état des informations à mettre à jour
  const [userName, setUserName] = useState(user ? user.username : '');

  // Fonction pour gérer l'envoi de la mise à jour
  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedData = { userName }; // Crée l'objet avec les nouvelles données
    if (token) {
      dispatch(updateUserProfile(token, updatedData)); // Appel à l'action Redux pour mettre à jour le profil
    }
  };

  useEffect(() => {
    if (user) {
      setUserName(user.username); // Pré-remplir le champ avec le nom actuel
    }
  }, [user]);

  return (
    <div className="profile-update">
      <h2>Mettre à jour votre profil</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">Nom d'utilisateur :</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)} // Met à jour l'état lors de la saisie
          />
        </div>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
}

export default ProfileUpdate;
