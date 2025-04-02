require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
const taskRoutes = require('./tasks');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);

const PORT = 8000; // Теперь совпадает с docker-compose

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});