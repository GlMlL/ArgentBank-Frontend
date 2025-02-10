import '../../styles/button.css';

function Button({ content, onClick }) {
  return (
      <button onClick={onClick}>
          {content}
      </button>
  );
}

export default Button;
