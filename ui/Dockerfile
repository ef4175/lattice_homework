FROM node:13.13.0

WORKDIR /ui

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn

COPY .env .env
COPY public public
COPY src src
