import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


function verifyPassword(userPassword, encryptedPassword){
    try {
        return bcrypt.compareSync(userPassword, encryptedPassword);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function createToken(user) {
    try {
        const JWT_KEY = "ToddleApp@10"
        const result = jwt.sign({
            id : user.user_id
        }, JWT_KEY, { expiresIn: '1d' });
        return result;
    } catch (error) {
        console.log(error);
        console.log("Something Went Wrong in Token Creation");
        throw { error };
    }
}

export {
    verifyPassword, createToken
}