export default () => ({
  keycloak: {
    realm: process.env.KEYCLOAK_REALM || 'body-boost',
    domain: process.env.KEYCLOAK_DOMAIN || 'http://host.docker.internal:8080',
    client_id: process.env.KEYCLOAK_CLIENT_ID || 'nextjs',
    client_secret:
      process.env.KEYCLOAK_CLIENT_SECRET || 'GwiCZfxus2kTB6e14glNJDAf63VjoNKv',
  },
});
