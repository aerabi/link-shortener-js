FROM node:16

COPY . .
WORKDIR /app

RUN ["npm","install","global","@nestjs/cli"]
RUN ["npm", "install", "redis@4.1.0" ]
RUN ["npm", "install"]

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
