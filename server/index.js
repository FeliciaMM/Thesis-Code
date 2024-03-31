const express = require("express")
const cors = require('cors')
const app = express()
const { sequelize ,Users, Posts, Comments } = require('./database');


app.use(express.json());

app.use(cors());

app.get("/posts", async (req, res) => {
    try {
        const posts = await Posts.findAll(); 
        res.status(200).send(posts);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

const postRouter = require('./routes/Posts')
app.use('/posts', postRouter);

const commentsRouter = require('./routes/Comments')
app.use('/comments', commentsRouter);

const usersRouter = require('./routes/Users')
app.use('/authentification', usersRouter);

app.get('/reset', (req, res) => {
    controller.resetDatabase(req, res);
});

app.listen(3001, ()=> {
    console.log("server running on port 3001");
});

const controller = {
    resetDatabase: async(req,res)=>{
         await sequelize.sync({force:true});
         console.log('All the models have been synced');
         res.status(201).send({message: "merge"})
    } 
 }

module.exports = {Users, Posts, Comments };

////////////////////////////////




//DON T FORGET CU CD
