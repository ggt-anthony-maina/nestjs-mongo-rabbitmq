<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

NEST JS PAYEVER TEST APPLICATION
To run the application you will need to begin with installation to install the necessary node_modules as well as the necessary dependencies used in this application which will be under installation.

## Installation
 
```bash
$ npm install
```
## Mongo Db installation 
The database used for the application is the Mongo db where to install you access the mongo db website [Here](https://www.mongodb.com/try/download/community), and then running it locally in your machine, where you can even access the mongo db Compass 

## Rabbit MQ installation
Create a docker image by pulling one from the latest available one of the management option. Here are the steps:
Pull the RabbitMQ Docker Image

Open a terminal (Command Prompt, PowerShell, or a terminal in your IDE) and pull the RabbitMQ Docker image with the management plugin. The management plugin provides a web-based UI for managing RabbitMQ.

```bash

$ docker pull rabbitmq:3.13-management

```


Run the RabbitMQ container with the management plugin enabled. You can specify ports to expose and set default credentials.
```bash

$ docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 -e RABBITMQ_DEFAULT_USER=guest -e RABBITMQ_DEFAULT_PASS=guest rabbitmq:3.13-management

```

-d: Run the container in detached mode.
--name rabbitmq: Name the container rabbitmq.
-p 5672:5672: Map RabbitMQ's default AMQP port to your host.
-p 15672:15672: Map the RabbitMQ management plugin's web UI port to your host.
-e RABBITMQ_DEFAULT_USER=guest: Set the default RabbitMQ username.
-e RABBITMQ_DEFAULT_PASS=guest: Set the default RabbitMQ password.
Verify RabbitMQ is Running

You can check if RabbitMQ is running using Docker commands:

```bash

$ docker ps

```
You should see the RabbitMQ container listed.

Access RabbitMQ Management UI

Open your web browser and navigate to [rabbitMQ](http://localhost:15672). You should see the RabbitMQ management interface.

Username: guest
Password: guest
Configure RabbitMQ (Optional)

You can configure RabbitMQ settings through the management UI or by using RabbitMQ CLI commands if needed.

Example Docker Commands
Stop the RabbitMQ Container

```bash

$ docker stop rabbitmq

```

Remove the RabbitMQ Container

```bash

$ ddocker rm rabbitmq

```
See the logs for rabbit mq
```bash

$ docker logs rabbitmq

```

This setup provides a running RabbitMQ instance on your local machine, accessible via Docker. The management plugin UI at [RabbitMQManagement](http://localhost:15672) will allow you to manage queues, exchanges, and users.

## Adding the .env
You will need to have a .env at the root of your project and provide the mongo db abd rabbitMQ URI you are running your instances from e.g
````
MONGO_URI=mongodb://localhost:27017/users
RABBITMQ_URI=amqp://guest:guest@localhost:5672

````
## Running the app
Please note that the application is set to run at: http://localhost:3000/ so for instance to retrieve a certain user Avatar, this would look like something like http://localhost:3000/users/669c193cf4bc03ca86faca68/Avatar
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Documeting the API and testing endpoints
Use Postman to test the endpoints 
