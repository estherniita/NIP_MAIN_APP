
const CryptoJS = require("crypto-js");


// Encrypt
function encrypt(text, key) {


  
return CryptoJS.AES.encrypt(text, key).toString();
}


// Decrypt
function decrypt(text, key) {

var bytes  = CryptoJS.AES.decrypt(text, key);
var decrypted = bytes.toString(CryptoJS.enc.Utf8);

return decrypted;

}

module.exports = {decrypt, encrypt };