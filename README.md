# PB138 project - Part-time jobs

## Running FE

cd workspace

npm i

nx run frontend:serve

## Running BE

cd backend

docker-compose -f .\db-docker-compose.yaml up -d

npx prisma migrate dev

npx prisma generate

nx run backend:serve
