FROM node:10
WORKDIR .
COPY /package*.json ./
USER node
COPY . .
COPY --chown=node:node . .
USER node
EXPOSE 9000
ENTRYPOINT ["npm", "start"]