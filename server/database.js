const { Sequelize, DataTypes } = require('sequelize');





const sequelize = new Sequelize('PawCare', 'root', '', {
    host: "localhost",
    dialect: 'mysql',
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    }
});

const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    username: DataTypes.STRING
});

module.exports = { sequelize, Post };

const controller = {
    resetDatabase: async(req,res)=>{
         await sequelize.sync({force:true});
         console.log('All the models have been synced');
         res.status(201).send({message: "merge"})
    } 
 }