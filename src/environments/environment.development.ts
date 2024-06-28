export const environment = {
  production: false,
  usersServiceUrl: "https://127.0.0.1:8081/users/api/v1",
  authServiceUrl: "http://auth-server:9000/auth/api/v1",
  auth: {
    authority: 'http://auth-server:9000/auth/api/v1',
    postLogoutRedirectUri: '/',
    clientId: 'client',
    scope: 'openid offline_access', // 'openid profile offline_access ' + your scopes
    silentRenew: true,
    client_secret: 'secret',
  }
};
