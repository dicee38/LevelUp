FROM node:16

WORKDIR /app

# Сначала копируем только package.json
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Затем копируем всё остальное
COPY . .

EXPOSE 8080

CMD ["node", "index.js"]