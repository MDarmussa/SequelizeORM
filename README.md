
Sequelize ORM(Object-Relational-Mapper (ORM) libraries)
Object-Relational-Mapper (ORM) libraries, which gives you special Objects that represent tables in a database. Instead of writing SQL, you call these Objects' methods to insert, retrieve, update, or delete rows.

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
- npx sequelize-cli db:create 
 //create a badabase on my localhost on postgres


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

 ------------- Feb 22 / 2022 ----------- next step


- pg is not used directly, it's used by sequilize

- run:  (it adds photo.js file in the model)
npx sequelize-cli model:generate --name Photo --attributes title:string,url:string,userId:integer

- then add this inside photo.js
Photo.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });


- then add this link into user.js in model
User.hasMany(models.Photo, {
        foreignKey: 'userId'
      });

- then replace the user id this link in 20220********644-create-photo.js in migrations
userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
                model: 'Users',
                key: 'id',
                as: 'userId'
        },

      the old user id was:
       userId: {
        type: Sequelize.INTEGER
      },


- run:
npx sequelize-cli db:migrate

- run:
npx sequelize-cli seed:generate --name photo


- then replace everything in the file (2022022****302-photo.js)

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Photos', [{
       title: 'Something I helped put in space',
       url: 'https://solarsystem.nasa.gov/system/resources/detail_files/17761_cassinihuygens_BTN_16_purple_final_01.jpg',
       userId: 1,
       createdAt: new Date(),
       updatedAt: new Date()
     }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Photos', null, {});
  }
};


- run (running the seed file)
npx sequelize-cli db:seed:all


on postgres
- on user and photoa, right click then data structure


