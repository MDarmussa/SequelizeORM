
Sequelize ORM(Object-Relational-Mapper (ORM) libraries)

- https://sequelize.org/v6/index.html  //more info to know about Sequelizing

SETUP
mkdir photo-sharing-app
cd photo-sharing-app
npm init -y
npm i express sequelize pg
npm i --save-dev nodemon sequelize-cli
touch index.js


on config.json:
- change the username ("username": "mhamedmussa",) / username from my localhost on postgres
- change the dialect to postgres ("dialect": "postgres")


Run:
npx sequelize-cli init

run:
- npx sequelize-cli db:create  //create a badabase on my localhost on postgres


run:
npx sequelize-cli db:migrate //create the tables

run:
npx sequelize-cli seed:generate --name user //This will create a new file in your seeders directory

- on seeder folder > 2022***.user.
past
('use strict'; module.exports = { up: async (queryInterface, Sequelize) => { await queryInterface.bulkInsert('Users', [{ firstName: 'Annie', lastName: 'Easley', email: 'ajeasley@nasa.gov', createdAt: new Date(), updatedAt: new Date() }], {}); }, down: async (queryInterface, Sequelize) => { return queryInterface.bulkDelete('Users', null, {}); } }; )


- download extention pretier
select all the seed then right click > format > chose pretier




- To do queries and render the db on our terminal, run
      psql database_development
      select * from "Users";


- follow the index.js

- some methods can be use in Sequelize:
.create()
.findAll()
.findByPk()
.update()
.destroy()



