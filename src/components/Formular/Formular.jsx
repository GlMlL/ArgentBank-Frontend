import React from 'react'; 
import '../../styles/Formular.css';

function Formular({ label, type, content, value, onChange, placeholder, autocomplete, readOnly }) {
    return (
        <div className='form_content'>
            <label htmlFor={content}>{label}</label>
            <input 
                type={type} 
                id={content} 
                name={content} 
                value={value} 
                placeholder={placeholder} 
                onChange={onChange} 
                autoComplete={autocomplete} 
                readOnly={readOnly} // Ajout explicite de l'attribut readOnly
            />
        </div>
    );
}

export default Formular;
