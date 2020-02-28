const { Schema, model } = require ('mongoose');
const bcrypt = require ('bcryptjs');

const userSchema = new Schema({

    name: { type: String, required: true },
    email: { type: String, required: true },
    password: ( {type: String, required: true })
});


userSchema.methods.encriptarPassword = async (password) => {

    const salt = await bcrypt.genSalt(10);
    return  bcrypt.hash(password, salt);
}

userSchema.methods.validarPassword = function (password){

    return bcrypt.compare(password, this.password);
}



module.exports = model('User', userSchema);