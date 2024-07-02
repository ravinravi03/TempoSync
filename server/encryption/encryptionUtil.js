import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const encryptKey = process.env.ENCRYPT_KEY;

//Encrypts a string and returns the encrypted string and the initialisation vector
export const encryptToken = (token) => {
    const algorithm = 'aes-256-cbc'
    const iv = randomBytes(16).toString('hex').substring(0,16)

    const cipher = createCipheriv(algorithm,encryptKey,iv)
    let encrypted = cipher.update(token,'utf8','hex')
    encrypted += cipher.final('hex')

    return{
        encrypted,iv
    }
}

//Decrypts a string using the key in .env and the initialisation vector
export const decryptToken = ({token,iv}) => {
    const algorithm = 'aes-256-cbc'
    const decipher = createDecipheriv(algorithm,encryptKey,iv)

    let decrypted = decipher.update(token,'hex','utf8')
    decrypted += decipher.final('utf8')

    return decrypted;
}
