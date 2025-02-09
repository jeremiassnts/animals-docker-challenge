FROM node:22.3.0 AS build

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

RUN npm ci --only=production

FROM node:22.3.0-alpine3.20

RUN apk add --no-cache openssl

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json .
COPY --from=build /usr/src/app/.env .
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "run", "start:prod"]