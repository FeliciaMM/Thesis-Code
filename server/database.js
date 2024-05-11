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

const Services = sequelize.define('Service', {
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    username: DataTypes.STRING
});


const Comments = sequelize.define('Comment', {
    commentText: DataTypes.STRING,
    username: DataTypes.STRING, 
});




module.exports = { sequelize,Users, Posts, Comments, Services};

Users.hasMany(Posts, { 
    onDelete: "cascade", 
     // Assuming you have a foreign key userId in the Posts table referencing Users
});

// Define the association between Users and Comments
Users.hasMany(Comments, { 
    onDelete: "cascade", 
     // Assuming you have a foreign key userId in the Comments table referencing Users
});

Users.hasMany(Services, { 
    onDelete: "cascade", 
     // Assuming you have a foreign key userId in the Comments table referencing Users
});

Services.belongsTo(Users, {
    // Assuming you have a foreign key userId in the Comments table referencing Users
});

// Define the association between Posts and Comments
Posts.hasMany(Comments, { 
    onDelete: "cascade", 
     // Assuming you have a foreign key postId in the Comments table referencing Posts
});


// Define the association between Comments and Users
Comments.belongsTo(Users, {
     // Assuming you have a foreign key userId in the Comments table referencing Users
});


// Define the association between Comments and Posts
Comments.belongsTo(Posts, {
     // Assuming you have a foreign key postId in the Comments table referencing Posts
});

