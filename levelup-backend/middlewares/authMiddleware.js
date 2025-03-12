function authMiddleware(req, res, next) {
    // Логика авторизации
    next();
  }

  module.exports = authMiddleware;
  