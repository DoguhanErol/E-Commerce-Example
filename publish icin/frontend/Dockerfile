# 1. Aşama: Frontend Build
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

# Gerekli bağımlılıkları yükle
RUN npm install

# 'serve' paketini global olarak yükle
RUN npm i -g serve

# Tüm dosyaları kopyala
COPY . .

# Frontend build işlemini yap
RUN npm run build

# Sadece Nginx ile çalışacak 2. aşama
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
