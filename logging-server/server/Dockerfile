FROM node:20 as base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

FROM base as prod
CMD ["sh","-c","/usr/src/app/scripts/prod_start.sh"]
