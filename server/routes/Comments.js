const express = require('express');
const router = express.Router();
const { Comments } = require("../database.js");
const{validateToken}=require("../middlewares/AuthMiddleware.js");


router.get('/:postId', async(req, res)=>{
    const postId = req.params.postId;
    const comments = await Comments.findAll({
        where:{ PostId: postId}
    });
    res.json(comments);
 });

router.post("/",validateToken, async(req, res)=>{
    const comment=req.body;
    const username = req.user.username;
    const userId = req.user.id;
    comment.username = username;
    comment.UserId = userId;
    console.log(comment.userId);
    await Comments.create(comment);
    res.json(comment);
});

router.delete("/:commentId", validateToken, async (req, res)=>{
    const commentId = req.params.commentId;
    await Comments.destroy({where:{
        id:commentId,
    }
});

res.json("Comment deleted");

});

module.exports=router;