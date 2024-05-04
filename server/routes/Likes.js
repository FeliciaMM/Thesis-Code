const express = require('express');
const router = express.Router();
const { Likes } = require("../database.js");
const{validateToken}=require('../middlewares/AuthMiddleware.js'); 

router.post("/", validateToken, async(req,res)=>{
    const{PostId}=req.body;
    const UserId = req.user.id;

    const found = await Likes.findOne({
        where:{ PostId: PostId, UserId: UserId},});
        if(!found){
            await Likes.create({PostId: PostId, UserId: UserId});
            res.json("Like");
    }else{
        await Likes.destroy({
            where:{ PostId: PostId, UserId: UserId},
            
        });
        res.json("unLike");
    }
    
});


module.exports = router;