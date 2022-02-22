
const express = require('express');
const app = express();
const port = 3005;
const Sequelize = require('sequelize');
const { User } = require('./models');

app.use(express.json()); //Middleware

app.get('/', (req, res) => {
  res.send('Hello World!');
})

//queries 
app.get('/users', async (req, res) => {
     const users = await User.findAll({
          attributes: ['email']
     });
     res.json(users);
     console.log(users)
 });


 //posting fname, lname, email
app.post('/users', async (req, res) => {
     // req.body contains an Object with firstName, lastName, email
     const { firstName, lastName, email } = req.body;
     const newUser = await User.create({
         firstName,
         lastName,
         email,
     });
     console.log("The new user is: " + newUser)
     // Send back the new user's ID in the response:
     res.json({
         id: newUser.id
     });
 })


 //find row by id (pk == primary key)
//  app.get('/users/:id', async (req, res) => {
//      const oneUser = await User.findByPk(req.params.id);
//      res.json(oneUser);
//  });
  
// or we can use the next block to catch errors

 app.get('/users/:id', async (req, res) => {
     try{
         const oneUser = await User.findByPk(req.params.id);
         if (!oneUser) throw new Error('id not found') 
         res.json(oneUser);
     } catch (e) {
         console.log(e);
         res.status(404).json({
             message: 'User not found'
         });
     }
 });


//  To do a text search, use a where option (Search Users):
app.post('/users/search', async (req, res) => {
     console.log(req.body)
     const users = await User.findAll({
         where: {
             [Sequelize.Op.or]: [
                 { 
                     firstName: req.body.termF,
                    //  lastName: req.body.termL
                 }
             ]
         }
     });
     res.json(users);
 });

//  to search on postman
//  {
//      "termF": "Annie",
//      "termL": "Easley"   
//  }



app.patch('/users/:id', async (req, res) => {
     const { id } = req.params;
     
     // Assuming that `req.body` is limited to
     // the keys firstName, lastName, and email
     const updatedUser = await User.update(req.body, {
       where: {
         id,
       }
     });
     
     res.json(updatedUser);
 });

 app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    const deletedUser = await User.destroy({
        where: {
            id
        }
    });
    res.json(deletedUser);
});





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})