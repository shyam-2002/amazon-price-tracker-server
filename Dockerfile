FROM node:alpine

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . ./

ENV PORT 3000
ENV dbURI "mongodb+srv://shyam:passw0rd@cluster0.7jmb0.mongodb.net/amazon-price-tracker?retryWrites=true&w=majority"
ENV jwtSecret "hi there"
ENV bucketName "amazon-price-tracker"

EXPOSE 3000


CMD ["npm", "start"]