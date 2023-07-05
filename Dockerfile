# build stage
FROM node:lts-bullseye-slim as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Debug: list the contents of the /app directory after the build
RUN ls -la /app

# production stage
FROM nginx:1.21.0-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


