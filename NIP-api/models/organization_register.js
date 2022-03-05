module.exports = (sequelize, Sequelize) => {
    const Organization_register = sequelize.define("organization_register", {
      id:  { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
      organization_name: {
        type: Sequelize.STRING
      },
      registration_number: {
        type: Sequelize.STRING
      },
      physical_address: {
        type: Sequelize.STRING
      },
      contact_person_fullname: {
        type: Sequelize.STRING
      },

      contact_number: {
        type: Sequelize.STRING
      },

       email: {
        type: Sequelize.STRING
      },
      
     role: {
        type: Sequelize.STRING
      },
      
      password: {
        type: Sequelize.STRING
      }

    

    });
  
    return Organization_register;
  };