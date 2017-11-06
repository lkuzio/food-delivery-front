FROM node:7.1

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN npm install --global angular-cli

COPY package.json /usr/src/app

RUN npm install && npm cache clean

COPY . /usr/src/app

EXPOSE 4200 49153

CMD ["npm", "start"]
