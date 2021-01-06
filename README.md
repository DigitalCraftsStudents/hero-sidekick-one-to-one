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

- if there is an example env file (usually named `dist.env`), make a copy and name it `.env`
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

- Hero is standalone
- Sidekick depends on hero, has a FK that points to them

```sh
npx sequelize model:generate --name Hero --attributes name:string
npx sequelize model:generate --name Sidekick --attributes 'name:string,heroId:integer'
```

#### (optional) Migrate any standalone tables

To confirm database connection is good.

```sh
npx sequelize db:migrate
```


### Set up my FK

The Sidekick points to the Hero using the Sidekick's `heroId`.
We need to tell Sequelize about this in the `models/sidekick.js`

```js
  Sidekick.init({
    name: DataTypes.STRING,
    heroId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Hero',
        key: 'id'
      }
    }
```

### Define the assoications

Always define both sides of the association!
That way, Sequelize can:

- create "magic methods"
- handle clean up and error checking

The associations can be described like this:

- A Hero has one (and only one) Sidekick
- A Sidekick belongs to one (and only one) Hero

#### `models/sidekick.js`

```js
    static associate(models) {
        Sidekick.belongsTo(models.Hero, {
            foreignKey: 'heroId'
        });
    }
```

#### `models/hero.js`

```js
    static associate(models) {
        Hero.hasOne(models.Sidekick, {
            foreignKey: 'heroId'
        });
    }
```

### Migrate the database

### Create seed data for Heroes and Sidekicks

### Migrate the seed data

## Call Sequelize Models from Controllers functions!