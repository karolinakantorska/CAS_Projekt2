# MTB Guide Booking App

This project is a finnal projec of CAS Front End Engeeniering course. It was created to learn front end and backend technologies.
App to manage a portfolio of mountainbiking guides and book an appointment in their calendars.

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)

## Technologies

Frontend:

```
- Apollo Client 3.1.3
- babel-core 6.26.3
- date-fns 2.16.1
- graphql 15.3.0
- Next.js 9.3.5
- next-router 1.3.6
- next-with-apollo 5.1.0
- React 16.13.1
- React Apollo - Common 3.1.4
- Styled Components 5.1.1

Backend:
```

- babel-preset-env 1.7.0
- bcryptjs 2.4.3
- cookie-parser 1.4.5
- dotenv 6.0.0
- graphql 0.13.2
- graphql-cli 2.16.7
- graphql-yoga 1.16.2
- jsonwebtoken 8.5.1
- nodemon 1.18.7
- npm-run-all 4.1.5
- prisma 1.17.1
- prisma-binding 2.1.6

## Setup

To run this project, install it locally using npm:
Download the project from this repo. You will have to folders backend and frondend.

To install frontend:

```
$ cd ../frontend
$ npm install
$ npm run dev
```

To install backend:
$ cd ../backend
$ npm install

I have been using demo server from prisma to use it:
you will need my .env file please writte an email to karolina.kantorska@gmail.com to get it
copy .env file to the backend folder
$ npm run dev

NOT TO CONSIDER FOR A MOMENT:
$ sign up into Prisma account and login
https://www.prisma.io
$ sign up into demo server from Prisma
$ cd ../backend
install Prisma globally:
$ npm i -g prisma
$ prisma login
$ prisma init
from the options choose a demo server
choose the region
choose a name for the service
choose a name of the stade (dev)
