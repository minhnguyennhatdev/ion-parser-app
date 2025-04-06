# How to run

## Running Locally

### 1. Docker

**Prerequisite:** [Docker](https://www.docker.com/)

> _Note: first time build may take time, about 3~5 minutes_

```bash
  docker compose up
```

### 2. Self host

**Prerequisite:**

- [Nodejs v20 or later](https://nodejs.org/en)
- [Yarn](https://yarnpkg.com/)

> _You need 2 terminal to host server and client_

Start server

```bash
  cd server && yarn && yarn build && yarn start
```

Start client

```bash
  cd client && yarn && yarn build && yarn start
```
