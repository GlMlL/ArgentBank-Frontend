import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUsername } from '../../redux/reducers/authUserSlice';
import '../../styles/UserNameEditor.css';
import axios from "axios";
import Formular from "../Formular/Formular";
import Button from "../Button/Button";

function UserNameEditor() {
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.user); // récupération des données user
    const userToken = useSelector((state) => state.user.token); // récupération du token

    const [isOpen, setIsOpen] = useState(false); // formulaire fermé par défaut
    const [editedName, setUserName] = useState(userProfile.userName || ""); // Définit état username avec fallback

    // Fermeture formulaire d'édition + save
    const saveMonney = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(
                "http://localhost:3001/api/v1/user/profile",
                {
                    userName: editedName,
                },
                {
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );
            if (response.status === 200) {
                const respData = response.data;
                dispatch(updateUsername(editedName)); // Mets à jour username dans store
                setIsOpen(false);
            } else {
                console.error("Error response: ", response.statusText);
            }
        } catch (error) {
            console.error("Error - editName : ", error);
        }
    };

    useEffect(() => {
        if (userProfile && userProfile.userName) {
            setUserName(userProfile.userName); // Mise à jour username si disponible
            console.log("useEffect object : ", userProfile.userName);
        } else {
            console.log("userProfile or userProfile.userName not found");
        }
    }, [userProfile]); // Ajoutez userProfile dans les dépendances pour déclencher le useEffect

    return (
        <section className="section-user">
            {!isOpen ? (
                <>
                    <h2 className="title-user">
                        Welcome back
                        <br />
                        {!userProfile || !userProfile.userName ? (
                            <>
                                {userProfile.firstName} {userProfile.lastName}
                            </>
                        ) : (
                            <>{userProfile.userName}</>
                        )}
                        !
                    </h2>
                    <Button
                        content="Edit Name"
                        onClick={() => {
                            setIsOpen(true);
                        }}
                    />
                </>
            ) : (
                <>
                    <h2 className="title-user">Edit user info</h2>
                    <div className="modal">
                        <form onSubmit={saveMonney}>
                            <Formular
                                label="User Name :"
                                type="text"
                                content="userName"
                                placeholder={userProfile.userName || "Enter username"}
                                onChange={(event) => setUserName(event.target.value)}
                            />
                            <Formular
                                label="First Name :"
                                type="text"
                                content="firstName"
                                placeholder={userProfile.firstName || "First name"}
                            />
                            <Formular
                                label="Last Name :"
                                type="text"
                                content="lastName"
                                placeholder={userProfile.lastName || "Last name"}
                            />
                            <div className="userButton">
                                <Button content="Save" width="80px" height="40px" />
                                <Button
                                    content="Cancel"
                                    onClick={() => {
                                        setIsOpen(false);
                                    }}
                                />
                            </div>
                        </form>
                    </div>
                </>
            )}
        </section>
    );
}

export default UserNameEditor;
