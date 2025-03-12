const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const taskRoutes = require('./routes/tasks'); // Импортируем роутер

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Роуты
app.use('/api/tasks', taskRoutes); // Используем роутер как middleware

// Запуск сервера
const PORT = process.env.PORT || 8080;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});