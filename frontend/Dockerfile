# Etapa 1 - build da aplicação
FROM node:20-alpine
WORKDIR /app
COPY package.json .
RUN npm install
RUN npm i -g serve
COPY . .

###
# Development
###
# EXPOSE 5173
# CMD [ "npm", "run", "dev"]

###
# Production
###

RUN npm run build
EXPOSE 4173
CMD [ "serve", "-s", "dist", "-l", "4173"]
