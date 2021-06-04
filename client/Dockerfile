FROM node:15.14.0-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /usr/app/client
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:15.14.0-alpine AS builder
WORKDIR /usr/app/client
COPY . .
COPY .env .env
COPY --from=deps /usr/app/client/node_modules ./node_modules
RUN yarn build

FROM node:15.14.0-alpine AS runner
WORKDIR /usr/app/client
ENV NODE_ENV production

COPY --from=builder /usr/app/client/public ./public
COPY --from=builder /usr/app/client/.next ./.next
COPY --from=builder /usr/app/client/node_modules ./node_modules
COPY --from=builder /usr/app/client/package.json ./package.json

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /usr/app/client/.next
USER nextjs

EXPOSE 3000
CMD ["yarn", "start"]