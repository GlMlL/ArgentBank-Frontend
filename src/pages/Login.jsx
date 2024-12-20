import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useDispatch } from "react-redux"; // Hook pour dispatcher des actions Redux
import axios from "axios"; // Pour les requêtes HTTP
import '../styles/Login.css';
import { login } from '../redux/reducers/authUserSlice'; 

import Formular from "../components/Formular/Formular"; 
import Button from "../components/Button/Button"; 

function Login() {
  const navigate = useNavigate(); // naviguer entre les pages
  const dispatch = useDispatch(); // Pour dispatcher des actions Redux

  // États pour stocker les informations utilisateur et les erreurs
  const [email, setEmail] = useState(""); // Email utilisateur
  const [password, setPassword] = useState(""); // Mot de passe utilisateur
  const [errorMessage, setErrorMessage] = useState(""); // Message d'erreur
  const [remember, setRemember] = useState(false); // État "Remember me"

  // Gestion de la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      email: email,
      password: password,
    };

    try {
      // Envoi de la requête vers l'API d'authentification
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Récupération et stockage du token
        const token = response.data.body.token;
        localStorage.setItem("authToken", token); // Sauvegarde locale du token
        dispatch(login({ token })); // Action Redux pour authentifier l'utilisateur

        // Redirection vers la page profil
        navigate("/profile");
      } else {
        setErrorMessage(response.statusText); // Mise à jour du message d'erreur
      }
    } catch (error) {
      // Gestion des erreurs
      setErrorMessage("Une erreur s'est produite. Vérifiez vos identifiants.");
    }
  };

  return (
    <div>
      
      <main className="main-login">
        <section className="section-login">
          <div className="form_header">
            <i className="fa fa-user-circle"></i>
            <h2>Sign In</h2>
          </div>
          <form onSubmit={handleSubmit}>
            {errorMessage && <p className="error-login">{errorMessage}</p>}

            {/* Champs de formulaire */}
            <Formular
              label="Email"
              content="email"
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <Formular
              label="Password"
              content="password"
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            {/* Checkbox "Remember Me" */}
            <div className="login_check">
              <input
                type="checkbox"
                id="remember"
                name="check-remember"
                onChange={() => setRemember(!remember)}
                checked={remember}
              />
              <label htmlFor="remember">Remember me</label>
            </div>

            {/* Bouton de connexion */}
            <Button
              style={{ textDecoration: "underline" }}
              content="Sign In"
              className="btn-login"
            />
          </form>
        </section>
      </main>
      
    </div>
  );
}

export default Login;
