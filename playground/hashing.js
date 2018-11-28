const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt=require('bcryptjs');

var password='123abc!';

bcrypt.genSalt(10,(err,salt)=>{
  bcrypt.hash(password,salt,(err,hash)=>{
    console.log(hash);
  });
});
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// var data = {
//   id:10
// };
//
// var token=jwt.sign(data,'123abc'); // 123abc is a secret text that provide hash in an unique way(aldığı bu string i datanın arkasına yerleştirip hash li data yı göndermelerini ve böylece güvenlik duvarını geçmelerini engeller.)
//
// console.log(token);
// var decoded = jwt.verify(token,'123abc');
// console.log(decoded);
