FROM node:22.16-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:22.16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 4000

CMD ["node", "dist/main.js"]