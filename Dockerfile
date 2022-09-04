FROM ubuntu:focal

RUN apt-get update

RUN apt-get install -y openssl curl

RUN curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install -y nodejs

RUN apt-get install -y libnss3

ARG DATABASE_URL=$DATABASE_URL

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]