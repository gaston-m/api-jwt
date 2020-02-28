const jwt = require('jsonwebtoken')
const secret = process.env.TEXTXENCRIPT ? process.env.TEXTXENCRIPT : 'mysecretsecret';


module.exports = function autorizado (req, res, next) {

/*
    function dec (validado, token, secret) {

        return  validado = jwt.verify(token, secret);
    }
*/


    const token = req.headers['x-access-token'];

    if (!token) {

        return res.status(401).json({

            auth: false,
            message: 'No se ha enviado un token'
        })
    } else {

/*
        var decoded;
    
        try {
            decoded = dec(decoded, token, secret);
        } catch (e){
             
            console.log('Error en Token')
            return res.status(403).json({ message: "Acceso NO Autorizado"})    

        }
*/

    jwt.verify(token, secret, (err, decoded) => {
        if (err){
            return res.status(403).json({
                auth: false,
                message: 'Token Invalido'
            })
        } else {

            req.userId = decoded.id;
            next();
            console.log(decoded);
        }
    });

     
    
}

}