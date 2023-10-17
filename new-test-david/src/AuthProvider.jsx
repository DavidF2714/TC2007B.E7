const authProvider = {
  login: async ({ username, password }) => {
    const request = new Request('https://localhost:1337/login', {
      method: 'POST',
      body: JSON.stringify({ "username": username, "password": password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    try {
      const response = await fetch(request);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      const auth = await response.json();
      localStorage.setItem('auth', auth.token);
      localStorage.setItem('identity', JSON.stringify({ "id": auth.id, "fullName": auth.fullName }));
      return Promise.resolve();
    } catch {
      throw new Error('Error en usuario o contraseña');
    }
  },
  logout: () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("identity");
    return Promise.resolve();
  },
  checkAuth: () => {
    return localStorage.getItem("auth") ? Promise.resolve() : Promise.reject();
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("auth");
      localStorage.removeItem("identity");
      return Promise.reject(); 
    }
    return Promise.resolve();
  },
  getIdentity: () => {
    try {
      return Promise.resolve(JSON.parse(localStorage.getItem("identity")));
    } catch {
      return Promise.reject();
    }
  },
  getPermissions: () => {
    const token = localStorage.getItem('auth');
    if (token) {
      // Decodificar el token manualmente (puede variar dependiendo de tu token)
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        if (payload && payload.permissions) {
          const userPermissions = payload.permissions;
          console.log('Permisos del usuario:', userPermissions); 
          return Promise.resolve(userPermissions);
        }
      }
    }
    // En caso de no encontrar permisos, devuelve un arreglo vacío u otro valor predeterminado
    return Promise.resolve([]);
  },
};

export default authProvider;
