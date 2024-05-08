const express = require('express');
const router = express.Router();
const { Posts } = require("../database.js");
const{validateToken} = require("../middlewares/AuthMiddleware.js");

router.get('/', async(req, res)=>{
     const listOfPosts = await Posts.findAll();
     res.json(listOfPosts);
 });

 router.get('/byId/:id', async(req, res)=>{
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
 });

 router.get('/byUserId/:id', async(req, res)=>{
    const id = req.params.id;
    const listOfPosts = await Posts.findAll({where:{UserId:id}});
    res.json(listOfPosts);
    
 });

router.post('/', validateToken, async(req,res)=>{
     const post = req.body;
     post.username = req.user.username;
     post.UserId = req.user.id;
     await Posts.create(post);
     res.json(post);
 });

module.exports = router;