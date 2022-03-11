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


//service to register mtc super admins and institution admins

async function registerAdmin(newAdmin, res){

  try{

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
    
        expiresIn: "5h"
    });

    message = 'Admin registered'
    success = true;
    }
  
    return {message, success};
  }
  
  catch (error) {
    console.error(error);
 
}
}


//services to check if email already registered in the system

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


//service to get admins by username

async function getAdminByUsername( username){

  try{

  const rows = await db.query(

    `Select * from admins

    WHERE username=?`, 
    [username]
  );

  const data = helper.emptyOrRows(rows);
  return {
    data
  }
}
  
catch (error) {
  console.error(error);

}

}


//service to authenticate users to login

 async function authenticate(username, password, admin){
  // const username = User.username;
  // const password = User.password;

   let message = 'user not found';
   let  success = false;   
  const result = await db.query(`SELECT * FROM admins WHERE username =?`,[username]);
    if (result.length < 0) {

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



 
//service to update admin details
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


  


// service to get all registered admins 
  
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
  

  //service to delete admin

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




 

  
  //service to reset passwords
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
    updateAdmin,
    deleteAdmin,
    getEmail,
    authenticate,
    getAdminByUsername,
    resetPassword,
    forgotPassword,
    updateAdmin1
  }