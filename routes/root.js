const express =  require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../model/User');

router.get('/', async (req, res)=> {


    const cookies = req.cookies;
    if(cookies?.jwt) {
        const refreshToken = cookies.jwt;

        const foundUser = await User.findOne({refreshToken:refreshToken}).exec();
        if(!foundUser) return res.json('error');
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
    
                const accessToken = jwt.sign(
                    {
                        "UserInfo" : {
                            "username": decoded.username
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '30s' }
                );
                res.json({ accessToken })
            }
        );

    }
})

module.exports = router;