const express = require("express")
const app = express()
const { sequelize, Posts } = require('./database');

app.use(express.json());

const postRouter = require('./routes/Posts')
app.use('/posts', postRouter);


app.get('/reset', (req, res) => {
    controller.resetDatabase(req, res);
});

app.listen(3001, ()=> {
    console.log("server running on port 3001");
});



module.exports = { Posts };

////////////////////////////////




//DON T FORGET CU CD

