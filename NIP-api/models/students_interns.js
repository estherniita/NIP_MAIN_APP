module.exports = (sequelize, Sequelize) => {
    const Student_interns = sequelize.define("students_interns", {
      id:  { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},

      firstname : {
        type: Sequelize.STRING
      },
      surname: {
        type: Sequelize.STRING
      },
      idNo_or_passportNo: {
        type: Sequelize.STRING
      },
      student_number: {
        type: Sequelize.STRING
      },

      institution: {
        type: Sequelize.STRING
      },

      qualification_documents: {
        type: Sequelize.BLOB("long")
      },

      internships_name : {
        type: Sequelize.STRING
      },

      company: {
        type: Sequelize.STRING
      },

      company_RegistrationNo: {
        type: Sequelize.STRING
      },

      supervisor_details: {
        type: Sequelize.STRING
      },

      admission: {
        type: Sequelize.STRING
      },

      completion: {
        type: Sequelize.STRING
      },

    });
  
    return Student_interns;
  };