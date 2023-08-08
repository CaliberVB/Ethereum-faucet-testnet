FROM node:18-alpine as builder

RUN apk add --no-cache
WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY .yarnrc.yml .yarnrc.yml
COPY .yarn/releases ./.yarn/releases
RUN yarn install
COPY . .
RUN yarn build

FROM node:18-alpine
RUN apk add --no-cache
WORKDIR /app
COPY --from=builder /app/package.json /app/
COPY yarn.lock .
COPY .yarnrc.yml .yarnrc.yml
COPY .yarn/releases ./.yarn/releases
RUN yarn install \
  && rm -rf /var/cache/apk/* \
  && rm -rf /usr/local/share/.cache/yarn/*
COPY --from=builder /app/.next /app/
CMD ["yarn", "start"]
