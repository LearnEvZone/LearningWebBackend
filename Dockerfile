from node:18
WORKDIR /app
copy package*.json ./
run npm install
copy . .
expose 8080
run ['node' , 'index.js']