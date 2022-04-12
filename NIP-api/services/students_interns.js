const db = require('./db');
const jwt = require("jsonwebtoken");
const {body} = require('express-validator');
const crypto = require("../cryptojs");
const excel = require('exceljs');
var Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
const path = require('path');
const json2csv = require('json2csv').parse;

//Fields to show for the exel document
const fields = [

  {
      label: 'Organization/ company and town', // Optional, column will be labeled 'path.to.something' if not defined)
      value: 'company', // data.path.to.something
      // default: 'N/A' // default if value is not found (Optional, overrides `defaultValue` for column)
  },


  {
      label: 'Student fullname', // Optional, column will be labeled 'path.to.something' if not defined)
      value: 'firstname, surname', // data.path.to.something
      // default: 'N/A' // default if value is not found (Optional, overrides `defaultValue` for column)
  },
  {
      label: 'Student Number', // Optional, column will be labeled 'path.to.something' if not defined)
      value: 'student_number', // data.path.to.something
      // default: 'N/A' // default if value is not found (Optional, overrides `defaultValue` for column)
  },
  {
    label: 'Institution', // Optional, column will be labeled 'path.to.something' if not defined)
    value: 'institution', // data.path.to.something
    // default: 'N/A' // default if value is not found (Optional, overrides `defaultValue` for column)
},
{
    label: 'Field of Study', // Optional, column will be labeled 'path.to.something' if not defined)
    value: 'field_of_study', // data.path.to.something
    // default: 'N/A' // default if value is not found (Optional, overrides `defaultValue` for column)
},
{
    label: 'Student Email address', // Optional, column will be labeled 'path.to.something' if not defined)
    value: 'student_email', // data.path.to.something
    // default: 'N/A' // default if value is not found (Optional, overrides `defaultValue` for column)
},
{
    label: 'Student Phone Number', // Optional, column will be labeled 'path.to.something' if not defined)
    value: 'student_phoneNumber', // data.path.to.something
    // default: 'N/A' // default if value is not found (Optional, overrides `defaultValue` for column)
},
{
    label: 'Admission', // Optional, column will be labeled 'path.to.something' if not defined)
    value: 'admission', // data.path.to.something
    // default: 'N/A' // default if value is not found (Optional, overrides `defaultValue` for column)
},
{
    label: 'Completion', // Optional, column will be labeled 'path.to.something' if not defined)
    value: 'completion', // data.path.to.something
    // default: 'N/A' // default if value is not found (Optional, overrides `defaultValue` for column)
},
{
    label: 'Student Document', // Optional, column will be labeled 'path.to.something' if not defined)
    value: 'student_document', // data.path.to.something
    // default: 'N/A' // default if value is not found (Optional, overrides `defaultValue` for column)
},
];

async function newStudentInterns(students_interns, res){


  try{

  const result  = await db.query(
    `INSERT INTO students_interns 
    (firstname, surname, idNo_or_passportNo, student_number, student_email, student_phoneNumber, institution, field_of_study, internships_name,
      company, town_city, company_email, company_registrationNo, internship_id, completion, admission, student_document ) 
    VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
    [
      students_interns.firstname, students_interns.surname, students_interns.idNo_or_passportNo, students_interns.student_number, students_interns.student_email,
      students_interns.student_phoneNumber, students_interns.institution, students_interns.field_of_study, students_interns.internships_name, students_interns.company,
      students_interns.town_city, students_interns.company_email, students_interns.company_registrationNo, students_interns.internship_id, students_interns.completion, students_interns.admission, students_interns.student_document
    
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

return{error}


}
}





//download student details
// -> Express RestAPIs
async function downloadStudentInterns(err, res, students, fields){
  // const offset = helper.getOffset(page, config.listPerPage);

  const students_interns = await db.query(
    `SELECT * FROM students_interns `
    // [offset, config.listPerPage]
  );
            if (err) throw err;
			
            // const jsonstudents = JSON.parse(JSON.stringify(students_interns));
            // console.log(jsonstudents);
            /**
                [ { id: 1, address: 'Jack Smith', age: 23, name: 'Massachusetts' },
                  { id: 2, address: 'Adam Johnson', age: 27, name: 'New York' },
                  { id: 3, address: 'Katherin Carter', age: 26, name: 'Washington DC' },
                  { id: 4, address: 'Jack London', age: 33, name: 'Nevada' },
                  { id: 5, address: 'Jason Bourne', age: 36, name: 'California' } ]
            */
 
            let workbook = new excel.Workbook(); //creating workbook
            let worksheet = workbook.addWorksheet('Students_interns'); //creating worksheet
            
            const path = "./reports";
            //  WorkSheet Header
            worksheet.columns = [
              { header: 'S NO', key: 's_no', width: 10 },
                { header: 'Organization', key: 'company', width: 50 },
                { header: 'Candidate', key: ('firstname', 'surname'), width: 50 },
                { header: 'Institution', key: 'institution', width: 50},
                { header: 'Field_of_Study', key: 'field_of_study', width: 50}
            ];
 
            // Add Array Rows
            // worksheet.addRows(jsonstudents);
			
            // res.setHeader('Content-Type', 'application/json');
            // res.setHeader('Content-Disposition', 'attachment; filename=' + 'students_interns.xlsx');
			
    //         return workbook.xlsx.write(res)
    //               .then(function() {
    //                     res.status(200).end();
    //               });

    //             }
  
    //             catch (error) {
    //               console.error(error);
               
    //           }
        
    // }

    // Making first line in excel bold
// Looping through User data
let counter = 1;
students_interns.forEach((students_intern) => {
  students_intern.s_no = counter;
  worksheet.addRow(students_intern); // Add data in worksheet
  counter++;
});
// Making first line in excel bold
worksheet.getRow(1).eachCell((cell) => {
  cell.font = { bold: true };
});

try{

  let data = await workbook.csv.writeFile(`${path}/Students_interns.csv`)


  // let message = 'file successfully downloaded';

  // res.send({
  //   status: "success",
  //   message: "file successfully downloaded",
  //   path: `${path}/users.xlsx`,
  //  });

   return( `${path}/users.xlsx`, data);

}

catch (error) {

  console.error(error);
  //   res.send({
  //   status: "error",
  //   message: "Something went wrong",
  // });
  }
}




  

   


  async function updateStudentDetails(id, students_interns){

    try{
    const result = await db.query(
      `UPDATE students_interns
      SET firstname=?, surname=?, idNo_or_passportNo=?, student_number=?, student_email=?, student_phoneNumber=?, institution=?, field_of_study=?, internships_name=?,
      company=?, town_city=?, company_email=?, company_registrationNo=?, admission=?, completion=?, student_document=?
      WHERE id=?`, 
      [
        students_interns.firstname, students_interns.surname, students_interns.idNo_or_passportNo, students_interns.student_number, students_interns.student_email, students_interns.student_phoneNumber,
      students_interns.institution, students_interns.field_of_study, students_interns.internships_name, students_interns.company, students_interns.town_city, students_interns.company_email,
       students_interns.company_registrationNo, students_interns.admission, students_interns.completion, students_interns.student_document, id
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



  async function updateStudentCompleted(id, students_interns){

    try{
    const result = await db.query(
      `UPDATE students_interns
      SET comments=?, completion=?, student_completion_report=?
      WHERE id=?`, 
      [
      students_interns.comments, students_interns.completion, students_interns.student_completion_report, id
      ]
    );
  
    let message = 'Error in updating student details';
  
    if (result.affectedRows) {
      message = 'Student details updated successfully';
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
      `SELECT * FROM students_interns WHERE (admission = 'No' OR admission = 'pending') AND company_registrationNo=? ORDER BY last_updated DESC`,
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


  async function getAllPendingInternsByOrganization(registration_number ){
    // const offset = helper.getOffset(page, config.listPerPage);
    match = false;
    success = false;

    try{
    const students_interns = await db.query(
      `SELECT *, COUNT(id) as total_pending FROM students_interns WHERE (admission = 'No' OR admission = 'pending') AND company_registrationNo=? ORDER BY last_updated DESC`,
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

  async function getTotalInternsPerOrganization(registration_number ){
    // const offset = helper.getOffset(page, config.listPerPage);
    match = false;
    success = false;

    try{
    const students_interns = await db.query(
      `SELECT *, COUNT(id) as total_received FROM students_interns WHERE  company_registrationNo=? ORDER BY last_updated DESC`,
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


  async function getAllAdmittedInternsPerOrganization(registration_number ){
    // const offset = helper.getOffset(page, config.listPerPage);
    match = false;
    success = false;

    try{
    const students_interns = await db.query(
      `SELECT * FROM students_interns WHERE completion = 'pending' AND (admission = 'Yes' OR admission = 'admitted') AND company_registrationNo=? ORDER BY last_updated DESC`,
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


  //  console.log('results', message, students_interns, match, success);
   return{message, students_interns, match, success};

  }
  
  catch (error) {
    console.error(error);
 
}
  }


  async function getTotalAdmittedInternsPerOrganization(registration_number ){
    // const offset = helper.getOffset(page, config.listPerPage);
    match = false;
    success = false;

    try{
    const students_interns = await db.query(
      `SELECT *, COUNT(id) as total_admitted FROM students_interns WHERE (admission = 'Yes' OR admission = 'admitted') AND company_registrationNo=? ORDER BY last_updated DESC`,
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


  //  console.log('results', message, students_interns, match, success);
   return{message, students_interns, match, success};

  }
  
  catch (error) {
    console.error(error);
 
}
  }


  
  async function getAllNotAdmittedInternsPerOrganization(registration_number ){
    // const offset = helper.getOffset(page, config.listPerPage);
    match = false;
    success = false;

    try{
    const students_interns = await db.query(
      `SELECT * FROM students_interns WHERE (admission = 'not admitted') AND company_registrationNo=? ORDER BY last_updated DESC`,
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


  //  console.log('results', message, students_interns, match, success);
   return{message, students_interns, match, success};

  }
  
  catch (error) {
    console.error(error);
 
}
  }


  

  async function getTotalNotAdmittedInternsPerOrganization(registration_number ){
    // const offset = helper.getOffset(page, config.listPerPage);
    match = false;
    success = false;

    try{
    const students_interns = await db.query(
      `SELECT *, COUNT(id) as total_not_admitted FROM students_interns WHERE (admission = 'not admitted') AND company_registrationNo=? ORDER BY last_updated DESC`,
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


  //  console.log('results', message, students_interns, match, success);
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
       company FROM students_interns WHERE admission = 'admitted' GROUP BY company, institution;
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
      `select COUNT(student_number) total_students, company, GROUP_CONCAT(firstname, ' ', surname) AS candidate from students_interns WHERE admission = 'admitted' GROUP BY company 
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



  async function getAllPendingInterns(){

    let student = [];


    try{
    const students_interns = await db.query(
      `SELECT * FROM students_interns WHERE (admission = 'No' OR admission = 'pending')`
     
    );

    student.push(students_interns)


   let message = 'no data found';

   if(students_interns.length >0){
    
    message = 'Students Intern';

   }

   else 
   {
  message = 'No data found';

   }
   
   count = Object.keys(students_interns).length


   return{message, students_interns, count};

  }
  
  catch (error) {
    console.error(error);
 
}
  }
  

  async function getAllNotAdmittedInterns(){

    let student = [];


    try{
    const students_interns = await db.query(
      `SELECT * FROM students_interns WHERE admission = 'not admitted'`
     
    );

    student.push(students_interns)

   let message = 'no data found';

   if(students_interns.length >0){
    
    message = 'Students Intern';

   }

   else 
   {
  message = 'No data found';

   }

   count = Object.keys(students_interns).length


   return{message, students_interns, count};

  }
  
  catch (error) {
    console.error(error);
 
}
  }


  async function getAllAdmittedInterns(){

    let student = [];


    try{
    const students_interns = await db.query(
      `SELECT * FROM students_interns WHERE admission = 'admitted'`
     
    );

    student.push(students_interns)

   let message = 'no data found';

   if(students_interns.length >0){
    
    message = 'Students Intern';

   }

   else 
   {
  message = 'No data found';

   }

   count = Object.keys(students_interns).length


   return{message, students_interns, count};

  }
  
  catch (error) {
    console.error(error);
 
}
  }




  async function getAllCompletedInterns(){
    
    let student = [];


    try{
    const students_interns = await db.query(
      `SELECT * FROM students_interns WHERE completion = 'completed'`
     
    );

    student.push(students_interns)


   let message = 'no data found';

   if(students_interns.length >0){
    
    message = 'Students Intern';

   }


  else 
   {
  message = 'No data found';

   }

   count = Object.keys(students_interns).length


   return{message, students_interns, count};

  }
  
  catch (error) {
    console.error(error);
 
}
  }


  async function getAllCompletedInternsPerOrgan(registration_number ){
    
    let student = [];
    match = false;
    success = false;


    try{
    const students_interns = await db.query(
      `SELECT * FROM students_interns WHERE completion = 'completed' AND company_registrationNo=?`,
      [registration_number ]
     
    );

    student.push(students_interns)


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

   count = Object.keys(students_interns).length


   return{message, students_interns, match, success, count};

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
    getAllInternsByOrganization,
    getAllAdmittedInternsPerOrganization,
    getAllNotAdmittedInternsPerOrganization,
    getTotalInternsPerOrganization,
    getAllPendingInternsByOrganization,
    getTotalNotAdmittedInternsPerOrganization,
    getTotalAdmittedInternsPerOrganization,
    getAllPendingInterns,
    getAllNotAdmittedInterns,
    getAllAdmittedInterns,
    getAllCompletedInterns,
    updateStudentCompleted,
    getAllCompletedInternsPerOrgan
  }