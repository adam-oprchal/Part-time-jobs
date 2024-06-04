# PB138 project - Part-time jobs

Commands starting with nx might need to be prefixed with `npx` if nx is not installed globally.

## Running FE

cd workspace

npm i

nx run frontend:serve

## Running BE

create .env file in backend folder according to .env.example

cd backend

docker compose -f db-docker-compose.yaml up -d

npx prisma migrate dev

npx prisma generate

npx tsx seed/seed.ts

nx run backend:serve

## Types

Types is a library shared between FE and BE. When defining DTOs (which in the case of such simple application as ours are probably going to be the only types used), you should define them in this library and just import them on both BE and FE instead of defining them twice. As shown, the basic entities should also be defined just by importing types from Prisma, instead of defining prisma models and typescript objects separately.
