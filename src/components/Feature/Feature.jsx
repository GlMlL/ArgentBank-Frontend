import React from 'react'
import '../../styles/Feature.css';


function features({ image, alt, title, content }) {// du bas du site (3 images) 
    return (
        <div className='section_features'>
            <img src={image} alt={alt} className="feature-icon" />
            <h3>{title}</h3>
            <p>{content}</p>
        </div>
    )
}

export default features