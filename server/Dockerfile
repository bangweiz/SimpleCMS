FROM node:18-alpine
WORKDIR "/app"
COPY ./package.json ./
RUN npm i
RUN npm i typescript -g
COPY . .
CMD ["npm", "run", "dev"]
