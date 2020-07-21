# Stage 1 - React Build
FROM node:latest
LABEL maintainer="Gary Ascuy<gary.ascuy@gmail.com>"

WORKDIR /jsbattle/app
COPY . .
RUN npm install && npm run all
