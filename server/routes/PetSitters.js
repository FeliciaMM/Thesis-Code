const express = require('express');
const router = express.Router();
const { PetSitterOffers } = require("../database.js");
const{validateToken} = require("../middlewares/AuthMiddleware.js");

router.post('/', validateToken, async (req, res) => {
    try {
        const petSitterOffer = req.body;
        petSitterOffer.username = req.user.username;
        petSitterOffer.UserId = req.user.id;
        await PetSitterOffers.create(petSitterOffer);
        res.json(petSitterOffer);
    } catch (error) {
        console.error("Error creating pet sitter offer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/', async(req, res)=>{
    const listOfPetSitterOffers = await PetSitterOffers.findAll();
    res.json(listOfPetSitterOffers);
});


router.get('/byId/:id', async(req, res)=>{
    const id = req.params.id;
    const petSitterOffer = await PetSitterOffers.findByPk(id);
    res.json(petSitterOffer);
 });


module.exports=router;