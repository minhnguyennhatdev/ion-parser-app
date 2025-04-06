FROM node:20-alpine

WORKDIR /app

# Install app dependencies
COPY package.json yarn.lock /app/
RUN yarn install --frozen-lockfile --non-interactive --cache-folder .yarn-cache

# Bundle app source
COPY . .

RUN yarn build

EXPOSE 3000

CMD [ "node", "dist/main" ]
