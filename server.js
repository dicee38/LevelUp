const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // Импортируем cors

const app = express();
const port = 5000;

// Настройка подключения к PostgreSQL
const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'mydb',
  password: 'password',
  port: 5432,
});

// Middleware для обработки JSON
app.use(express.json());

// Включаем CORS
app.use(cors());

// Пример API endpoint
app.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});