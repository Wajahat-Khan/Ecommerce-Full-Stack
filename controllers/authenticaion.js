require('dotenv').config();
const customer = require('../models').customer;


// JWT implementation
const key = `${process.env.SECRET_JWT}`;
let jwt = require('jsonwebtoken');

// ecnryption
const Cryptr = require('cryptr');
const cryptr = new Cryptr(key);
createUser =  async (body) => {
    const user=await customer.create({
        name: `${body.name}`,
        email: `${body.email}`,
        password: cryptr.encrypt(`${body.password}`)
    });
    return user;

}

validate = async (body)=>{
    const user= await customer.findOne({
        attributes: ['password'], where: {
            name: body.username
        }
    })
    if (user != undefined){
        console.log(`${process.env.SECRET_JWT}`)
        const pass = cryptr.decrypt(user.password);
        if (pass === body.password) {
            let token = jwt.sign({ username: body.username },
                key,
                {
                    expiresIn: '24h' // expires in 24 hours
                }
            );
            // return the JWT token for the future API calls
            return {
                success: true,
                message: 'Authentication successful!',
                token: token
            };
        } else {
            return{
                success: false,
                message: 'Incorrect username or password'
            };
        }

    }else {
        return {
            success: false,
            message: 'User not found'
        };
    };
}
module.exports={createUser,validate}