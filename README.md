# Fullstack Developer Test - Horacio Gonzalez

A brief description of what this project does and who it's for

## Architecture:

Here are some details about the backend Architecture: 

It is implementing several design patterns, such as CQRS and Repository. The live version of the backend is Hosted on an AWS Elastic Beanstalk serverless instance, and the database is hosted on an AWS RDS Instance. Also, there is a pipeline for CI/CD on AWS CodePipeline, that is attached to the main branch of this repo.

The UI is hosted on Vercel.

I'm using TypeORM as ORM and TSyringe for dependency injection.

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
