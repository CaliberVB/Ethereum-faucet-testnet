FROM node:18-alpine as builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build

###################
FROM node:18-alpine
WORKDIR /app
WORKDIR /app
COPY --from=builder /app/dist/package.json /app/
RUN yarn install \
  && rm -rf /var/cache/apk/* \
  && rm -rf /usr/local/share/.cache/yarn/*
COPY --from=builder /app/dist /app
CMD ["yarn", "next", "start", "-p", "3000"]
