import React from 'react';
import '../styles/Home.css';
import img_chat from "../../src/img/icon-chat.webp";
import img_money from "../../src/img/icon-money.webp";
import img_security from "../../src/img/icon-security.webp";


import Banner from '../components/Banner/Banner.jsx';
import featuresData from '../store/featureData.json'; // Import du fichier JSON

const images = {
    img_chat,
    img_money,
    img_security
};

function Home() {
    return (
        <main className='main_home'>
            <Banner />
            
        </main>
    );
}

export default Home;