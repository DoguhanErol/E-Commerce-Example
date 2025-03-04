# Resmi Node.js imajını kullan
FROM node:18

# Gerekli paketleri yükle
RUN apt-get update && apt-get install -y git

# Çalışma dizini
WORKDIR /app

# Bağımlılıkları önceden yüklemek için package.json ve package-lock.json'ı kopyala
COPY package*.json ./

# node_modules'in container içinde kalmasını sağla
RUN npm install

# Portları aç
EXPOSE 5173

# Uygulamayı başlat
CMD ["npm", "run", "dev", "--", "--host"]
