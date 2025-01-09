import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "../redux/authActions";

function ProfileUpdate() {
  console.log("ProfileUpdate component mounted"); // Vérifie si le composant est rendu
  
  const dispatch = useDispatch();

  // Récupère les informations de l'utilisateur et le token depuis Redux
  const user = useSelector((state) => state.auth?.user || null);
  const token = useSelector((state) => state.auth?.token || null);

  // Ajoutez des console.log pour observer l'état de user et token
  console.log("Utilisateur dans Redux :", user);  // Affiche les données utilisateur depuis Redux
  console.log("Token dans Redux :", token);      // Affiche le token depuis Redux

  // Gérer l'état des informations à mettre à jour
  const [userName, setUserName] = useState(user?.username || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fonction pour gérer l'envoi de la mise à jour
  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedData = { userName };

    console.log("Essai de mise à jour avec token :", token); // Vérifie le token avant la soumission
    
    if (token) {
      try {
        console.log("Envoi de la mise à jour du profil..."); // Vérifie avant de lancer l'action
        await dispatch(updateUserProfile(token, updatedData));
        setSuccessMessage("Profil mis à jour avec succès !");
        setErrorMessage("");
      } catch (error) {
        console.log("Erreur lors de la mise à jour du profil :", error); // Log de l'erreur
        setErrorMessage("Erreur lors de la mise à jour du profil.");
        setSuccessMessage("");
      }
    } else {
      console.log("Token manquant lors de la soumission"); // Affiche un message si le token est manquant
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
