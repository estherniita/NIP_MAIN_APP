const db = require('./db');
const config = require('../config');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");




//service to insertall posted internship request from companies and organization
async function availableInternships(availableInternship, res){

  try{


  const result  = await db.query(
    `INSERT INTO internship_requests 
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

console.log('message', message)
  return {message, success};

}
catch (error) {
console.error(error);
// expected output: ReferenceError: nonExistentFunction is not defined
// Note - error messages will vary depending on browser

}
}



//service to get available internship names by field of study
  async function getAllInternshipName(){
    // const offset = helper.getOffset(page, config.listPerPage);

    try{
    const internshipName = await db.query(
      `SELECT DISTINCT LOWER(internship_name) 'internship_name'
       FROM internship_requests  ORDER BY internship_name ASC`
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




  //service to get the list of new posted internship posts
async function getAllavailableInternships(){

    try{
    const availableInternship = await db.query(
      `SELECT * FROM internship_requests ORDER BY date_posted DESC`
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


  //service to get all available internship posts which closing date is not yet
  async function getAllavailableInternships1(){
    // const offset = helper.getOffset(page, config.listPerPage);

    try{
    const availableInternship = await db.query(
      `SELECT * FROM internship_requests WHERE closing_date >= CURRENT_DATE ORDER BY date_posted DESC`
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



    //service to get total number of internships posted by the companies
    async function getTotalAvailableInternships(){
      // const offset = helper.getOffset(page, config.listPerPage);
  
      try{
      const totalAvailableInternship = await db.query(
        `SELECT COUNT(id) as total_internship FROM internship_requests`
        // [offset, config.listPerPage]
      );
  
     let message = 'no data found';
  
     if(totalAvailableInternship.length >0){
      
      message = 'Available internships';
  
     }
  
     else 
     {
    message = 'No data found';
     }
  
     return{message, totalAvailableInternship};
  
    }
    
    catch (error) {
      console.error(error);
   
  }
    }



    //service to get total number of internships posts by the companies

    async function getTotalAvailableInternshipPost(){
      // const offset = helper.getOffset(page, config.listPerPage);
  
      try{
      const totalAvailableInternshipPost = await db.query(
        `SELECT SUM(number_of_positions) as total_internship_posts FROM internship_requests`
        // [offset, config.listPerPage]
      );
  
     let message = 'no data found';
  
     if(totalAvailableInternshipPost.length >0){
      
      message = 'Available internships';
  
     }
  
     else 
     {
    message = 'No data found';
     }
  
     return{message, totalAvailableInternshipPost};
  
    }
    
    catch (error) {
      console.error(error);
   
  }
    }

  


  
  module.exports = {
 
    availableInternships,
    getAllavailableInternships,
    getAllInternshipName,
    getAllavailableInternships1,
    getTotalAvailableInternships,
    getTotalAvailableInternshipPost
  }