# Gunakan Node.js versi stabil
FROM node:16

# Set working directory
WORKDIR /usr/src/app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh kode aplikasi
COPY . .

# Expose port aplikasi
EXPOSE 5000

# Jalankan aplikasi
CMD ["npm", "start"]
