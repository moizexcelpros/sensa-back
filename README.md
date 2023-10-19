# Sensa Backend

<p align="center">
  <a href="http://nodejs.org/" target="blank"><img src="https://cdn.freebiesupply.com/logos/thumbs/2x/nodejs-1-logo.png" width="320" alt="node Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nodejscore" target="_blank"><img src="https://img.shields.io/npm/v/@nodejs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nodejscore" target="_blank"><img src="https://img.shields.io/npm/l/@nodejs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nodejscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nodejs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nodejs/node" target="_blank"><img src="https://img.shields.io/circleci/build/github/nodejs/node/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nodejs/node?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nodejs/node/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/node#backer" target="_blank"><img src="https://opencollective.com/node/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/node#sponsor" target="_blank"><img src="https://opencollective.com/node/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/node#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nodeframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nodeframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/node/backers/badge.svg)](https://opencollective.com/node#backer)
  [![Sponsors on Open Collective](https://opencollective.com/node/sponsors/badge.svg)](https://opencollective.com/node#sponsor)-->

## Description

[NodeJS](https://github.com/nodejs/nodejs.org) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Sample ENV

```
APP_ID=kmrauto
PORT=9001
LOG_LEVEL=debug
REQUEST_LIMIT=100kb
SESSION_SECRET=mySecret

JWT_SECRET=bezkoder-secret-key

#DATABASE
MONGODB_URI_LOCAL=
MONGODB_URI_DEV=
MONGODB_URI_PRODUCTION=
MONGODB_URI_STAGING=

debug= true
whitelist_url=http://localhost:3000,

APP_HOST=https://localhost:3000
APP_HOST_DEV=
APP_HOST_PRODUCTION=
APP_HOST_STAGING=

# SENDGRID API
SENDGRID_API_KEY=
APP_EMAIL_SENDER=

```

## Support

NodeJS is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nodejs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nodejs.com](https://nodejs.org/)
- Twitter - [@nodeframework](https://twitter.com/nodeframework)

## License

  NodeJS is [MIT licensed](https://github.com/nodejs/node/blob/master/LICENSE).
