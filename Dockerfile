FROM node:18-alpine as builder

ARG NEXT_PUBLIC_WALLET_ADDRESS
ENV NEXT_PUBLIC_WALLET_ADDRESS=$NEXT_PUBLIC_WALLET_ADDRESS

WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY .yarnrc.yml .yarnrc.yml
COPY .yarn/releases ./.yarn/releases
RUN yarn install
COPY . .
RUN NEXT_PUBLIC_WALLET_ADDRESS=$NEXT_PUBLIC_WALLET_ADDRESS yarn build

###################
FROM node:18-alpine
RUN apk add --no-cache curl
ENV NODE_ENV production

WORKDIR /app
COPY .yarnrc.yml .yarnrc.yml
COPY .yarn/releases ./.yarn/releases
COPY --from=builder /app/dist/package.json /app/
RUN cat package.json
RUN yarn install \
  && rm -rf /var/cache/apk/* \
  && rm -rf /usr/local/share/.cache/yarn/*
COPY --from=builder /app/dist /app
COPY ./prisma ./prisma
RUN ls -lha
RUN yarn prisma generate
CMD ["yarn", "next", "start", "-p", "3000"]
