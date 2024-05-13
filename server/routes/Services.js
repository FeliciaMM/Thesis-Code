const express = require('express');
const router = express.Router();
const { Services } = require("../database.js");
const{validateToken} = require("../middlewares/AuthMiddleware.js");

router.post('/', validateToken, async (req, res) => {
    try {
        const service = req.body;
        service.username = req.user.username;
        service.UserId = req.user.id;
        await Services.create(service);
        res.json(service);
    } catch (error) {
        console.error("Error creating pet sitter offer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/', async(req, res)=>{
    const listOfService = await Services.findAll();
    res.json(listOfService);
});


router.get('/byId/:id', async(req, res)=>{
    const id = req.params.id;
    const post = await Services.findByPk(id);
    res.json(post);
 });


module.exports=router;