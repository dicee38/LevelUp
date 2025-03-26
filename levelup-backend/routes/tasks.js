const express = require('express');
const router = express.Router();

const { createTask, getTasks } = require('../controllers/taskController');

router.post('/', createTask);
router.get('/', getTasks);
router.get('/test', (req, res) => {
    res.json({ status: 'API is working' });
  });

module.exports = router; // Экспортируем роутер