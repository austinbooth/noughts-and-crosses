FROM node:14-alpine
WORKDIR /noc
COPY ./package*.json ./
RUN npm install
COPY ./ ./
