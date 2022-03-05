module.exports = (sequelize, Sequelize) => {
    const Available_internships = sequelize.define("available_internships", {
      id:  { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
      internship_name: {
        type: Sequelize.STRING
      },
      company_name: {
        type: Sequelize.STRING
      },
      number_of_positions: {
        type: Sequelize.INTEGER
      },
      date_posted: {
        type: Sequelize.STRING
      },

      closing_date: {
        type: Sequelize.STRING
      }

    });
  
    return Available_internships;
  };