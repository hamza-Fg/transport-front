export const environment = {
    production: false,  // Indique que c'est un environnement de développement
    apiUrl: 'http://localhost:8080/api',  // URL de l'API en local (serveur local)
    mapApiKey: 'your-google-maps-api-key-here',  // Clé API Google Maps (remplacer par la vraie clé)
    authConfig: {
      loginUrl: 'http://localhost:8080/auth/login',  // URL de connexion pour l'authentification en local
      logoutUrl: 'http://localhost:8080/auth/logout',  // URL de déconnexion pour l'authentification en local
    },
  };
  