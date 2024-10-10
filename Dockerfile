# Usar una imagen base de Node.js
FROM node:16-alpine

# Crear el directorio de trabajo
WORKDIR /app

# Copiar el package.json y lock (si existe) y ejecutar npm install
COPY package*.json ./
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto donde escuchará el servidor
EXPOSE 4250

# Comando para iniciar la aplicación
CMD ["npm", "start"]