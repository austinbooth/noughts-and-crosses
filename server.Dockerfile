FROM node:14-alpine
WORKDIR /noc_server
COPY ./package*.json ./
RUN npm install
COPY ./ ./