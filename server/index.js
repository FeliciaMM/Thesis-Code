const express = require("express")
const app = express()
const { sequelize, Posts } = require('./database');

app.get("/api", async (req, res) => {
    try {
        const posts = await Posts.findAll(); // sau metoda corespunzătoare pentru a obține datele din baza de date
        res.json(posts);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

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

