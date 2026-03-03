FROM node:25-alpine AS build

WORKDIR /app

COPY src package.json package-lock.json tsconfig.json /app/

RUN npm ci && npm run build

FROM node:25-alpine

WORKDIR /app

COPY --from=build /app/package.json /app/dist /app/ 

RUN npm i --omit=dev

EXPOSE 8080

ENTRYPOINT ["npm", "run", "start"]