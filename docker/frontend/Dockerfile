FROM node:latest

ENV NODE_OPTIONS --openssl-legacy-provider

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN yarn install

EXPOSE 3000
CMD [ "yarn", "start" ]

