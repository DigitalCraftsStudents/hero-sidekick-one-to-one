## Basic setup
```sh
git init
npm init -y
echo "node_modules" >> .gitignore
```

### Install node modules

```sh
npm i --save-dev nodemon sequelize-cli
npm i express morgan express-es6-template-engine sequelize pg pg-hstore dotenv
```

### Write a hello world to make sure it works!

```sh
touch index.js
```

### Add `dev` script to `package.json`

## Sequelize setup

### make it dotenv-aware

- `echo ".env" >> .gitignore`
- `touch .sequelizerc` (or copy from another project!)
- `npx sequelize init`
- fill out our `config/config.js`
    - add `require('dotenv').config()` at top
    - add a `module.exports = `
    - put in `process.env` variables
    - change dialect to `'postgres'`
- `touch .env`
    - put real credentials in `.env` file
- add `require('dotenv').config()` at top of `models/index.js`

### Generate models

### Set up my FK

### Define the assoications

### Migrate the database

### Create seed data for Heroes and Sidekicks

### Migrate the seed data

## Call Sequelize Models from Controllers functions!