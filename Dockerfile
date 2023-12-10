FROM node:20-alpine AS build

WORKDIR /app

COPY ./package*.json .
COPY ./prisma ./prisma

RUN npm install

COPY ./ .

RUN npx prisma generate
RUN npm run build

###
FROM node:20-alpine
WORKDIR /app

EXPOSE 3000
COPY --from=build /app/package*.json .
COPY --from=build /app/prisma ./prisma
RUN npm install
# --omit=dev
COPY --from=build /app/dist ./dist

CMD ["npm", "run", "start:prod"]

