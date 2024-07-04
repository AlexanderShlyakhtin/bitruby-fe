export const environment = {
  production: false,
  usersServiceUrl: "https://localhost:8081/users/api/v1",
  authServiceUrl: "http://localhost:9000/auth/api/v1",
  auth: {
    authority: 'http://localhost:9000/auth/api/v1',
    postLogoutRedirectUri: '/',
    clientId: 'client',
    scope: 'openid offline_access', // 'openid profile offline_access ' + your scopes
    silentRenew: true,
    client_secret: 'secret',
  }
};
