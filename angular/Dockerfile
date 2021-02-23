FROM node:latest as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
CMD $(npm bin)/ng serve --host 0.0.0.0
