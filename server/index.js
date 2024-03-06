const express = require("express")
const app = express()
const { sequelize, Post } = require('./database');

app.use(express.json());

const postRouter = require('./routes/Posts')
app.use('/posts', postRouter);


app.get('/reset', (req, res) => {
    controller.resetDatabase(req, res);
});

app.listen(3001, ()=> {
    console.log("server running on port 3001");
});



module.exports = { Post };

////////////////////////////////




//DON T FORGET CU CD

