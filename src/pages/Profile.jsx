import React, { useEffect, useCallback,  } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import "../styles/Profile.css";
import UserNameEditor from "../components/UserNameEditor/UserNameEditor";
import UserMoney from "../components/UserMoney/UserMoney";
import { userProfile } from '../redux/reducers/authUserSlice'; 
import accountData from "../data/accountData.json"; // Fallback des données locales

function User() {
    const dispatch = useDispatch();

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
    
            if (response.status === 200) {
                const responseData = response.data.body;
                dispatch(userProfile(responseData));
            } else {
                console.error("Error response: ", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    }, [dispatch]);
    
    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        if (authToken) {
            fetchDataProfile(authToken);
        }
    }, [fetchDataProfile]);
     // Ajoute fetchDataProfile dans la liste des dépendances

    return (
        <main className="main_user">
            <UserNameEditor />
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
        </main>
    );
}

export default User;