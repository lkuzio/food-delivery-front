FROM node:7.1

RUN mkdir -p /usr/src/app/

WORKDIR /usr/src/app/

COPY package.json /usr/src/app/

RUN npm install --global angular-cli

COPY . /usr/src/app/

EXPOSE 4200 49153

CMD ["npm", "start"]
