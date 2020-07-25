# Installation

## Prerequisites

You will need these before you start:

 - [**NodeJS**](https://nodejs.org/) - JsBattle is written in JavaScript so NodeJS and NPM are required
 - Java SE Runtime Environment 8 or Above Version
 
 Linux Commands

 ```sh
 $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
 $ nvm install stable 
 $ apt-get install openjdk-8-jre
 ```

## Install From Repository

Clone Repository
```sh
$ git clone https://github.com/gary-ascuy/jsbattle.git
```

NPM Commands:
```sh
$ npm install 
$ npm run bootstrap 
$ npm run build 
$ npm start 
```

## Install NPM package ( Original Version )

Install and start JsBattle:

```bash
  npm install jsbattle -g
  jsbattle start
```

The command will output URL of the server:

```
[2020-01-15 16:47:42.426] INFO  BROKER: Moleculer is starting...
[2020-01-15 16:47:42.429] INFO  BROKER: Namespace: jsbattle
[2020-01-15 16:47:42.430] INFO  BROKER: Serializer: JSONSerializer
[2020-01-15 16:47:42.567] INFO  API: API Gateway created!
[2020-01-15 16:47:42.580] INFO  APIGATEWAY: webserver started at http://localhost:8080
[2020-01-15 16:47:43.561] INFO  BROKER: ServiceBroker is started successfully.
```

Open your favourite web browser and navigate to URL from the previous step

```
  http://localhost:8080
```

It will open JsBattle:

![challenges screen](./img/challenges.png)
