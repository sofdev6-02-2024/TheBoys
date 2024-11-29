export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET || 'super_secret',
  },
});
