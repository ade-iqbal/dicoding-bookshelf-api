# Menggunakan Node.js versi 20 sebagai base image
FROM node:20-alpine

# Set working directory di dalam container
WORKDIR /usr/src/app

# Copy package.json dan package-lock.json (jika ada)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy seluruh source code aplikasi
COPY . .

# Expose port yang digunakan oleh HapiJS (default 3000, sesuaikan jika berbeda)
EXPOSE 3000

# Command untuk menjalankan aplikasi
CMD ["node", "./src/server.js"]