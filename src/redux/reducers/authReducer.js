const initialState = {
    user: null, // L'utilisateur est null au début
    token: null, // Le token est également null au départ
    error: null, // Les erreurs d'authentification, si elles existent
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'auth/login':
        return {
          ...state,
          user: action.payload.user, // Ajoute l'utilisateur aux données du state
          token: action.payload.token, // Ajoute le token d'authentification
          error: null, // Réinitialise l'erreur
        };
  
      case 'auth/logout':
        return {
          ...state,
          user: null, // Réinitialise les informations de l'utilisateur
          token: null, // Réinitialise le token
          error: null, // Réinitialise les erreurs
        };
  
      case 'auth/setError':
        return {
          ...state,
          error: action.payload, // Enregistre les erreurs dans l'état
        };
  
      default:
        return state;
    }
  };
  
  export default authReducer;
  