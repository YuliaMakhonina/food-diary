module.exports = {
  app: {
    port: 3000,
    secretKey: 'food-diary-secret-number-one',
    bcryptCircles: 1,
    algorithm: 'HS512',
    tokenExpire: 3600,
  },
  db: {
    url:
      process.env.DATABASE_URL ||
      'postgres://docker:docker@localhost:15432/food-diary',
  },
};
