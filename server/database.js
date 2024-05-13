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

const Users = sequelize.define('User', {
    username: {
        type:DataTypes.STRING,
        allowNull:false,
    },
    password: {
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,  
        unique:true,
    },
    role:{
        type:DataTypes.STRING,
        enum:['User','PetWalker','PetGroomer','PetSitter','Vet','Specialist'],
        default:'User',
    },
});


const Posts = sequelize.define('Post', {
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    username: DataTypes.STRING
});

const PetSitterOffers = sequelize.define('PetSitterOffers', {
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    username: DataTypes.STRING
});


const Comments = sequelize.define('Comment', {
    commentText: DataTypes.STRING,
    username: DataTypes.STRING, 
});




module.exports = { sequelize,Users, Posts, Comments, PetSitterOffers};

Users.hasMany(Posts, { 
    onDelete: "cascade", 
     
});


Users.hasMany(Comments, { 
    onDelete: "cascade", 
    
});

Users.hasMany(PetSitterOffers, { 
    onDelete: "cascade", 
     
});

PetSitterOffers.belongsTo(Users, {
   
});


Posts.hasMany(Comments, { 
    onDelete: "cascade", 
     
});



Comments.belongsTo(Users, {

});



Comments.belongsTo(Posts, {
    
});

