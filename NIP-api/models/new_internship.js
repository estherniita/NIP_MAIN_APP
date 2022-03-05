module.exports = (sequelize, Sequelize) => {
    const New_internships = sequelize.define("new_internships", {
      id:  { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
      internships_name: {
        type: Sequelize.STRING
      },
      company: {
        type: Sequelize.STRING
      },
      institution: {
        type: Sequelize.STRING
      },
      no_of_internship: {
        type: Sequelize.STRING
      },

      email: {
        type: Sequelize.STRING
      }

    });
  
    return New_internships;
  };

// const orm = require('../config/object-relational');

// const new_internship = {
//     all: (cb)=>{
//         orm.all("new_internships", (res)=>{
//             cb(res);
//         });
//     },
//     allByOne: (cond, val, cb)=>{
//         orm.allByOne("new_internships", cond, val, (res)=>{
//             cb(res);
//         });
//     },
//     create: (cols, vals, cb)=>{
//         // console.log(`Vals Passed to Model:\n ${vals}`);
//         orm.create("new_internships", cols, vals, (res)=>{
//             cb(res);
//         });
//     },
//     update: (cond, val, cb)=>{
//         orm.update("new_internships", cond, val, (res)=>{
//             cb(res);
//         });
//     },
//     deleteAllByOne: (cond, val, cb)=>{
//         orm.deleteAllByOne("new_internships", cond, val, (res)=>{
//             cb(res);
//         });
//     }
// };

// module.exports = new_internship;

