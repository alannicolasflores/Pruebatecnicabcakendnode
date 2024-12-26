# Usa una imagen base de Node.js
FROM node:20

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia los archivos del proyecto al contenedor
COPY package*.json ./
COPY . .

# Instala las dependencias
RUN npm install

# Crea un directorio para las imágenes subidas
RUN mkdir -p uploads

# Expone el puerto de la aplicación
EXPOSE 3000

# Inicia la aplicación
CMD ["node", "app.js"]
