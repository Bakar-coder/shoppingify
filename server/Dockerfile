FROM node:15.14.0-alpine
WORKDIR /usr/app/server
COPY package.json yarn.lock ./
COPY . .
RUN yarn install --frozen-lockfile
COPY .env.production .env
ENV NODE_ENV production
RUN yarn build
EXPOSE 8080
USER node
CMD ["yarn", "start"]