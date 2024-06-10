# PB138 project - Part-time jobs

## Setup

```cd workspace```

```npm i```

### Running FE

```npx nx run frontend:serve```

### Running BE

```cd backend```

create .env file according to .env.example

```docker compose -f db-docker-compose.yaml up -d```

```npx prisma migrate dev```

```npx prisma generate```

```npx tsx seed/seed.ts```

```docker run -d -p 6379:6379 redis```

```npx nx run backend:serve```

## Types

Types is a library shared between FE and BE. When defining DTOs (which in the case of such simple application as ours are probably going to be the only types used), you should define them in this library and just import them on both BE and FE instead of defining them twice. As shown, the basic entities should also be defined just by importing types from Prisma, instead of defining prisma models and typescript objects separately.
