import React from 'react';
import '../styles/Home.css';
import img_chat from "../../src/img/icon-chat.webp";
import img_money from "../../src/img/icon-money.webp";
import img_security from "../../src/img/icon-security.webp";
import Features from '../components/Feature/Feature.js';
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
          <div className='Features_card'>
              {featuresData.map((feature, index) => (
                  <Features
                      key={index}
                      image={images[feature.image]}  // Utilisation de l'image importée
                      alt={feature.alt}
                      title={feature.title}
                      content={feature.content}
                  />
              ))}
          </div>
      </main>
  );
}

export default Home;