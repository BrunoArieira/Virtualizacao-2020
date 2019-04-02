FROM node:10
WORKDIR .
COPY /package*.json ./
RUN npm install
RUN npm install passport
USER node
COPY . .
COPY --chown=node:node . .
USER node
EXPOSE 4000
ENTRYPOINT ["npm", "start"]