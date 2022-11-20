FROM node:16.16-alpine3.16

RUN apk update && apk upgrade && \
    apk add --no-cache bash curl && \
    apk add --no-cache git && \
    apk add --no-cache sqlite~=3.38.5-r0 && \
    apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime

WORKDIR /home/node/app

RUN npm install npm@8.17.0 --location=global && \
    npm install typescript --location=global && \
    npm install nodemon --location=global

COPY package*.json ./
RUN npm install

USER node
COPY . ./

# CMD ["npm", "start"]
CMD ["tail", "-f", "/dev/null"]