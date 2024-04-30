const express = require('express');
const router = express.Router();
const { Users } = require("../database.js");
const bcrypt = require('bcrypt');
const{sign} = require('jsonwebtoken');
const { validateToken } = require('../middlewares/AuthMiddleware.js');

router.post('/',async(req,res)=>{
    const { username,password } = req.body;
    bcrypt.hash(password, 10).then((hash)=>{
        Users.create({
            username:username,
            password:hash,
        })
        res.json("User created");
    });
 });

 router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });

    if (!user) {
        return res.json({ error: "No such user" });
    }

    bcrypt.compare(password, user.password).then((same) => {
        if (!same) {
            return res.json({ error: "Wrong username and/or password" });
        }

        const accessToken = sign({username: user.username,id:user.id},
            "importantsecret"
        );

        res.json(accessToken);
        
    });
});

router.get('/auth',validateToken, (req, res)=>{
    res.json(req.user);
});


module.exports = router;
