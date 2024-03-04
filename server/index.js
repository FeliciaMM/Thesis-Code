const express = require("express")
const app = express()



app.listen(3001, ()=> {
    console.log("server running on port 3001");
});

app.get('/reset', (req, res) => {
    controller.resetDatabase(req, res);
});

const postRouter = require('./routes/Posts')
app.use('/posts', postRouter);

////////////////////////////////

const{Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('PawCare','root','',{
    host: "localhost",
    dialect: 'mysql',
    define:{
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    }
});


//MODELE
const Post = sequelize.define('Post',{
    title:DataTypes.STRING,
    text:DataTypes.STRING,
});

const controller = {
   resetDatabase: async(req,res)=>{
        await sequelize.sync({force:true});
        console.log('All the models have been synced');
        res.status(201).send({message: "merge"})
   } 
}

//DON T FORGET CU CD

