require('dotenv').config();
const customer = require('../models').customers;


// JWT implementation
const key = `${process.env.SECRET_JWT}`;
let jwt = require('jsonwebtoken');

// ecnryption
const Cryptr = require('cryptr');
const cryptr = new Cryptr(key);
createUser = async ({name, email, password}) => {
    const user = await customer.create({
        name,
        email,
        password: cryptr.encrypt(password)
    });
    return user;

}

validate = async (body)=>{
    const user= await customer.findOne({
        attributes: ['password','customer_id','name'], where: {
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
                name:user.name,
                customer_id:user.customer_id,
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