const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const Organization_register = require("../models/organization_register");
const {validationResult} = require('express-validator');
const jwt = require("jsonwebtoken");
const {body} = require('express-validator');
const crypto = require("../cryptojs");
const crypto1 = require("crypto");



async function register(newOrganization, res){

  try{


    const hashPass = await bcrypt.hash(newOrganization.password, 12);
    
    
    let message = 'Error in creating new user';
    let success = false;
    let match = true;

    const result = await db.query(
      `INSERT INTO organization_register 
      (organization_name, registration_number, physical_address, contact_person_fullname, contact_number, email, role, password) 
      VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?)`, 
      [
        newOrganization.organization_name, newOrganization.registration_number, newOrganization.physical_address,
        newOrganization.contact_person_fullname, newOrganization.contact_number, newOrganization.email, newOrganization.role, hashPass
        
        
      ]
    );
    
  
  
    if (result.affectedRows) {

    //   const token = jwt.sign({ newOrganization}, config.secret, {
    //     //1 wek in seconds this to force the use to log in after every week, that is when the token
    //     //gets expired
    //     expiresIn: "5h"
    // });

    message = 'organization registered'
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

    `Select email from organization_register

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



async function getOrganizationByRegistrationNo( registration_number){

  try{

  const rows = await db.query(

    `Select * from organization_register

    WHERE registration_number=?`, 
    [registration_number]
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





  async function updateOrganizationDetails(id, newOrganization){

    try{

    
        const hashPass = await bcrypt.hash(newOrganization.password, 12);


    const result = await db.query(
      `UPDATE organization_register
      SET organization_name=?, registration_number=?, physical_address=?, contact_person_fullname=?, 
      contact_number=?, email=?, role=?,
      password=?
      WHERE id=?`, 
      [
       newOrganization.organization_name, newOrganization.registration_number, newOrganization.physical_address,
        newOrganization.contact_person_fullname, newOrganization.contact_number, newOrganization.email, newOrganization.role, hashPass, id
      ]
    );
  
    let message = 'Error in updating organization details';
    success = false;

  
    if (result.affectedRows) {
      message = 'Organization details updated successfully';
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
  

  
async function getAllRegisteredOrganization(page = 1){
    // const offset = helper.getOffset(page, config.listPerPage);

    try{
    const rows = await db.query(
      `SELECT *
      FROM organization_register`
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


  
  async function deleteOrganization(id){

    try{

    const result = await db.query(
      `DELETE FROM organization_register WHERE id=?`, 
      [id]
    );
  
    let message = 'Error deleting the organization details';
  
    if (result.affectedRows) {
      message = 'Organization details deleted successfully';
    }
  
    return {message};
  }
  
  catch (error) {
    console.error(error);
 
}
  }




  async function resetPassword1( email){

    try{

    const organization_register = await db.query(
  
      `Select email from organization_register
  
      WHERE email=?`, 
      [email]
    );
  
    let message = 'Email exist';
  
    if (organization_register.length > 0) {
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
  const organization_register = await db.query(
  
    `Select email from organization_register

    WHERE email=?`, 
    [email]
  );

  // always return ok response to prevent email enumeration
  if (!organization_register) return;

  // create reset token that expires after 24 hours
  organization_register.resetToken = randomTokenString();
  organization_register.resetTokenExpires = new Date(Date.now() + 24*60*60*1000);
  await organization_register.save();

}
  
catch (error) {
  console.error(error);

}
  // send email
 
}

function randomTokenString() {
  return crypto1.randomBytes(40).toString('hex');
}



  async function resetPassword2(email, err, res){

    try{

  var message;
    const user = await db.query(
  
      `Select email from organization_register
  
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
  
      `Select email from organization_register
  
      WHERE email_register=?`, 
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
  getAllRegisteredOrganization,
    register,
    updateOrganizationDetails,
    getEmail,
    getOrganizationByRegistrationNo,
    deleteOrganization,
    resetPassword,
    forgotPassword
  }