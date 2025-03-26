const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 8080;
const MAX_RETRIES = 5;
const RETRY_DELAY = 5000;

// Настройки CORS для работы с фронтендом
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Основной роут для проверки работы сервера
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Backend server is running',
    endpoints: {
      tasks: '/api/tasks',
      healthcheck: '/api/healthcheck'
    }
  });
});

// Роут для проверки здоровья сервера
app.get('/api/healthcheck', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message
    });
  }
});

// Подключаем роуты задач
app.use('/api/tasks', taskRoutes);

// Обработка 404 ошибок
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found'
  });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

async function initializeServer() {
  let retries = 0;
  
  while (retries < MAX_RETRIES) {
    try {
      await sequelize.authenticate();
      console.log('✅ Database connection established');

      await sequelize.sync();
      console.log('🔄 Database synchronized');

      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`🔗 Access URLs:
  Local: http://localhost:${PORT}
  Network: http://${getIpAddress()}:${PORT}`);
      });
      
      return;
    } catch (err) {
      retries++;
      console.error(`⚠️ Connection attempt ${retries}/${MAX_RETRIES} failed:`, err.message);
      
      if (retries < MAX_RETRIES) {
        console.log(`⏳ Retrying in ${RETRY_DELAY/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      } else {
        console.error('❌ Max retries reached. Exiting...');
        process.exit(1);
      }
    }
  }
}

// Функция для получения IP-адреса (для логов)
function getIpAddress() {
  const interfaces = require('os').networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

initializeServer();