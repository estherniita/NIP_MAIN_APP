const db = require('./db');
const students_interns = require("../models/students_interns");
const {validationResult} = require('express-validator');
const jwt = require("jsonwebtoken");
const {body} = require('express-validator');
const crypto = require("../cryptojs");
const excel = require('exceljs');
var Json2csvParser = require('json2csv').Parser;
const fs = require('fs');


async function newStudentInterns(students_interns, res){


  try{

  const result  = await db.query(
    `INSERT INTO students_interns 
    (firstname, surname, idNo_or_passportNo, student_number, student_email, student_phoneNumber, institution, field_of_study, internships_name,
      company, town_city, company_email, company_registrationNo, completion, admission, student_document ) 
    VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
    [
      students_interns.firstname, students_interns.surname, students_interns.idNo_or_passportNo, students_interns.student_number, students_interns.student_email,
      students_interns.student_phoneNumber, students_interns.institution, students_interns.field_of_study, students_interns.internships_name, students_interns.company,
      students_interns.town_city, students_interns.company_email, students_interns.company_registrationNo, students_interns.completion, students_interns.admission, students_interns.student_document
    
    ]
  );
  

  let message = 'Error while sending student details';
  let success = false;



  if (result.affectedRows) {
      message = 'Student details sent successfully';
      success = true;
    }
  
else {
  message = 'Error while sending details';
}

  return {message, success};

}
catch (error) {
console.error(error);
// expected output: ReferenceError: nonExistentFunction is not defined
// Note - error messages will vary depending on browser

}
}


//download student details
// -> Express RestAPIs
async function downloadStudentInterns(err, res, students, fields){
  // const offset = helper.getOffset(page, config.listPerPage);

  try{
  const students_interns = await db.query(
    `SELECT * FROM students_interns `
    // [offset, config.listPerPage]
  );
            if (err) throw err;
			
            const jsonstudents = JSON.parse(JSON.stringify(students_interns));
            console.log(jsonstudents);
            /**
                [ { id: 1, address: 'Jack Smith', age: 23, name: 'Massachusetts' },
                  { id: 2, address: 'Adam Johnson', age: 27, name: 'New York' },
                  { id: 3, address: 'Katherin Carter', age: 26, name: 'Washington DC' },
                  { id: 4, address: 'Jack London', age: 33, name: 'Nevada' },
                  { id: 5, address: 'Jason Bourne', age: 36, name: 'California' } ]
            */
 
            let workbook = new excel.Workbook(); //creating workbook
            let worksheet = workbook.addWorksheet('Students_interns'); //creating worksheet
            
            //  WorkSheet Header
            worksheet.columns = [
                { header: 'Organization', key: 'company', width: 50 },
                { header: 'Candidate', key: ['firstname', 'surname'], width: 30 },
                { header: 'Institution', key: 'institution', width: 30},
                { header: 'Field_of_Study', key: 'field_of_study', width: 10}
            ];
 
            // Add Array Rows
            worksheet.addRows(jsonstudents);
			
            // res.setHeader('Content-Type', 'application/json');
            res.setHeader('Content-Disposition', 'attachment; filename=' + 'students_interns.xlsx');
			
            return workbook.xlsx.write(res)
                  .then(function() {
                        res.status(200).end();
                  });

                }
  
                catch (error) {
                  console.error(error);
               
              }
        
    }

  

   


  async function updateStudentDetails(id, students_interns){

    try{
    const result = await db.query(
      `UPDATE students_interns
      SET firstname=?, surname=?, idNo_or_passportNo=?, student_number=?, student_email=?, student_phoneNumber=?, institution=?, field_of_study=?, internships_name=?,
      company=?, town_city=?, company_email=?, company_registrationNo=?, supervisor_details=?, admission=?, completion=?
      WHERE id=?`, 
      [
        students_interns.firstname, students_interns.surname, students_interns.idNo_or_passportNo, students_interns.student_number, students_interns.student_email, students_interns.student_phoneNumber,
      students_interns.institution, students_interns.field_of_study, students_interns.internships_name, students_interns.company, students_interns.town_city, students_interns.company_email,
       students_interns.company_registrationNo, students_interns.supervisor_details, students_interns.admission, students_interns.completion, id
      ]
    );
  
    let message = 'Error in updating student details';
  
    if (result.affectedRows) {
      message = 'Student details updated updated successfully';
    }
  
    return {message};

  }
  
  catch (error) {
    console.error(error);
 
}
  }



  async function getAllStudentByInstitution(){
    // const offset = helper.getOffset(page, config.listPerPage);

    try{
    const institutionName = await db.query(
      `SELECT DISTINCT LOWER(institution) 'institution'
       FROM students_interns  ORDER BY institution ASC`
      // [offset, config.listPerPage]
    );

   let message = 'no data found';

   if(institutionName.length >0){
    
    message = 'Students institution';

   }

   else 
   {
  message = 'No data found';
   }

   return{message, institution};

  }
  
  catch (error) {
    console.error(error);
 
}
  }

  
async function getAllStudentInterns(){
    // const offset = helper.getOffset(page, config.listPerPage);

    try{
    const students_interns = await db.query(
      `SELECT * FROM students_interns ORDER BY last_updated DESC`
      // [offset, config.listPerPage]
    );

   let message = 'no data found';

   if(students_interns.length >0){
    
    message = 'Students Intern';

   }

   else 
   {
  message = 'No data found';
   }

   return{message, students_interns};

  }
  
  catch (error) {
    console.error(error);
 
}
  }


  async function getAllInternsByOrganization(registration_number ){
    // const offset = helper.getOffset(page, config.listPerPage);
    match = false;
    success = false;

    try{
    const students_interns = await db.query(
      `SELECT * FROM students_interns WHERE company_registrationNo=? ORDER BY last_updated DESC`,
      [registration_number ]
      // [offset, config.listPerPage]
    );

   let message = 'no data found';

   if(students_interns.length >0){
    match = true;
    success = true;
    
    message = 'Students Intern';

   }

   else 
   {
  message = 'No data found';
   }

   return{message, students_interns, match, success};

  }
  
  catch (error) {
    console.error(error);
 
}
  }


  
  async function deleteStudent(id){

    try{
    const result = await db.query(
      `DELETE FROM students_interns WHERE id=?`, 
      [id]
    );
  
    let message = 'Error deleting the student';
  
    if (result.affectedRows) {
      message = 'student deleted successfully';
    }
  
    return {message};

  }
  
  catch (error) {
    console.error(error);
 
}
  }


  async function getIUMStudents(page = 1){
    // const offset = helper.getOffset(page, config.listPerPage);

    try{
    const students_interns = await db.query(
      `SELECT * FROM students_interns WHERE institution = "International University of Management (IUM)" 
      ORDER BY last_updated DESC`
      // [offset, config.listPerPage]
    );
    
    let message = 'no data found';

   if(students_interns.length >0){
    
    message = 'Students Intern';

   }

   else 
   {
  message = 'No data found';
   }

   return{message, students_interns};

  }
  
  catch (error) {
    console.error(error);
 
}
  }


  async function getNUSTStudents(page = 1){
    // const offset = helper.getOffset(page, config.listPerPage);

    try{
    const students_interns = await db.query(
      `SELECT * FROM students_interns WHERE institution = "Namibia University of Science and Technology (NUST)" 
      ORDER BY last_updated DESC`
      // [offset, config.listPerPage]
    );
    
    let message = 'no data found';

   if(students_interns.length >0){
    
    message = 'Students Intern';

   }

   else 
   {
  message = 'No data found';
   }

   return{message, students_interns};


  }
  
  catch (error) {
    console.error(error);
 
}
  }



  async function getNIMTStudents(page = 1){
    // const offset = helper.getOffset(page, config.listPerPage);

    try{
    const students_interns = await db.query(
      `SELECT * FROM students_interns WHERE institution = "Namibia Institute of Mining and Technology (NIMT)" 
      ORDER BY last_updated DESC `
      // [offset, config.listPerPage]
    );
    
    let message = 'no data found';

   if(students_interns.length >0){
    
    message = 'Students Intern';

   }

   else 
   {
  message = 'No data found';
   }

   return{message, students_interns};

  }
  
  catch (error) {
    console.error(error);
 
}
  }


  async function getUNAMStudents(page = 1){
    // const offset = helper.getOffset(page, config.listPerPage);

    try{
    const students_interns = await db.query(
      `SELECT * FROM students_interns WHERE institution = "University of Namibia (UNAM)" 
      ORDER BY last_updated DESC`
      // [offset, config.listPerPage]
    );
    
    let message = 'no data found';

   if(students_interns.length >0){
    
    message = 'Students Intern';

   }

   else 
   {
  message = 'No data found';
   }

   return{message, students_interns};

  }
  
  catch (error) {
    console.error(error);
 
}
  }



  async function getVTCStudents(page = 1){
    // const offset = helper.getOffset(page, config.listPerPage);

    try{
    const students_interns = await db.query(
      `SELECT * FROM students_interns WHERE institution = "Vocational Training Centre (VTC) through the Namibia Training Authority (NTA)" 
      ORDER BY last_updated DESC`
      // [offset, config.listPerPage]
    );
    
    let message = 'no data found';

   if(students_interns.length >0){
    
    message = 'Students Intern';

   }

   else 
   {
  message = 'No data found';
   }

   return{message, students_interns};

  }
  
  catch (error) {
    console.error(error);
 
}
  }



  async function getAllStudentsByInstiOrga(page = 1){
    // const offset = helper.getOffset(page, config.listPerPage);

    try{
    const students_interns = await db.query(
      `SELECT COUNT(student_number) total_students, institution,
       company FROM students_interns GROUP BY company, institution;
      `
      // [offset, config.listPerPage]
    );
    
    let message = 'no data found';

   if(students_interns.length >0){
    
    message = 'Students Intern';

   }

   else 
   {
  message = 'No data found';
   }

   return{message, students_interns};
  }
  
  catch (error) {
    console.error(error);
 
}
  }


  async function getAllStudentsByOrga(page = 1){
    // const offset = helper.getOffset(page, config.listPerPage);

    try{

    const students_interns = await db.query(
      `select COUNT(student_number) total_students, company, institution, GROUP_CONCAT(firstname, ' ', surname) AS candidate from students_interns GROUP BY company 
      `
      // [offset, config.listPerPage]
    );
    
    let message = 'no data found';

   if(students_interns.length >0){
    
    message = 'Students Intern';

   }

   else 
   {
  message = 'No data found';
   }

   return{message, students_interns};

  }
  
  catch (error) {
    console.error(error);
 
}
  }
  
  
  module.exports = {
    downloadStudentInterns,
    newStudentInterns,
    updateStudentDetails,
    getAllStudentByInstitution,
    getAllStudentInterns,
    deleteStudent,
    getIUMStudents,
    getNUSTStudents,
    getNIMTStudents,
    getUNAMStudents,
    getVTCStudents,
    getAllStudentsByInstiOrga,
    getAllStudentsByOrga,
    getAllInternsByOrganization
  }