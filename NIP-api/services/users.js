const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const User = require("../models/users");
const {validationResult} = require('express-validator');
const jwt = require("jsonwebtoken");
const {body} = require('express-validator');
const crypto = require("../cryptojs");
const crypto1 = require("crypto");



async function register(newUser, res){

  try{


    const hashPass = await bcrypt.hash(newUser.password, 12);
    
    
    let message = 'Error in creating new user';
    let success = false;
    let match = true;

    const result = await db.query(
      `INSERT INTO users 
      (fullname, username, email, password) 
      VALUES 
      (?, ?, ?, ?)`, 
      [
        newUser.fullname, newUser.username,
        newUser.email, hashPass
        
        
      ]
    );
    
  
  
    if (result.affectedRows) {

    //   const token = jwt.sign({ newUser}, config.secret, {
    //     //1 wek in seconds this to force the use to log in after every week, that is when the token
    //     //gets expired
    //     expiresIn: "5h"
    // });

    message = 'user registered'
    success = true;
    match = false;
    

    // result.json({
    //     success: true,
  //  const   token = crypto.encrypt(token, config.secret);
    //     user: {
    //         username: user.username,
    //         email: user.email,
    //         role: user.role,
    //         applicant: true
    //     }
    // });
    }
  
    return {message, success, match};
  }
  // }
  catch (error) {
    console.error(error);
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
  
}
}


async function getEmail( email){

  try{


  let message = 'Email not found at all';
  match = false;
success = false;

  const result = await db.query(

    `Select email from users

    WHERE email=?`, 
    [email]
  );





  if (result.length >0) {
    message = 'Email already in use';
    match = true;
    success = true;
  }

  return {message, match, success};

}
  
catch (error) {
  console.error(error);

}
}



async function getUserByUsername( username){

  try{

  const rows = await db.query(

    `Select * from users

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



 async function authenticate1(username, password, user){
  // const username = User.username;
  // const password = User.password;

  try{

   let message = 'user not found';
   let  success = false;   
  const result = await db.query(`SELECT * FROM users WHERE username =?`,[username]);
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

            const token1 = jwt.sign({ user }, config.secret, {
              //1 wek in seconds this to force the use to log in after every week, that is when the token
              //gets expired
              expiresIn: "5h"
          });
          
          message = 'User "' + username + '" is logged in successfully';
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
  
  catch (error) {
    console.error(error);
 
}
   
 
  }


  async function authenticate(username, password, user){
    // const username = User.username;
    // const password = User.password;

    try{
  
     let message = 'user not found';
     let  success = false; 
     let  admin = false;  
     let  organization = false; 
     let  users = false;    
    const result = await db.query(`SELECT * FROM users WHERE username =?`,[username]);
      if (result.length < 0) {
        // res.send({
        //   "code":400,        //   "failed":"error ocurred"
        // })
  
        message ='Username does not exits';
        success = false;

      }else{
  
        if(result.length > 0){
          const comparision = await bcrypt.compare(password, result[0].password)
          if(comparision){
              // res.send({
              //   "code":200,
              //   "success":"login sucessfull"
              // })
  
              const token1 = jwt.sign({ user }, config.secret, {
                //1 wek in seconds this to force the use to log in after every week, that is when the token
                //gets expired
                expiresIn: "5h"
            });
            
            message = 'User "' + username + '" is logged in successfully';
           token =   token1;
           success = true;
            users = true;
  
            // res.send({
            //      "code":204,
            //      "success":"Username and password does not match"
            // })
  
            // let encryptedEmail = crypto.encrypt(user.email, config.secret);
  
            //ecrypting the token using crypto
            // let enjwt = crypto.encrypt(token);
            // token1 = token;

            return {message, token, success, result, username};


          }
  
        message ='Incorrect password';
        }

        else{

          const result = await db.query(`SELECT * FROM admins WHERE username =?`,[username]);

          if (result.length < 0) {
            // res.send({
            //   "code":400,        //   "failed":"error ocurred"
            // })
      
            message ='Username does not exits';
            success = false;


            
          } else{
      
            if(result.length > 0){
              const comparision = await bcrypt.compare(password, result[0].password)
              if(comparision){
                  // res.send({
                  //   "code":200,
                  //   "success":"login sucessfull"
                  // })
      
                  const token1 = jwt.sign({ user }, config.secret, {
                    //1 wek in seconds this to force the use to log in after every week, that is when the token
                    //gets expired
                    expiresIn: "5h"
                });
                
                message = 'User "' + username + '" is logged in successfully';
               token =   token1;
               success = true;
                admin = true;
      
                // res.send({
                //      "code":204,
                //      "success":"Username and password does not match"
                // })
      
                // let encryptedEmail = crypto.encrypt(user.email, config.secret);
      
                //ecrypting the token using crypto
                // let enjwt = crypto.encrypt(token);
                // token1 = token;
                return {message, token, success, result, admin, user};
              }
      
            message ='Incorrect password';
            }

             else{

          const result = await db.query(`SELECT * FROM organization_register WHERE registration_number =?`,[username]);

          if (result.length < 0) {
            // res.send({
            //   "code":400,        //   "failed":"error ocurred"
            // })
      
            message ='Username does not exits';
            success = false;
          } else{
      
            if(result.length > 0){
              const comparision = await bcrypt.compare(password, result[0].password)
              if(comparision){
                  // res.send({
                  //   "code":200,
                  //   "success":"login sucessfull"
                  // })
      
                  const token1 = jwt.sign({ user }, config.secret, {
                    //1 wek in seconds this to force the use to log in after every week, that is when the token
                    //gets expired
                    expiresIn: "5h"
                });
                
                message = 'User "' + username + '" is logged in successfully';
               token =   token1;
               success = true;
                organization = true;
      
                // res.send({
                //      "code":204,
                //      "success":"Username and password does not match"
                // })
      
                // let encryptedEmail = crypto.encrypt(user.email, config.secret);
      
                //ecrypting the token using crypto
                // let enjwt = crypto.encrypt(token);
                // token1 = token;
                return {message, token, success, result, organization, user};
              }
      
            message ='Incorrect password';
            }
            else{
              // res.send({
              //   "code":206,
              //   "success":"Username does not exits"
              //     });
      
              message =('Incorrect password'), {success: false};
            }
        }
      }

            // else{
            //   // res.send({
            //   //   "code":206,
            //   //   "success":"Username does not exits"
            //   //     });
      
            //   message =('Username does not exits'), {success: false};
            // }
        }
      }

       

      }
  
      return {message};

    }
  
    catch (error) {
      console.error(error);
   
  }
     
   
    }

    // let message = 'user not found';


    // if (result.length >0) {
    //   message = 'User "' + username + '" is logged in';
    // }



  //   async function authenticates({ username, password }) {

  //     const user = await db.query(`SELECT * FROM users WHERE username =?`,[username]);
  //     // const user = await db.query.scope('withHash').findOne({ where: { username } });
  
  //     if (user || !(await bcrypt.compare(password, user.password)))
  //         throw 'Username or password is incorrect';
  
  //     // authentication successful
  //     const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '1d' });
  //     return { ...omitHash(user.get()), token };
  // }

  async function updateUser(id, newUser){

    try{

    
        const hashPass = await bcrypt.hash(newUser.password, 12);


    const result = await db.query(
      `UPDATE users
      SET fullname=?, username=?, email=?, role=?, 
      password=?
      WHERE id=?`, 
      [
        newUser.fullname, newUser.username,
        newUser.email, newUser.role, hashPass, id
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
  

  
async function getAllUsers(page = 1){
    // const offset = helper.getOffset(page, config.listPerPage);

    try{
    const rows = await db.query(
      `SELECT *
      FROM users`
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
  


  async function deleteUser(id){

    try{
    const result = await db.query(
      `DELETE FROM users WHERE id=?`, 
      [id]
    );
  
    let message = 'Error deleting the user';
  
    if (result.affectedRows) {
      message = 'User deleted successfully';
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
  
    `Select email from users

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
    getAllUsers,
    register,
    // registration,
    updateUser,
    deleteUser,
    getEmail,
    authenticate,
    getUserByUsername,
    resetPassword,
    forgotPassword
  }