FROM public.ecr.aws/bitnami/node:14

WORKDIR /app



COPY . ./

ENV PORT 3000
ENV dbURI "mongodb+srv://shyam:passw0rd@cluster0.7jmb0.mongodb.net/amazon-price-tracker?retryWrites=true&w=majority"
ENV jwtSecret "hi there"
ENV bucketName "amazon-price-tracker"

EXPOSE 3000

RUN ["chmod", "+x", "/usr/local/bin/docker-entrypoint.sh"]
CMD ["npm", "start"]
