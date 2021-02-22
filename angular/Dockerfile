FROM node:latest as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
RUN ng serve --host 0.0.0.0 --port 4200
