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

nx run backend:serve
