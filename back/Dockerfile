# Usa la imagen oficial de Node.js 18
FROM node:18 AS build

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install --omit=dev

RUN npm install -g @nestjs/cli

# Copia el resto del código de la aplicación
COPY . .

# Compila la aplicación
RUN npm run build

# Etapa de producción
FROM node:18 AS production

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia las dependencias de la etapa de build
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package*.json ./
RUN npm install --omit=dev

# Exponer el puerto en el que la app escuchará
EXPOSE 3001

# Comando para ejecutar la aplicación
CMD ["node", "dist/main"]