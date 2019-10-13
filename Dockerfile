FROM node:10-slim
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN yarn test
CMD ["yarn", "start"]