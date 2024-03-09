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

const Posts = sequelize.define('Post', {
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    username: DataTypes.STRING
});

const Comments = sequelize.define('Comment', {
    commentText: DataTypes.STRING, 
});

module.exports = { sequelize, Posts, Comments};

Posts.hasMany(Comments,{
    onDelete: "cascade",
});
Comments.belongsTo(Posts);