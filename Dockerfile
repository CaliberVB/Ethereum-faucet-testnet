FROM node:18-alpine as builder

ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY .yarnrc.yml .yarnrc.yml
COPY .yarn/releases ./.yarn/releases
RUN yarn install
COPY . .
RUN yarn build
RUN cat dist/package.json
RUN ls -lha dist

###################
FROM node:18-alpine

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

WORKDIR /app
COPY .yarnrc.yml .yarnrc.yml
COPY .yarn/releases ./.yarn/releases
COPY --from=builder /app/dist/package.json /app/
RUN yarn install \
  && rm -rf /var/cache/apk/* \
  && rm -rf /usr/local/share/.cache/yarn/*
COPY --from=builder /app/dist /app
CMD ["yarn", "next", "start", "-p", "3000"]
