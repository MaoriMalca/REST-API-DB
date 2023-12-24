FROM node:16
WORKDIR /RESTapiToBD
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
