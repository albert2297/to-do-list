# Etapa de construcción
FROM node:18-alpine3.17 AS build

# Instala pnpm globalmente
RUN npm install -g pnpm

WORKDIR /app

# Copia solo archivos esenciales para instalar dependencias
COPY package.json pnpm-lock.yaml ./

# Instala las dependencias de producción y desarrollo en un solo paso
RUN pnpm install --frozen-lockfile

# Copia el resto de los archivos después de instalar dependencias para mejorar el cacheo
COPY . .

# Realiza el build del proyecto
RUN pnpm run build

# Etapa final para servir la aplicación
FROM nginx:alpine

# Copia los archivos construidos desde la etapa de construcción
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Inicia NGINX en primer plano
CMD ["nginx", "-g", "daemon off;"]
