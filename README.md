# Fullstack Developer Test - Horacio Gonzalez

A brief description of what this project does and who it's for


## Backend Installation
Step 1: Installation
On the root of the project, run:

```bash
  npm install 
```
    
Step 2: Initialize databse executing this on the root:
```bash
  docker compose up -d
```

Step 3: Search the .env.example file and rename it to .env

Step 4: Run the migrations with: 
```bash
  npm run typeorm migration:run -- -d src/data/sources/postgresDatasource.ts
```

Step 4: Run the project with the command 
```bash
  npm run dev
```

## Live App

App will be live on

```bash
    https://horacio-truenorth-ui.vercel.app/
```



You will be able to log in with the following credentials: 
```bash
email: truenorthuser@test.com
password: test123456
```
