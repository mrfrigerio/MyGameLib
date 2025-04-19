FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate

###
# Development
###
# EXPOSE 3033
# CMD ["npm", "run", "start:dev"]

###
# Production
###
RUN npm run build
EXPOSE 3033
CMD ["npm", "start"]
