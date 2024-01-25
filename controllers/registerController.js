const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    console.log(req);
    const {username, password}  = req.body;
    const duplicate = await User.findOne({username: username}).exec();
    if (duplicate) return res.status(409).json({'error': 'This username already exists!'});
    const result = await User.create({
        'username': username, 
        'password': await bcrypt.hash(password, 10),
    });
    const res2 = await User.find();
    console.log(result);
    console.log(res2);
    return res.status(200).json({'message':'Registered Succesfully!'});
}

module.exports = {handleNewUser};