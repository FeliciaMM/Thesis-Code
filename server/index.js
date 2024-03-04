const express = require("express")
const app = express()



app.listen(3001, ()=> {
    console.log("server running");
});





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
    title:{
    type:DataTypes.STRING,
    allowNull: false
    },
    text:DataTypes.STRING,

});



//DON T FORGET CU CD

