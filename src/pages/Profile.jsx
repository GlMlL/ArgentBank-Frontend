import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { fetchUserProfile, updateUserProfile  } from '../redux/authActions';
import UserMoney from "../components/UserMoney/UserMoney";
import accountData from "../store/accountData.json";
import "../styles/Profile.css";

function ProfileUpdate() {
  const dispatch = useDispatch();

  // Récupère les informations utilisateur et le token depuis Redux
  const user = useSelector((state) => state.auth?.user || null);
  const token = useSelector((state) => state.auth?.token || null);

  // Gérer l'état local pour le formulaire de mise à jour
  const [userName, setUserName] = useState(user?.username || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fonction pour récupérer les données utilisateur depuis l'API
  const fetchDataProfile = useCallback(async () => {
    if (!token) {
      setErrorMessage("Token manquant.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/profile",
        {},
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const responseData = response.data.body;
        dispatch(fetchUserProfile(responseData)); // Met à jour Redux avec les données utilisateur
        setErrorMessage("");
      } else {
        console.error("Erreur de réponse : ", response.statusText);
        setErrorMessage("Erreur lors de la récupération des données.");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du profil :", error);
      setErrorMessage("Erreur réseau ou serveur.");
    }
  }, [dispatch, token]);

  // Charger les données utilisateur au montage
  useEffect(() => {
    if (token) {
      fetchDataProfile();
    }
  }, [fetchDataProfile, token]);

  // Mettre à jour le formulaire quand les données utilisateur changent
  useEffect(() => {
    if (user) {
      setUserName(user.username || "");
    }
  }, [user]);

  // Gestion de l'envoi du formulaire de mise à jour
  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedData = { userName };

    if (token) {
      try {
        await dispatch(updateUserProfile(token, updatedData));
        setSuccessMessage("Profil mis à jour avec succès !");
        setErrorMessage("");
        fetchDataProfile(); // Recharge les données utilisateur après mise à jour
      } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        setErrorMessage("Erreur lors de la mise à jour du profil.");
        setSuccessMessage("");
      }
    } else {
      setErrorMessage("Token manquant.");
    }
  };

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

      <section className="card">
        {accountData.accounts.map((account, index) => (
          <UserMoney
            key={index}
            title={account.title}
            content={account.content}
            subtitle={account.subtitle}
          />
        ))}
      </section>
    </div>
  );
}

export default ProfileUpdate;
