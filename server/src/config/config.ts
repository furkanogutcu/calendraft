export default () => ({
  JWTSecret: process.env.JWT_SECRET,
  JWTExpiresIn: process.env.JWT_EXPIRES_IN || 86400, // 1 day (https://github.com/vercel/ms)
  bcryptSaltRound: process.env.BCRYPT_SALT_ROUND || 12,
});
