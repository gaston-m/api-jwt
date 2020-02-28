require('dotenv').config();
const secret = process.env.TEXTXENCRIPT ? process.env.TEXTXENCRIPT : 'mysecretsecret';
///const config = require('../config.js');
const User = require('../models/User.model');
const jwt = require('jsonwebtoken');




const ctr = {};

ctr.me = async (req, res) => {

        if (req.userId){
            const user = await User.findById(req.userId, {password: 0});
   
            if (!user) {
                res.status(404).json({ message: 'Usuario No Encontrado'})
            } else {
             res.json(user)
             }    
        } 
    }


ctr.getUsers = async (req, res) => {

    const users = await User.find();
    res.json(users);
}



ctr.signin = async (req, res ) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email: email});

    if (!user){

        res.status(404).json({ message: "El Email No Existe"});
    } else {

        const validado = await user.validarPassword(password, user.password);

        if ( validado) {

            const token = jwt.sign({ id: user._id}, secret, {
                expiresIn: 60 * 60 * 12
            });

            res.json({auth: true, token});

        } else {

            res.status(403).json({message: "Password Incorrecto"})
        }       
    }
}




ctr.signup = async (req, res) => {
    
    const { name, email, password } = req.body;
    
    const user = new User({
        name,
        email,
        password
    });

    user.password = await user.encriptarPassword(user.password);

    await user.save();

    console.log(secret);

    const token = jwt.sign({ id: user._id}, secret, {
        expiresIn: 60 * 60 * 12
    });

    console.log(user);

    res.json({ auth: true, token});
}

module.exports = ctr;