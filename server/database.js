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
});


const Posts = sequelize.define('Post', {
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    username: DataTypes.STRING
});

const Comments = sequelize.define('Comment', {
    commentText: DataTypes.STRING,
    username: DataTypes.STRING, 
});


const Likes = sequelize.define('Like');

module.exports = { sequelize,Users, Posts, Comments, Likes};

Users.hasMany(Posts, { 
    onDelete: "cascade", 
     // Assuming you have a foreign key userId in the Posts table referencing Users
});

// Define the association between Users and Comments
Users.hasMany(Comments, { 
    onDelete: "cascade", 
     // Assuming you have a foreign key userId in the Comments table referencing Users
});

// Define the association between Posts and Comments
Posts.hasMany(Comments, { 
    onDelete: "cascade", 
     // Assuming you have a foreign key postId in the Comments table referencing Posts
});

Posts.hasMany(Likes, { 
    onDelete: "cascade", 
     // Assuming you have a foreign key postId in the Comments table referencing Posts
});

Users.hasMany(Likes, { 
    onDelete: "cascade", 
     // Assuming you have a foreign key userId in the Comments table referencing Users
});

// Define the association between Comments and Users
Comments.belongsTo(Users, {
     // Assuming you have a foreign key userId in the Comments table referencing Users
});


// Define the association between Comments and Posts
Comments.belongsTo(Posts, {
     // Assuming you have a foreign key postId in the Comments table referencing Posts
});

