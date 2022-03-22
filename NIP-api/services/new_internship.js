const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const internship_requests_sent_to_institutions = require("../models/new_internship");



async function getMultiple(page = 1){
  // const offset = helper.getOffset(page, config.listPerPage);

  try{
  const rows = await db.query(
    `SELECT *
    FROM internship_requests_sent_to_institutions`
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




async function createNewInternship(newInternships){

  try{
    const result = await db.query(
      `INSERT INTO internship_requests_sent_to_institutions 
      (internships_name, company, town_city, registration_number, company_email, institution, email, no_of_internship, closing_date, pdf_file, internship_request_id) 
      VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
      [
        newInternships.internships_name, newInternships.company, newInternships.town_city, newInternships.registration_number, newInternships.company_email,
        newInternships.institution, newInternships.email, newInternships.no_of_internship, newInternships.closing_date, newInternships.pdf_file, newInternships.internship_request_id
      ]
    );
  
    let message = 'Error in creating New internships';
    success = false;
  
    if (result.affectedRows) {
      message = 'new internships created successfully';
      success = true;
    }
  
    return {message, success};

  }
  
  catch (error) {
    console.error(error);
 
}
  }

 
  
  async function getEmail(id, newInternships){

    try{
    const result = await db.query(
      `SELECT email from internship_requests_sent_to_institutions
      WHERE email=?`, 
      [
        newInternships.EMAIL
      
      ]
    );
  
    let message = 'Error in updating';
  
    if (result.affectedRows) {
      message = 'New interships updated successfully';
    }
  
    return {message};

  }
  
  catch (error) {
    console.error(error);
 
}
  }

  

  async function update(id, newInternships){

    try{
    const result = await db.query(
      `UPDATE internship_requests_sent_to_institutions
      SET INTERNSHIPS_NAME=?, COMPANY_NAME=?, INSTITUTION_NAME=?, 
      NO_OF_INTERNSHIP=?
      WHERE id=?`, 
      [
        newInternships.INTERNSHIPS_NAME, newInternships.COMPANY_NAME,
        newInternships.INSTITUTION_NAME, newInternships.NO_OF_INTERNSHIP, id
      ]
    );
  
    let message = 'Error in updating programming language';
  
    if (result.affectedRows) {
      message = 'New interships updated successfully';
    }
  
    return {message};
  }
  
  catch (error) {
    console.error(error);
 
}
  }

  
  async function deleteInternship(id){

    try{
    const result = await db.query(
      `DELETE FROM internship_requests_sent_to_institutions WHERE id=?`, 
      [id]
    );
  
    let message = 'Error in deleting from new internships';
  
    if (result.affectedRows) {
      message = 'New internship deleted successfully';
    }
  
    return {message};

  }
  
  catch (error) {
    console.error(error);
 
}
  }


  async function getIUMInternship(page = 1){
    // const offset = helper.getOffset(page, config.listPerPage);
    try{
    const rows = await db.query(
      `SELECT id, internships_name, institution, company, registration_number, no_of_internship, email, company_email, pdf_file, town_city,
      DATE_FORMAT(date_received,"%d-%m-%Y %h:%i %p") AS date_received, DATE_FORMAT(closing_date,"%d-%m-%Y") 
      AS closing_date FROM internship_requests_sent_to_institutions WHERE institution = "International University of Management (IUM)" ORDER BY date_received DESC
      `
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



  async function getNUSTInternship(page = 1){
    // const offset = helper.getOffset(page, config.listPerPage);

    try{
    const rows = await db.query(
      `  SELECT id, internships_name, institution, company, registration_number, no_of_internship, email, company_email, pdf_file, town_city,
      DATE_FORMAT(date_received,"%d-%m-%Y %h:%i %p") AS date_received, DATE_FORMAT(closing_date,"%d-%m-%Y") 
      AS closing_date FROM internship_requests_sent_to_institutions WHERE institution = "Namibia University of Science and Technology (NUST)" ORDER BY date_received DESC 
      `
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

  
  async function getNIMTInternship(page = 1){
    // const offset = helper.getOffset(page, config.listPerPage);

    try{
    const rows = await db.query(
      `  SELECT id, internships_name, institution, company, registration_number, no_of_internship, email, company_email, pdf_file, town_city,
      DATE_FORMAT(date_received,"%d-%m-%Y %h:%i %p") AS date_received, DATE_FORMAT(closing_date,"%d-%m-%Y") 
      AS closing_date FROM internship_requests_sent_to_institutions WHERE institution = "Namibia Institute of Mining and Technology (NIMT)" ORDER BY date_received DESC 
      `
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


  async function getUNAMInternship(page = 1){
    // const offset = helper.getOffset(page, config.listPerPage);

    try{
    const rows = await db.query(
      ` SELECT id, internships_name, institution, company, registration_number, no_of_internship, email, company_email, pdf_file, town_city,
      DATE_FORMAT(date_received,"%d-%m-%Y %h:%i %p") AS date_received, DATE_FORMAT(closing_date,"%d-%m-%Y") 
      AS closing_date FROM internship_requests_sent_to_institutions WHERE institution = "University of Namibia (UNAM)" ORDER BY date_received DESC 
      `
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


  async function getVTCInternship(page = 1){
    // const offset = helper.getOffset(page, config.listPerPage);

    try{
    const rows = await db.query(
      `  SELECT id, internships_name, institution, company, registration_number, no_of_internship, email, company_email, pdf_file, town_city,
      DATE_FORMAT(date_received,"%d-%m-%Y %h:%i %p") AS date_received, DATE_FORMAT(closing_date,"%d-%m-%Y") 
      AS closing_date FROM internship_requests_sent_to_institutions WHERE institution = "Vocational Training Centre (VTC) through the Namibia Training Authority (NTA)" ORDER BY date_received DESC 
      `
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

  
 
   
  async function getAllSendInternship(page = 1){
    // const offset = helper.getOffset(page, config.listPerPage);

    try{
    const rows = await db.query(
      `SELECT id, internships_name, institution, company, registration_number, no_of_internship, email, company_email, pdf_file, town_city,
      DATE_FORMAT(date_received,"%d-%m-%Y %h:%i %p") AS date_received, DATE_FORMAT(closing_date,"%d-%m-%Y") 
      AS closing_date FROM internship_requests_sent_to_institutions ORDER BY date_received DESC`
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



  
  module.exports = {
    getAllSendInternship,
    getMultiple,
    createNewInternship,
    update,
    deleteInternship,
    getEmail,
    getIUMInternship,
    getNUSTInternship,
    getNIMTInternship,
    getUNAMInternship,
    getVTCInternship,
  }