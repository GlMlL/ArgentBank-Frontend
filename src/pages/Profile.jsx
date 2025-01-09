import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "../redux/authActions";

function ProfileUpdate() {
  const dispatch = useDispatch();

  // Récupère les informations de l'utilisateur et le token depuis Redux
  const user = useSelector((state) => state.auth?.user || null);
  const token = useSelector((state) => state.auth?.token || null);

  // Gérer l'état des informations à mettre à jour
  const [userName, setUserName] = useState(user?.username || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fonction pour gérer l'envoi de la mise à jour
  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedData = { userName };

    if (token) {
      try {
        await dispatch(updateUserProfile(token, updatedData));
        setSuccessMessage("Profil mis à jour avec succès !");
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("Erreur lors de la mise à jour du profil.");
        setSuccessMessage("");
      }
    } else {
      setErrorMessage("Token manquant.");
    }
  };

  useEffect(() => {
    if (user) {
      setUserName(user.username || "");
    }
  }, [user]);

  return (
    <div className="profile-update">
      {user && <h1>Bienvenue, {user.username}</h1>}
      
      <h2>Mettre à jour votre profil</h2>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">Nom d'utilisateur :</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
}

export default ProfileUpdate;
