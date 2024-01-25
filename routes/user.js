const express = require('express');
const router = express.Router();
const User = require('../model/User');

const multer = require('multer');

const upload = multer({dest: 'images'});

router.get('/',async (req, res)=>{
    
    const username = req.query.param;
    const foundUser = await User.findOne({username:username}).exec();
    res.json({
        'username':foundUser.username,
        'fullName':foundUser.fullName,
        'email':foundUser.email,
        'photo':foundUser.image,
    });
})

router.get('/all', async (req, res) => {
    
    const users = await User.find().exec();
    res.json(users);
})

router.post('/', upload.single('image'), async (req, res) => {
        const username = req.query.param;
        console.log(req.file);
        const {fullName, email} = req.body;
        const foundUser = await User.findOne({username:username}).exec();
        
        foundUser.fullName = fullName;
        foundUser.email = email;
        if(req?.file?.filename) {
            foundUser.image = req.file?.filename;
        } 

        const result = await foundUser.save();
        res.json({
            'username':foundUser.username, 
            'email':foundUser.email,
            'fullName': foundUser.fullName,
            'photo': foundUser.image 
        });
    })

module.exports = router;