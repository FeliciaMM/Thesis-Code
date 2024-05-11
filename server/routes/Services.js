const express = require('express');
const router = express.Router();
const { Services } = require("../database.js");
const{validateToken} = require("../middlewares/AuthMiddleware.js");

router.post('/', validateToken, async(req,res)=>{
    const offer = req.body;
    offer.username = req.user.username;
    offer.UserId = req.user.id;
    await Services.create(offer);
    res.json(offer);
});


module.exports=router;