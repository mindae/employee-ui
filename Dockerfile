# Stage 1 - Build React
FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2 - Run Nginx
FROM nginx:alpine

COPY default.conf.template /etc/nginx/templates/default.conf.template

COPY --from=build /app/dist /usr/share/nginx/html

# Only substitute our custom variables.
# Preserve Nginx variables such as $host and $uri.
ENV NGINX_ENVSUBST_FILTER="^API_GATEWAY_"

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]