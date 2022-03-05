const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const Admin = require("../models/admins");
const {validationResult} = require('express-validator');
const jwt = require("jsonwebtoken");
const {body} = require('express-validator');
const crypto = require("../cryptojs");
const crypto1 = require("crypto");



async function registerAdmin(newAdmin, res){

  try{

  //   if (await db.users.findOne({ where: { username: newAdmin.username } })) {
  //     throw 'Username "' + newAdmin.username + '" is already taken';
  // }

    const hashPass = await bcrypt.hash(newAdmin.password, 12);


    const result = await db.query(
      `INSERT INTO admins 
      (firstname, lastname, email, role, institution_company, username, password) 
      VALUES 
      (?, ?, ?, ?, ?, ?, ?)`, 
      [
        newAdmin.firstname, newAdmin.lastname, newAdmin.email,
        newAdmin.role, newAdmin.institution_company, newAdmin.username, hashPass
        
        
      ]
    );
    
  
    let message = 'Error in creating new admin';
    success = false;
  
    if (result.affectedRows) {

      const token = jwt.sign({ newAdmin}, config.secret, {
        //1 wek in seconds this to force the use to log in after every week, that is when the token
        //gets expired
        expiresIn: "5h"
    });

    message = 'Admin registered'
    success = true;
    // res.json({
    //     success: true,
    //     token: crypto.encrypt(token, config.secret),
    //     user: {
    //         username: user.username,
    //         email: user.email
    //         // role: user.role,
    //         // applicant: true
    //     }
    // });
    }
  
    return {message, success};
  }
  
  catch (error) {
    console.error(error);
 
}
}


async function getEmail( email){


  try{

  const result = await db.query(

    `Select email from admins

    WHERE email=?`, 
    [email]
  );

  let message = 'Email not found';

  if (result.length >0) {
    message = 'Email already taken';
  }

  return {message};

}
  
catch (error) {
  console.error(error);

}
}


async function getAdminByUsername( username){

  try{

  const rows = await db.query(

    `Select * from admins

    WHERE username=?`, 
    [username]
  );

  const data = helper.emptyOrRows(rows);
  // const meta = {page};

  return {
    data
  }
}
  
catch (error) {
  console.error(error);

}

}

exports.loginUser = async function (user) {
  // Creating a new Mongoose Object by using the new keyword
  try {
      // Find the User 
      var _details = await User.findOne({ username: user.username });
      var passwordIsValid = bcrypt.compareSync(user.password, _details.password);
      if (!passwordIsValid) throw Error("Invalid username/password")
      var token = jwt.sign({id: _details._id}, config.SECRET, {
          expiresIn: 86400 // expires in 24 hours
      });
      return token;
  } catch (e) {
      // return a Error message describing the reason     
      throw Error("Error while Login User")
  }
}

 async function authenticate(username, password, admin){
  // const username = User.username;
  // const password = User.password;

   let message = 'user not found';
   let  success = false;   
  const result = await db.query(`SELECT * FROM admins WHERE username =?`,[username]);
    if (result.length < 0) {
      // res.send({
      //   "code":400,
      //   "failed":"error ocurred"
      // })

      message ='error occured';
      success = false;
    }else{

      if(result.length > 0){
        const comparision = await bcrypt.compare(password, result[0].password)
        if(comparision){
            // res.send({
            //   "code":200,
            //   "success":"login sucessfull"
            // })

            const token1 = jwt.sign({ admin }, config.secret, {
              //1 wek in seconds this to force the use to log in after every week, that is when the token
              //gets expired
              expiresIn: "5h"
          });
          
          message = 'Admin "' + username + '" is logged in successfully';
         token =   token1;
         success = true;

          // res.send({
          //      "code":204,
          //      "success":"Username and password does not match"
          // })

          // let encryptedEmail = crypto.encrypt(user.email, config.secret);

          //ecrypting the token using crypto
          // let enjwt = crypto.encrypt(token);
          // token1 = token;
          return {message, token, success, result};
        }

      message ='Incorrect password';
      }
      else{
        // res.send({
        //   "code":206,
        //   "success":"Username does not exits"
        //     });

        message =('Username does not exits'), {success: false};
      }
    }

    return {message};
   
 
  }

    // let message = 'user not found';

 

  async function updateAdmin(id, newAdmin){

    try {

    
    const hashPass = await bcrypt.hash(newAdmin.password, 12);


const result = await db.query(
  `UPDATE admins
  SET firstname=?, lastname=?, email=?,
   role=?, institution_company=?, username=?,
  password=?
  WHERE id=?`, 
  [
    newAdmin.firstname, newAdmin.lastname, newAdmin.email,
    newAdmin.role, newAdmin.institution_company,
     newAdmin.username, hashPass, id
  ]
);

let message = 'Error in updating user details';
success = false;


if (result.affectedRows) {
  message = 'User details updated successfully';
  success = true;
}

return {message, result, success};

}
  
catch (error) {
  console.error(error);

}

} 


async function updateAdmin1(id, newAdmin){

  try{

const result = await db.query(
`UPDATE admins
SET firstname=?, lastname=?, email=?,
 role=?, institution_company=?, username=?
WHERE id=?`, 
[
  newAdmin.firstname, newAdmin.lastname, newAdmin.email,
  newAdmin.role, newAdmin.institution_company,
   newAdmin.username, id
]
);

let message = 'Error in updating user details';
success = false;


if (result.affectedRows) {
message = 'User details updated successfully';
success = true;
}

return {message, result, success};

}
  
catch (error) {
  console.error(error);

}

} 

// }
// catch (error) {
//   console.error(error);
//   // expected output: ReferenceError: nonExistentFunction is not defined
//   // Note - error messages will vary depending on browser

// }
  
  
async function getAllAdmins(page = 1){
    // const offset = helper.getOffset(page, config.listPerPage);

    try{
    const rows = await db.query(
      `SELECT *
      FROM admins`
      // [offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};
  
    return {
      data,
      meta
    }

  }
  
  catch (error) {
    console.error(error);
 
}
  }
  

  async function deleteAdmin(id){

    try{
    const result = await db.query(
      `DELETE FROM admins WHERE id=?`, 
      [id]
    );
  
    let message = 'Error deleting the admin';
  
    if (result.affectedRows) {
      message = 'Admin deleted successfully';
    }
  
    return {message};

  }
  
  catch (error) {
    console.error(error);
 
}
  }




  async function resetPassword1( email){

    try{

    const user = await db.query(
  
      `Select email from users
  
      WHERE email=?`, 
      [email]
    );
  
    let message = 'Email exist';
  
    if (user.length > 0) {
      message = 'Email not found';
    }

    return {message};

  }
  
  catch (error) {
    console.error(error);
 
}
  }


  
  
async function resetPassword( email) {

//  let message = 'not found';

try{
  const users = await db.query(
  
    `Select email from admins

    WHERE email=?`, 
    [email]
  );

  // always return ok response to prevent email enumeration
  if (!users) return;

  // create reset token that expires after 24 hours
  users.resetToken = randomTokenString();
  users.resetTokenExpires = new Date(Date.now() + 24*60*60*1000);
  await users.save();

  // send email
}
  
catch (error) {
  console.error(error);

}
 
}

function randomTokenString() {
  return crypto1.randomBytes(40).toString('hex');
}


  async function resetPassword2(email, err, res){

    try{

  var message;
    const user = await db.query(
  
      `Select email from users
  
      WHERE email=?`, 
      [email]
    );
  


  
    if (user.length < 0 && user.email == "") {
      message = 'Email not found or enter a valid email';

      console.log(message);
    }
    
    else  {
              //assigning the userid variable
              _userId = user.id;

              const resettoken = jwt.sign({
                  _userId: user.id,
                  email: user.email

              }, config.secret, { expiresIn: '1h' });
      user.resetPasswordToken = resettoken;
      user.resetPasswordExpires = Date.now() + 3600000;

   
              console.log(resettoken)
              // let newToken = new passwordResetToken ({
              //     _userId: user.id,
              //     resettoken: user.resetPasswordToken,
              //     createAt: user.resetPasswordExpires
              // });


              // const passwordResetToken = await db.query(
  
              //   `Insert into passwordResetToken (_userId, resettoken, createAt) 
              //   VALUES 
              //   (?, ?, ?)`, 
              //   [user.id, user.resetPasswordToken, user.resetPasswordExpires]
              // );

              // let newToken = passwordResetToken;

              // newToken.save(newToken, (err) => {
              //     if (err) {
              //         next(err);
              //     }
              // })

              message = 'Reset password successfully';
              // return res.status(200).json({ message: 'Reset password successfully' });

    }
  
return {message, user};

}
  
catch (error) {
  console.error(error);

}
    
  }


  async function forgotPassword(email , origin) {

    try{
    const account = await db.query(
  
      `Select email from users
  
      WHERE email=?`, 
      [email]
    );

    // always return ok response to prevent email enumeration
    if (!account) return;

    // create reset token that expires after 24 hours
    account.resetToken = randomTokenString();
    account.resetTokenExpires = new Date(Date.now() + 24*60*60*1000);
    await account.save();

    // send email
    await sendPasswordResetEmail(account, origin);
  }
  
  catch (error) {
    console.error(error);
 
}
}



  module.exports = {
    getAllAdmins,
    registerAdmin,
    // registration,
    updateAdmin,
    deleteAdmin,
    getEmail,
    authenticate,
    getAdminByUsername,
    resetPassword,
    forgotPassword,
    updateAdmin1
  }