const express = require('express');
const router = express.Router();
const { Services } = require("../database.js");
const{validateToken} = require("../middlewares/AuthMiddleware.js");

router.post('/services/petsitters', validateToken, async (req, res) => {
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


module.exports=router;