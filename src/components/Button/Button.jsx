import React from 'react';
import '../../styles/button.css';
function Button({ content, event, onClick }) {
  return (
      <button event={event} onClick={onClick}>
          {content}
      </button>
  )
}

export default Button;
