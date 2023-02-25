FROM node:16.19.1-bullseye-slim

COPY . .
WORKDIR /app

RUN ["npm", "install"]

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
