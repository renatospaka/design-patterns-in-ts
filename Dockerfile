FROM node:16.15.1-alpine3.16

RUN apk add --no-cache bash && \
    apk add tzdata && \
    cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime

WORKDIR /home/node/app

RUN npm install npm@8.14.0 --location=global && \
    npm install typescript --save-dev

USER node
COPY . ./

# CMD ["npm", "start"]
CMD ["tail", "-f", "/dev/null"]