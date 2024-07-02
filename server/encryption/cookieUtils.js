import { decryptToken, encryptToken } from "./encryptionUtil.js";

//Creates a value that is the combination of the encrypted access token and the initialisation vector
export const createCookieValue = (accessToken) =>{
    const encryptedToken = encryptToken(accessToken);
    const cookieValue = `${encryptedToken.encrypted}|${encryptedToken.iv}`;

    return cookieValue;
}

//Retrieves the decrypted access token value from the string containing the accessToken and the initialisation vector
export const getCookieValue = (encryptedAccessToken) => {
    const values = encryptedAccessToken.split('|');
    const accessToken = values[0];
    const initialVec = values[1];

    const decryptedAccessToken = decryptToken({ token: accessToken, iv: initialVec })
    return decryptedAccessToken;
}
