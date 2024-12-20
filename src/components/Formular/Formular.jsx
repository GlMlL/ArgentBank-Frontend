import React from 'react';
import '../../styles/Formular.css';

function formular({ label, type, content, value, onChange, placeholder, autocomplete }) {
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
            />
        </div>
    );
}

export default formular;
