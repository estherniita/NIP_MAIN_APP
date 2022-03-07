const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const Available_internships = require("../models/available_internships");
const {validationResult} = require('express-validator');
const jwt = require("jsonwebtoken");
const {body} = require('express-validator');
const crypto = require("../cryptojs");
const cors = require('cors');
const express = require('express');

const app = express();
const multer  = require('multer');
//  DIR  = require('../documents/company_documents');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../documents/company_documents')
  },
  filename: function (req, file, cb) {
    let originalname = file.originalname;

    let ext = originalname.split('.').pop();
    let filename = originalname.toLowerCase.split('.').slice(0, -1).join('.');

    cb(null, filename + '-' + Date.now()+'.'+ext)
  }
})

const upload = multer({ storage: storage })

 
// const filename = storage.filename;


app.post('/upload',upload.single('file'),  (req, res) => {
  // console.log(req);
  res.send({"status": "success"})
})

async function availableInternships(availableInternship, res){

  try{


  const result  = await db.query(
    `INSERT INTO available_internships 
    (internship_name, town_city, company_name,  registration_number, number_of_positions, closing_date, company_email, pdf_file) 
    VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?)`, 
    [
      availableInternship.internship_name, availableInternship.town_city, availableInternship.company_name, availableInternship.registration_number,
      availableInternship.number_of_positions, availableInternship.closing_date, availableInternship.email, availableInternship.pdf_file
      
    
    ]
  );
  

  let message = 'Error while inserting';
  let success = false;



  if (result.affectedRows) {
      message = 'Available internships inserted successfully';
      success = true;
    }
  
else {
  message = 'Error while inserting';
}

  return {message, success};

}
catch (error) {
console.error(error);
// expected output: ReferenceError: nonExistentFunction is not defined
// Note - error messages will vary depending on browser

}
}




 async function authenticate(username, password, user){
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

  async function updateUser(id, availableInternship){

    try{
    const result = await db.query(
      `UPDATE users
      SET fullname=?, username=?, email=?, 
      password=?
      WHERE id=?`, 
      [
        availableInternship.fullname, availableInternship.username,
        availableInternship.email, availableInternship.password, id
      ]
    );
  
    let message = 'Error in updating user details';
  
    if (result.affectedRows) {
      message = 'User details updated updated successfully';
    }
  
    return {message};

  }
  
  catch (error) {
    console.error(error);
 
}
  }


  async function getAllInternshipName(){
    // const offset = helper.getOffset(page, config.listPerPage);

    try{
    const internshipName = await db.query(
      `SELECT DISTINCT LOWER(internship_name) 'internship_name'
       FROM available_internships  ORDER BY internship_name ASC`
      // [offset, config.listPerPage]
    );

   let message = 'no data found';

   if(internshipName.length >0){
    
    message = 'Available internships internshipName';

   }

   else 
   {
  message = 'No data found';
   }

   return{message, internshipName};
  
  }
  
  catch (error) {
    console.error(error);
 
}
  }

  
async function getAllavailableInternships(){
    // const offset = helper.getOffset(page, config.listPerPage);

    try{
    const availableInternship = await db.query(
      `SELECT * FROM available_internships ORDER BY date_posted DESC`
      // [offset, config.listPerPage]
    );

   let message = 'no data found';

   if(availableInternship.length >0){
    
    message = 'Available internships';

   }

   else 
   {
  message = 'No data found';
   }

   return{message, availableInternship};

  }
  
  catch (error) {
    console.error(error);
 
}
  }


  async function getAllavailableInternships1(){
    // const offset = helper.getOffset(page, config.listPerPage);

    try{
    const availableInternship = await db.query(
      `SELECT * FROM available_internships WHERE closing_date >= CURRENT_DATE ORDER BY date_posted DESC`
      // [offset, config.listPerPage]
    );

   let message = 'no data found';

   if(availableInternship.length >0){
    
    message = 'Available internships';

   }

   else 
   {
  message = 'No data found';
   }

   return{message, availableInternship};

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
  
  module.exports = {
 
    availableInternships,
    getAllavailableInternships,
    updateUser,
    deleteUser,
    authenticate,
    getAllInternshipName,
    getAllavailableInternships1
  }