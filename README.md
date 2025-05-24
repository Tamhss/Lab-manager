<!-- ABOUT THE PROJECT -->

## About The Project

Name `LAB_AIOT_DNU`.

### Built With

Frameworks/libraries used to project

- Node
- Expressjs
- Nestjs
- Postgresql
- Prismaorm
- Docker
- Nextjs

<!-- GETTING STARTED -->

## Getting Started

Instructions on setting up your project locally.
To get a local copy up and running follow these steps.

### Prerequisites

- Node

```sh
  Node version >= 18.14.2

  Yarn version 1.22.19
```

### Create .env file like .env.example for both backend and frontend folder

```sh
copy file .env.example
```

### Running backend

```bash
$ cd packages/backend
$ docker compose up -d
$ yarn install
$ yarn db:migrate
$ yarn dev

```


### Running frontend

```bash
$ cd packages/frontend
$ yarn install
$ yarn dev

```