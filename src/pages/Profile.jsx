import React, { useEffect, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import "../styles/Profile.css";
import UserNameEditor from "../components/UserNameEditor/UserNameEditor";
import UserMoney from "../components/UserMoney/UserMoney";
import { userProfile } from '../redux/reducers/authUserSlice'; 
import accountData from "../data/accountData.json"; // Fallback des données locales

function User() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Utilise useCallback pour mémoriser fetchDataProfile et éviter sa recréation à chaque rendu
    const fetchDataProfile = useCallback(async (authToken) => {
      try {
          const response = await axios.get(
              "http://localhost:3001/api/v1/user/profile",
              {
                  headers: {
                      accept: "application/json",
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${authToken}`,
                  },
              }
          );
          
          console.log("API Response:", response); // Vérifiez la réponse complète de l'API
          console.log("API Response Data:", response.data);
          console.log("API Response Body:", response.data.body); // Vérifiez si `body` existe

  
          if (response.status === 200) {
              const responseData = response.data.body;  // Vous utilisez 'body' ici, assurez-vous que la réponse contient ce champ
              dispatch(userProfile(responseData)); // Dispatch des données dans Redux
          } else {
              console.error("Error response:", response.statusText);
              setError('Error fetching user data');
          }
      } catch (error) {
          console.error("Error fetching profile data:", error);
          setError('An error occurred while fetching your profile');
      } finally {
          setLoading(false);
      }
  }, [dispatch]);

    useEffect(() => {
      const authToken = localStorage.getItem("authToken");
      console.log("authToken:", authToken); // Ajoutez ceci pour vérifier le token
  
      if (authToken) {
          fetchDataProfile(authToken);
      } else {
          setError('No auth token found');
          setLoading(false);
      }
  }, [fetchDataProfile]); // Ajoute fetchDataProfile dans la liste des dépendances

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <main className="main_user">
            <UserNameEditor />
            <section className="card">
                {accountData.accounts && accountData.accounts.length > 0 ? (
                    accountData.accounts.map((account, index) => (
                        <UserMoney 
                            key={index}
                            title={account.title} 
                            content={account.content} 
                            subtitle={account.subtitle} 
                        />
                    ))
                ) : (
                    <div>No accounts available</div>
                )}
            </section>
        </main>
    );
}

export default User;
