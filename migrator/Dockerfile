FROM node:18-alpine
WORKDIR /app
COPY migrator/package.json migrator/yarn.lock ./
RUN yarn install
COPY ./prisma ./prisma

COPY migrator/run.sh .

ENTRYPOINT sh run.sh
